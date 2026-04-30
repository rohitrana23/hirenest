// middleware/authMiddleware.js
// Two middleware functions:
//   1. protect   — verifies the JWT token (any logged-in user)
//   2. recruiterOnly — allows only recruiter role

const jwt = require('jsonwebtoken');
const User = require('../models/User');

// ─── protect ──────────────────────────────────────────────────────────────────
// Checks the Authorization header for a valid Bearer token.
// Attaches the user object to req.user so controllers can use it.
const protect = async (req, res, next) => {
  let token;

  // Tokens are sent as: Authorization: Bearer <token>
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]; // Extract token part

      // Verify and decode the token using our secret
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch the user from DB (minus the password field)
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ message: 'User not found' });
      }

      next(); // Token is valid — proceed to the controller
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

// ─── recruiterOnly ────────────────────────────────────────────────────────────
// Must be used AFTER protect middleware (req.user must exist)
const recruiterOnly = (req, res, next) => {
  if (req.user && req.user.role === 'recruiter') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied: Recruiters only' });
  }
};

module.exports = { protect, recruiterOnly };
