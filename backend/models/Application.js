// models/Application.js — Tracks job applications by seekers

const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['applied', 'reviewed', 'rejected', 'accepted'],
      default: 'applied',
    },
    coverLetter: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

// Prevent a user from applying to the same job twice
applicationSchema.index({ jobId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model('Application', applicationSchema);
