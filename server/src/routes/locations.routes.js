const express = require('express');
const router = express.Router();
const Location = require('../models/Location');
const SearchHistory = require('../models/SearchHistory');
const memoryStore = require('../services/store.service');
const { protect, authorize } = require('../middleware/auth.middleware');

// Geodesic distance helper for nearby search
function calculateDistance(coord1, coord2) {
  const R = 6371000; // meters
  const dLat = ((coord2.lat - coord1.lat) * Math.PI) / 180;
  const dLng = ((coord2.lng - coord1.lng) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((coord1.lat * Math.PI) / 180) *
      Math.cos((coord2.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

// @route   GET /api/locations
// @desc    Get all locations with search, category filtering, and room number matching
router.get('/', async (req, res) => {
  try {
    const { search, category, department, wheelchairOnly } = req.query;
    let locations = [];

    if (memoryStore.isMongoConnected()) {
      let query = {};
      if (category && category !== 'all') query.category = category;
      if (department && department !== 'all') query.department = new RegExp(department, 'i');
      if (wheelchairOnly === 'true') query['accessibilityInformation.wheelchairAccessible'] = true;

      locations = await Location.find(query).sort({ viewsCount: -1 });
    } else {
      locations = [...memoryStore.getLocations()];
      if (category && category !== 'all') locations = locations.filter((l) => l.category === category);
      if (department && department !== 'all') locations = locations.filter((l) => l.department && l.department.toLowerCase().includes(department.toLowerCase()));
      if (wheelchairOnly === 'true') locations = locations.filter((l) => l.accessibilityInformation?.wheelchairAccessible);
    }

    if (search && search.trim() !== '') {
      const q = search.trim().toLowerCase();
      // Record search in history if authenticated or query is substantive
      if (q.length >= 2) {
        SearchHistory.create({
          userId: req.user ? req.user._id : null,
          searchedLocation: search.trim(),
        }).catch(() => {});
      }

      // Filter with deep match: building name, department, facilities, description, room number, or floor room name
      locations = locations.filter((loc) => {
        const nameMatch = loc.name.toLowerCase().includes(q);
        const deptMatch = loc.department && loc.department.toLowerCase().includes(q);
        const descMatch = loc.description && loc.description.toLowerCase().includes(q);
        const facilityMatch = loc.facilities && loc.facilities.some((f) => f.toLowerCase().includes(q));
        const catMatch = loc.category && loc.category.toLowerCase().includes(q);

        // Check if any room matches roomNumber or room name
        const roomMatch = loc.floors && loc.floors.some((floor) =>
          floor.rooms && floor.rooms.some((room) =>
            room.roomNumber.toLowerCase().includes(q) || room.name.toLowerCase().includes(q)
          )
        );

        return nameMatch || deptMatch || descMatch || facilityMatch || catMatch || roomMatch;
      });
    }

    res.json({
      success: true,
      count: locations.length,
      data: locations,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/locations/nearby
// @desc    Get nearby facilities from given coordinates
router.get('/nearby', async (req, res) => {
  try {
    const { lat, lng, maxDistance = 350, category } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({ success: false, message: 'Please provide lat and lng coordinates.' });
    }

    const currentCoords = { lat: parseFloat(lat), lng: parseFloat(lng) };
    let query = {};
    if (category && category !== 'all') {
      query.category = category;
    }

    let allLocations = [];
    if (memoryStore.isMongoConnected()) {
      allLocations = await Location.find(query);
      allLocations = allLocations.map(l => l.toObject());
    } else {
      allLocations = [...memoryStore.getLocations()];
      if (category && category !== 'all') {
        allLocations = allLocations.filter(l => l.category === category);
      }
    }

    const nearby = allLocations
      .map((loc) => {
        const distance = calculateDistance(currentCoords, loc.coordinates);
        return {
          ...loc,
          distanceMeters: distance,
          walkingMinutes: Math.max(1, Math.ceil(distance / 72)),
        };
      })
      .filter((loc) => loc.distanceMeters <= parseFloat(maxDistance))
      .sort((a, b) => a.distanceMeters - b.distanceMeters);

    res.json({
      success: true,
      count: nearby.length,
      data: nearby,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/locations/qr/:qrKey
// @desc    Find location by QR code key (e.g. VJTI-MAIN-BLDG)
router.get('/qr/:qrKey', async (req, res) => {
  try {
    let location = null;
    if (memoryStore.isMongoConnected()) {
      location = await Location.findOne({ qrCodeKey: req.params.qrKey });
      if (location) {
        location.viewsCount += 1;
        await location.save();
      }
    } else {
      location = memoryStore.getLocationByQR(req.params.qrKey);
      if (location) location.viewsCount = (location.viewsCount || 0) + 1;
    }

    if (!location) {
      return res.status(404).json({ success: false, message: 'Campus building not found for this QR code.' });
    }

    res.json({
      success: true,
      data: location,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/locations/:id
// @desc    Get single location by ID with views count increment
router.get('/:id', async (req, res) => {
  try {
    let location = null;
    if (memoryStore.isMongoConnected()) {
      location = await Location.findById(req.params.id);
      if (location) {
        location.viewsCount += 1;
        await location.save();
      }
    } else {
      location = memoryStore.getLocationById(req.params.id);
      if (location) location.viewsCount = (location.viewsCount || 0) + 1;
    }

    if (!location) {
      return res.status(404).json({ success: false, message: 'Location not found' });
    }

    res.json({
      success: true,
      data: location,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/locations
// @desc    Add new campus building (Admin only)
router.post('/', protect, authorize('admin'), async (req, res) => {
  try {
    const location = await Location.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Location created successfully',
      data: location,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// @route   PUT /api/locations/:id
// @desc    Update campus location (Admin only)
router.put('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const location = await Location.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!location) {
      return res.status(404).json({ success: false, message: 'Location not found' });
    }

    res.json({
      success: true,
      message: 'Location updated successfully',
      data: location,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// @route   DELETE /api/locations/:id
// @desc    Delete campus location (Admin only)
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const location = await Location.findByIdAndDelete(req.params.id);
    if (!location) {
      return res.status(404).json({ success: false, message: 'Location not found' });
    }

    res.json({
      success: true,
      message: 'Location deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
