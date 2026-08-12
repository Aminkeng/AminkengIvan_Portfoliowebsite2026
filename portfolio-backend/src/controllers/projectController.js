const Project = require('../models/Project');
const logger = require('../utils/logger');
const mongoose = require('mongoose');

const isValidId = (id) => mongoose.isValidObjectId(id);

const notFound = (msg) => {
  const err = new Error(msg);
  err.statusCode = 404;
  return err;
};

// ── Public ──────────────────────────────────────────────────────────────────

/**
 * GET /api/projects
 * Returns all published projects.
 * Query params: ?category=web&featured=true&page=1&limit=10
 */
exports.getProjects = async (req, res, next) => {
  try {
    const { category, featured, page = 1, limit = 20 } = req.query;
    const filter = { published: true };

    if (category) filter.category = category;
    if (featured !== undefined) filter.featured = featured === 'true';

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [projects, total] = await Promise.all([
      Project.find(filter)
        .sort({ featured: -1, order: 1, createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Project.countDocuments(filter),
    ]);

    res.json({
      success: true,
      count: projects.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: projects,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/projects/:id
 */
exports.getProject = async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) return next(notFound('Project not found'));
    const project = await Project.findOne({ _id: req.params.id, published: true });
    if (!project) return next(notFound('Project not found'));
    res.json({ success: true, data: project });
  } catch (err) {
    next(err);
  }
};

// ── Admin ────────────────────────────────────────────────────────────────────

/**
 * GET /api/admin/projects  (includes unpublished)
 */
exports.getAllProjects = async (req, res, next) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, count: projects.length, data: projects });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/admin/projects
 */
exports.createProject = async (req, res, next) => {
  try {
    const project = await Project.create(req.body);
    logger.info(`Project created: ${project._id}`);
    res.status(201).json({ success: true, data: project });
  } catch (err) {
    next(err);
  }
};

/**
 * PUT /api/admin/projects/:id
 */
exports.updateProject = async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) return next(notFound('Project not found'));
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!project) return next(notFound('Project not found'));
    logger.info(`Project updated: ${project._id}`);
    res.json({ success: true, data: project });
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE /api/admin/projects/:id
 */
exports.deleteProject = async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) return next(notFound('Project not found'));
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return next(notFound('Project not found'));
    logger.info(`Project deleted: ${req.params.id}`);
    res.json({ success: true, message: 'Project deleted' });
  } catch (err) {
    next(err);
  }
};
