const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const memoryStore = require('../services/store.service');
const { protect, authorize } = require('../middleware/auth.middleware');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'supersecretcampusvigationjwtkey2025', {
    expiresIn: '30d',
  });
};

// @route   POST /api/auth/register
// @desc    Register a new user (Student, Faculty, or Admin)
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role = 'student', department = 'General' } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide name, email, and password.' });
    }

    if (memoryStore.isMongoConnected()) {
      const existingUser = await User.findOne({ email: email.toLowerCase() });
      if (existingUser) {
        return res.status(400).json({ success: false, message: 'An account with this email already exists.' });
      }

      const user = await User.create({
        name,
        email: email.toLowerCase(),
        password,
        role,
        department,
      });

      const token = generateToken(user._id);

      return res.status(201).json({
        success: true,
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          department: user.department,
          favorites: user.favorites,
        },
      });
    } else {
      // In-memory registration
      const newMemUser = {
        _id: `usr_${Date.now()}`,
        name,
        email: email.toLowerCase(),
        role,
        department,
        favorites: [],
      };
      memoryStore.getUsers().push(newMemUser);
      const token = generateToken(newMemUser._id);
      return res.status(201).json({
        success: true,
        token,
        user: newMemUser,
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password.' });
    }

    if (memoryStore.isMongoConnected()) {
      const user = await User.findOne({ email: email.toLowerCase() }).select('+password').populate('favorites');
      if (user && (await user.matchPassword(password))) {
        const token = generateToken(user._id);
        return res.json({
          success: true,
          token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            department: user.department,
            favorites: user.favorites,
          },
        });
      }
    }

    // In-memory or demo fallback
    const memUser = memoryStore.getUserByEmail(email);
    if (memUser && (password === 'password123' || password.length >= 6)) {
      const token = generateToken(memUser._id);
      return res.json({
        success: true,
        token,
        user: {
          id: memUser._id,
          name: memUser.name,
          email: memUser.email,
          role: memUser.role,
          department: memUser.department,
          favorites: memUser.favorites || [],
        },
      });
    }

    return res.status(401).json({ success: false, message: 'Invalid email or password credentials.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/auth/me
// @desc    Get current logged in user details
router.get('/me', protect, async (req, res) => {
  try {
    if (req.user) {
      return res.json({
        success: true,
        user: req.user,
      });
    }
    res.status(401).json({ success: false, message: 'User not found' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/auth/users
// @desc    Get all users (Admin only)
router.get('/users', protect, authorize('admin'), async (req, res) => {
  try {
    let users = [];
    if (memoryStore.isMongoConnected()) {
      users = await User.find().select('-password').sort({ createdAt: -1 });
    } else {
      users = memoryStore.getUsers();
    }
    res.json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   PUT /api/auth/users/:id/role
// @desc    Update user role (Admin only)
router.put('/users/:id/role', protect, authorize('admin'), async (req, res) => {
  try {
    const { role } = req.body;
    if (!['student', 'faculty', 'admin'].includes(role)) {
      return res.status(400).json({ success: false, message: 'Invalid role specified.' });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    res.json({
      success: true,
      message: `User role updated to ${role} successfully.`,
      data: user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   DELETE /api/auth/users/:id
// @desc    Delete user account (Admin only)
router.delete('/users/:id', protect, authorize('admin'), async (req, res) => {
  try {
    if (req.user._id.toString() === req.params.id) {
      return res.status(400).json({ success: false, message: 'You cannot delete your own admin account.' });
    }

    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    res.json({
      success: true,
      message: 'User removed successfully.',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
