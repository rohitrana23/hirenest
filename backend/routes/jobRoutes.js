// routes/jobRoutes.js
// protect      = any logged-in user
// recruiterOnly = only users with role === 'recruiter'

const express = require('express');
const router = express.Router();
const {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  getMyJobs,
  applyToJob,
  getMyApplications,
} = require('../controllers/jobController');
const { protect, recruiterOnly } = require('../middleware/authMiddleware');

// ─── Public routes ────────────────────────────────────────────────────────────
router.get('/', getAllJobs);

// ─── Protected: Recruiter-specific ───────────────────────────────────────────
// IMPORTANT: /my/listings must be defined BEFORE /:id to avoid "my" being
// treated as a MongoDB ObjectId
router.get('/my/listings', protect, recruiterOnly, getMyJobs);

// ─── Protected: Seeker-specific ───────────────────────────────────────────────
router.get('/my/applications', protect, getMyApplications);

// ─── Public job detail ────────────────────────────────────────────────────────
router.get('/:id', getJobById);

// ─── Protected: Create job (recruiter only) ───────────────────────────────────
router.post('/', protect, recruiterOnly, createJob);

// ─── Protected: Apply to job (any logged-in user) ────────────────────────────
router.post('/:id/apply', protect, applyToJob);

// ─── Protected: Edit / delete job (recruiter only) ───────────────────────────
router.put('/:id', protect, recruiterOnly, updateJob);
router.delete('/:id', protect, recruiterOnly, deleteJob);

module.exports = router;
