// controllers/authController.js — Handles user registration and login

const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// ─── Helper: Generate JWT token ───────────────────────────────────────────────
// We store only the user's id in the token payload (keep it minimal)
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d', // Token expires in 7 days
  });
};

// ─── @route  POST /api/auth/register ─────────────────────────────────────────
// @desc    Register a new user (seeker or recruiter)
// @access  Public
const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Basic validation
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists with this email' });
    }

    // Create user (password is hashed automatically via the pre-save hook in the model)
    const user = await User.create({ name, email, password, role });

    // Return user info + token (so they're logged in right after signup)
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ─── @route  POST /api/auth/login ────────────────────────────────────────────
// @desc    Authenticate user and return JWT
// @access  Public
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    if (user.provider !== 'local') {
      return res.status(400).json({ message: 'Please sign in with Google for this account' });
    }

    // Compare entered password with hashed password in DB
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ─── @route  POST /api/auth/google ───────────────────────────────────────────
// @desc    Authenticate or create user via Google OAuth token
// @access  Public
const googleLogin = async (req, res) => {
  try {
    const { idToken, role } = req.body;
    if (!idToken || !role) {
      return res.status(400).json({ message: 'Google token and role are required' });
    }

    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload?.email_verified) {
      return res.status(401).json({ message: 'Google email not verified' });
    }

    const email = payload.email.toLowerCase();
    const name = payload.name || 'Google User';

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        name,
        email,
        provider: 'google',
        role,
      });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: 'Google auth failed', error: error.message });
  }
};

module.exports = { register, login, googleLogin };
