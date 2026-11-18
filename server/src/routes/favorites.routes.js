const express = require('express');
const router = express.Router();
const User = require('../models/User');
const memoryStore = require('../services/store.service');
const { protect } = require('../middleware/auth.middleware');

// @route   GET /api/favorites
// @desc    Get all bookmarked locations for authenticated user
router.get('/', protect, async (req, res) => {
  try {
    if (memoryStore.isMongoConnected()) {
      const user = await User.findById(req.user._id).populate('favorites');
      if (user) {
        return res.json({
          success: true,
          count: user.favorites.length,
          data: user.favorites,
        });
      }
    }

    // Memory Store fallback
    const userFavIds = req.user.favorites || [];
    const favLocations = userFavIds
      .map((id) => memoryStore.getLocationById(id))
      .filter(Boolean);

    res.json({
      success: true,
      count: favLocations.length,
      data: favLocations,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/favorites/:locationId
// @desc    Add or toggle favorite location
router.post('/:locationId', protect, async (req, res) => {
  try {
    const locationId = req.params.locationId;

    if (memoryStore.isMongoConnected()) {
      const user = await User.findById(req.user._id);
      if (user) {
        const isFav = user.favorites.some((fav) => fav.toString() === locationId);
        if (isFav) {
          user.favorites = user.favorites.filter((fav) => fav.toString() !== locationId);
        } else {
          user.favorites.push(locationId);
        }
        await user.save();
        return res.json({
          success: true,
          isFavorite: !isFav,
          message: !isFav ? 'Location added to favorites' : 'Location removed from favorites',
          favorites: user.favorites,
        });
      }
    }

    // In-memory toggle
    if (!req.user.favorites) req.user.favorites = [];
    const isFav = req.user.favorites.some((id) => id.toString() === locationId.toString());
    if (isFav) {
      req.user.favorites = req.user.favorites.filter((id) => id.toString() !== locationId.toString());
    } else {
      req.user.favorites.push(locationId);
    }

    res.json({
      success: true,
      isFavorite: !isFav,
      message: !isFav ? 'Location added to favorites' : 'Location removed from favorites',
      favorites: req.user.favorites,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   DELETE /api/favorites/:locationId
// @desc    Remove favorite location
router.delete('/:locationId', protect, async (req, res) => {
  try {
    const locationId = req.params.locationId;

    if (memoryStore.isMongoConnected()) {
      const user = await User.findById(req.user._id);
      if (user) {
        user.favorites = user.favorites.filter((fav) => fav.toString() !== locationId);
        await user.save();
        return res.json({
          success: true,
          message: 'Location removed from favorites',
          favorites: user.favorites,
        });
      }
    }

    if (req.user && req.user.favorites) {
      req.user.favorites = req.user.favorites.filter((id) => id.toString() !== locationId.toString());
    }

    res.json({
      success: true,
      message: 'Location removed from favorites',
      favorites: req.user.favorites || [],
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
