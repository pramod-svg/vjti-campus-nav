const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Location = require('../models/Location');
const CampusPath = require('../models/CampusPath');
const SearchHistory = require('../models/SearchHistory');
const memoryStore = require('../services/store.service');
const { protect, authorize } = require('../middleware/auth.middleware');

// @route   GET /api/analytics/dashboard
// @desc    Get system analytics for Admin Dashboard
router.get('/dashboard', protect, authorize('admin'), async (req, res) => {
  try {
    if (memoryStore.isMongoConnected()) {
      const totalUsers = await User.countDocuments();
      const totalLocations = await Location.countDocuments();
      const totalPaths = await CampusPath.countDocuments();

      // Role breakdown
      const studentsCount = await User.countDocuments({ role: 'student' });
      const facultyCount = await User.countDocuments({ role: 'faculty' });
      const adminCount = await User.countDocuments({ role: 'admin' });

      // Most viewed / navigated locations
      const topDestinations = await Location.find()
        .sort({ viewsCount: -1 })
        .limit(6)
        .select('name category department viewsCount coordinates');

      // Category distribution
      const categoryStats = await Location.aggregate([
        {
          $group: {
            _id: '$category',
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
      ]);

      // Recent Searches
      const recentSearches = await SearchHistory.find()
        .sort({ createdAt: -1 })
        .limit(10)
        .populate('userId', 'name email role');

      // Accessibility stats
      const accessibleLocationsCount = await Location.countDocuments({
        'accessibilityInformation.wheelchairAccessible': true,
      });
      const accessiblePathsCount = await CampusPath.countDocuments({
        'accessibility.wheelchairAccessible': true,
      });

      return res.json({
        success: true,
        stats: {
          totalUsers,
          totalLocations,
          totalPaths,
          studentsCount,
          facultyCount,
          adminCount,
          accessibleLocationsCount,
          accessiblePathsCount,
          accessibilityPercentage: totalLocations > 0 ? Math.round((accessibleLocationsCount / totalLocations) * 100) : 0,
        },
        topDestinations,
        categoryStats,
        recentSearches,
      });
    }

    // In-memory analytics fallback
    const memLocations = memoryStore.getLocations();
    const memPaths = memoryStore.getPaths();
    const memUsers = memoryStore.getUsers();

    const accessibleLocations = memLocations.filter((l) => l.accessibilityInformation?.wheelchairAccessible);

    res.json({
      success: true,
      stats: {
        totalUsers: memUsers.length,
        totalLocations: memLocations.length,
        totalPaths: memPaths.length,
        studentsCount: memUsers.filter((u) => u.role === 'student').length,
        facultyCount: memUsers.filter((u) => u.role === 'faculty').length,
        adminCount: memUsers.filter((u) => u.role === 'admin').length,
        accessibleLocationsCount: accessibleLocations.length,
        accessiblePathsCount: memPaths.filter((p) => p.accessibility?.wheelchairAccessible).length,
        accessibilityPercentage: 100,
      },
      topDestinations: memLocations.slice(0, 6).map((l) => ({
        _id: l._id,
        name: l.name,
        category: l.category,
        department: l.department,
        viewsCount: l.viewsCount || 50,
        coordinates: l.coordinates,
      })),
      categoryStats: [
        { _id: 'academic', count: memLocations.filter((l) => l.category === 'academic').length },
        { _id: 'food', count: memLocations.filter((l) => l.category === 'food').length },
        { _id: 'library', count: memLocations.filter((l) => l.category === 'library').length },
        { _id: 'administration', count: memLocations.filter((l) => l.category === 'administration').length },
        { _id: 'accommodation', count: memLocations.filter((l) => l.category === 'accommodation').length },
      ],
      recentSearches: [
        { _id: 's1', searchedLocation: 'Computer Engineering Department', timestamp: new Date() },
        { _id: 's2', searchedLocation: 'Central Library', timestamp: new Date() },
      ],
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
