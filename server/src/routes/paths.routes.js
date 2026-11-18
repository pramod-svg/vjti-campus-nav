const express = require('express');
const router = express.Router();
const CampusPath = require('../models/CampusPath');
const dijkstraService = require('../services/dijkstra.service');
const memoryStore = require('../services/store.service');
const { protect, authorize } = require('../middleware/auth.middleware');

// @route   GET /api/paths
// @desc    Get all walkable paths on campus
router.get('/', async (req, res) => {
  try {
    let paths = [];
    if (memoryStore.isMongoConnected()) {
      paths = await CampusPath.find();
    } else {
      paths = memoryStore.getPaths();
    }

    res.json({
      success: true,
      count: paths.length,
      data: paths,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/paths
// @desc    Add new campus walkway path (Admin only)
router.post('/', protect, authorize('admin'), async (req, res) => {
  try {
    const path = await CampusPath.create(req.body);

    // Refresh routing service graph
    const allPaths = await CampusPath.find();
    dijkstraService.loadPaths(allPaths);

    res.status(201).json({
      success: true,
      message: 'Path created successfully',
      data: path,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// @route   PUT /api/paths/:id
// @desc    Update campus path (Admin only)
router.put('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const path = await CampusPath.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!path) {
      return res.status(404).json({ success: false, message: 'Campus path not found' });
    }

    // Refresh routing service graph
    const allPaths = await CampusPath.find();
    dijkstraService.loadPaths(allPaths);

    res.json({
      success: true,
      message: 'Path updated successfully',
      data: path,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// @route   DELETE /api/paths/:id
// @desc    Delete campus path (Admin only)
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const path = await CampusPath.findByIdAndDelete(req.params.id);
    if (!path) {
      return res.status(404).json({ success: false, message: 'Campus path not found' });
    }

    // Refresh routing service graph
    const allPaths = await CampusPath.find();
    dijkstraService.loadPaths(allPaths);

    res.json({
      success: true,
      message: 'Path deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
