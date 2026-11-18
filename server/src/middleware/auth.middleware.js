const jwt = require('jsonwebtoken');
const User = require('../models/User');
const memoryStore = require('../services/store.service');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized to access this route. Please log in.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecretcampusvigationjwtkey2025');

    if (memoryStore.isMongoConnected()) {
      req.user = await User.findById(decoded.id).select('-password');
    }

    if (!req.user) {
      req.user = memoryStore.getUserById(decoded.id);
    }

    if (!req.user) {
      return res.status(401).json({ success: false, message: 'User belonging to this token no longer exists.' });
    }
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired authentication token.' });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `User role '${req.user ? req.user.role : 'unauthenticated'}' is not authorized to perform this operation. Required role: ${roles.join(' or ')}`,
      });
    }
    next();
  };
};

module.exports = {
  protect,
  authorize,
};
