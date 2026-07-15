const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const Admin = require('../models/Admin');
const logger = require('../utils/logger');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });

/**
 * POST /api/auth/register
 */
exports.register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email, password, name } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(409).json({ success: false, message: 'Email already registered' });
    }

    // Create new admin
    const admin = await Admin.create({
      email,
      password,
      name: name || 'Admin',
    });

    const token = signToken(admin._id);

    logger.info(`New admin registered: ${admin.email}`);

    res.status(201).json({
      success: true,
      message: 'Registration successful! Welcome!',
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        role: 'admin',
      },
      user: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        role: 'admin',
      },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/auth/login
 */
exports.login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email, password } = req.body;
    const admin = await Admin.findOne({ email }).select('+password');

    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    admin.lastLogin = new Date();
    await admin.save({ validateBeforeSave: false });

    const token = signToken(admin._id);

    logger.info(`Admin login: ${admin.email}`);

    res.json({
      success: true,
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        role: 'admin',
        lastLogin: admin.lastLogin,
      },
      user: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        role: 'admin',
        lastLogin: admin.lastLogin,
      },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/auth/me  (protected)
 */
exports.getMe = async (req, res) => {
  res.json({
    success: true,
    admin: {
      id: req.admin._id,
      email: req.admin.email,
      name: req.admin.name,
      lastLogin: req.admin.lastLogin,
    },
  });
};

/**
 * PUT /api/auth/change-password  (protected)
 */
exports.changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ success: false, message: 'Both currentPassword and newPassword are required' });
    }
    if (newPassword.length < 8) {
      return res.status(400).json({ success: false, message: 'New password must be at least 8 characters' });
    }

    const admin = await Admin.findById(req.admin._id).select('+password');
    if (!(await admin.comparePassword(currentPassword))) {
      return res.status(401).json({ success: false, message: 'Current password is incorrect' });
    }

    admin.password = newPassword;
    await admin.save();

    logger.info(`Admin password changed: ${admin.email}`);
    res.json({ success: true, message: 'Password updated successfully' });
  } catch (err) {
    next(err);
  }
};
