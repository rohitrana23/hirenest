// models/User.js — Defines the User schema for MongoDB

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,         // No two users can share the same email
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: function () {
        return this.provider === 'local';
      },
      minlength: 6,
    },
    provider: {
      type: String,
      enum: ['local', 'google'],
      default: 'local',
    },
    role: {
      type: String,
      enum: ['seeker', 'recruiter'], // Only these two values are allowed
      required: [true, 'Role is required'],
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt automatically
);

// ─── Pre-save hook: Hash password before storing ───────────────────────────
// This runs automatically every time a user is saved
userSchema.pre('save', async function (next) {
  // Skip hashing when there is no password or the password was not changed
  if (!this.isModified('password') || !this.password) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// ─── Instance method: Compare entered password with stored hash ────────────
userSchema.methods.matchPassword = async function (enteredPassword) {
  if (!this.password) return false;
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
