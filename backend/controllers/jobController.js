// controllers/jobController.js — Handles all job-related operations

const Job = require('../models/Job');
const Application = require('../models/Application');

// ─── @route  GET /api/jobs ────────────────────────────────────────────────────
// @desc    Get all jobs (with optional search filters)
// @access  Public
const getAllJobs = async (req, res) => {
  try {
    const { title, location, keyword } = req.query;

    // Build a dynamic filter object based on query params
    const filter = {};

    if (title) {
      // Case-insensitive partial match on title
      filter.title = { $regex: title, $options: 'i' };
    }
    if (location) {
      filter.location = { $regex: location, $options: 'i' };
    }
    if (keyword) {
      // Search across title, description, and keywords array
      filter.$or = [
        { title: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
        { keywords: { $in: [new RegExp(keyword, 'i')] } },
      ];
    }

    // .populate('postedBy', 'name email') — fills in recruiter's name/email
    const jobs = await Job.find(filter)
      .populate('postedBy', 'name email')
      .sort({ createdAt: -1 }); // Newest first

    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ─── @route  GET /api/jobs/:id ────────────────────────────────────────────────
// @desc    Get a single job by ID
// @access  Public
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('postedBy', 'name email');
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ─── @route  POST /api/jobs ───────────────────────────────────────────────────
// @desc    Post a new job (recruiter only)
// @access  Private / Recruiter
const createJob = async (req, res) => {
  try {
    const { title, description, company, location, salary, keywords } = req.body;

    if (!title || !description || !company || !location) {
      return res.status(400).json({ message: 'Title, description, company, and location are required' });
    }

    const job = await Job.create({
      title,
      description,
      company,
      location,
      salary,
      keywords: keywords || [],
      postedBy: req.user._id, // req.user is set by the protect middleware
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ─── @route  PUT /api/jobs/:id ────────────────────────────────────────────────
// @desc    Update a job (only the recruiter who posted it)
// @access  Private / Recruiter
const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    // Ensure the logged-in recruiter owns this job
    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to edit this job' });
    }

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // Return the updated document
    );

    res.json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ─── @route  DELETE /api/jobs/:id ────────────────────────────────────────────
// @desc    Delete a job (only the recruiter who posted it)
// @access  Private / Recruiter
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this job' });
    }

    await job.deleteOne();
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ─── @route  GET /api/jobs/my/listings ───────────────────────────────────────
// @desc    Get all jobs posted by the logged-in recruiter
// @access  Private / Recruiter
const getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user._id }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ─── @route  POST /api/jobs/:id/apply ────────────────────────────────────────
// @desc    Apply to a job (seeker only)
// @access  Private / Seeker
const applyToJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    // Check for duplicate application
    const existing = await Application.findOne({
      jobId: req.params.id,
      userId: req.user._id,
    });
    if (existing) {
      return res.status(409).json({ message: 'You have already applied to this job' });
    }

    const application = await Application.create({
      jobId: req.params.id,
      userId: req.user._id,
      coverLetter: req.body.coverLetter || '',
    });

    res.status(201).json({ message: 'Application submitted!', application });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ─── @route  GET /api/jobs/my/applications ───────────────────────────────────
// @desc    Get all jobs a seeker has applied to
// @access  Private / Seeker
const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ userId: req.user._id })
      .populate('jobId')
      .sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  getMyJobs,
  applyToJob,
  getMyApplications,
};
