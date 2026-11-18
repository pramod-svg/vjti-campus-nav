const express = require('express');
const router = express.Router();
const dijkstraService = require('../services/dijkstra.service');
const Location = require('../models/Location');
const CampusPath = require('../models/CampusPath');
const memoryStore = require('../services/store.service');

// Ensure graph is loaded
const ensureGraphLoaded = async () => {
  if (dijkstraService.nodes.size === 0) {
    if (memoryStore.isMongoConnected()) {
      const paths = await CampusPath.find();
      if (paths.length > 0) {
        dijkstraService.loadPaths(paths);
        return;
      }
    }
    dijkstraService.loadPaths(memoryStore.getPaths());
  }
};

// @route   POST /api/navigation/route
// @desc    Calculate shortest walking route & alternative route between start & destination
router.post('/route', async (req, res) => {
  try {
    await ensureGraphLoaded();

    const {
      startLocationId,
      endLocationId,
      startCoords,
      endCoords,
      wheelchairOnly = false,
    } = req.body;

    let startPoint = startCoords;
    let endPoint = endCoords;
    let startBuilding = null;
    let endBuilding = null;

    if (startLocationId) {
      if (memoryStore.isMongoConnected()) {
        startBuilding = await Location.findById(startLocationId).catch(() => null);
      }
      if (!startBuilding) {
        startBuilding = memoryStore.getLocationById(startLocationId);
      }
      if (startBuilding) {
        startPoint = startBuilding.coordinates;
      }
    }

    if (endLocationId) {
      if (memoryStore.isMongoConnected()) {
        endBuilding = await Location.findById(endLocationId).catch(() => null);
        if (endBuilding) {
          endBuilding.viewsCount = (endBuilding.viewsCount || 0) + 1;
          await endBuilding.save().catch(() => {});
        }
      }
      if (!endBuilding) {
        endBuilding = memoryStore.getLocationById(endLocationId);
        if (endBuilding) endBuilding.viewsCount = (endBuilding.viewsCount || 0) + 1;
      }
      if (endBuilding) {
        endPoint = endBuilding.coordinates;
      }
    }

    if (!startPoint || !endPoint) {
      return res.status(400).json({
        success: false,
        message: 'Please provide valid starting and destination coordinates or location IDs.',
      });
    }

    const routeResult = dijkstraService.calculateRoute(startPoint, endPoint, {
      wheelchairOnly: Boolean(wheelchairOnly),
    });

    if (!routeResult) {
      return res.status(404).json({
        success: false,
        message: wheelchairOnly
          ? 'No 100% wheelchair-accessible path found for this route. Consider taking the standard route with assistance.'
          : 'No navigable path found between the specified points on campus.',
      });
    }

    res.json({
      success: true,
      startBuilding,
      endBuilding,
      route: routeResult,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/navigation/emergency
// @desc    Calculate fastest route to nearest emergency facility / medical center / assembly muster point
router.post('/emergency', async (req, res) => {
  try {
    await ensureGraphLoaded();

    const { currentCoords, emergencyType = 'medical' } = req.body;

    if (!currentCoords || !currentCoords.lat || !currentCoords.lng) {
      return res.status(400).json({
        success: false,
        message: 'Current coordinates required for emergency routing.',
      });
    }

    // Find all emergency points
    let emergencyLocations = [];
    if (memoryStore.isMongoConnected()) {
      emergencyLocations = await Location.find({ isEmergencyPoint: true });
    }
    if (emergencyLocations.length === 0) {
      emergencyLocations = memoryStore.getLocations().filter((l) => l.isEmergencyPoint);
    }

    if (emergencyType === 'medical') {
      // Prioritize medical centre
      const medLocs = emergencyLocations.filter((l) => l.category === 'medical');
      if (medLocs.length > 0) emergencyLocations = medLocs;
    }

    if (emergencyLocations.length === 0) {
      return res.status(404).json({ success: false, message: 'No emergency points found.' });
    }

    // Find closest emergency point by routing distance
    let bestRoute = null;
    let targetLocation = null;
    let shortestDist = Infinity;

    for (const loc of emergencyLocations) {
      const calculated = dijkstraService.calculateRoute(currentCoords, loc.coordinates, { wheelchairOnly: false });
      if (calculated && calculated.primaryRoute && calculated.primaryRoute.distance < shortestDist) {
        shortestDist = calculated.primaryRoute.distance;
        bestRoute = calculated;
        targetLocation = loc;
      }
    }

    if (!bestRoute) {
      return res.status(404).json({ success: false, message: 'Could not calculate path to emergency location.' });
    }

    res.json({
      success: true,
      targetLocation,
      route: bestRoute,
      alertMessage: `Emergency routing activated. Head towards ${targetLocation.name}. Estimated arrival: ${bestRoute.primaryRoute.walkingTimeMinutes} min.`,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
