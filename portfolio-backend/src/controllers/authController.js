const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const Admin = require('../models/Admin');
const User = require('../models/User');
const logger = require('../utils/logger');

const signToken = (id, role = 'admin') =>
  jwt.sign({ id, role }, process.env.JWT_SECRET, {
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

    const token = signToken(admin._id, 'admin');

    logger.info(`New admin registered: ${admin.email}`);

    res.status(201).json({
      success: true,
      message: 'Admin registration successful! Welcome!',
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
 * POST /api/auth/public-signup
 */
exports.publicSignup = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email, password, name } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'Email already registered' });
    }

    const user = await User.create({
      email,
      password,
      name: name || 'User',
      role: 'user',
    });

    const token = signToken(user._id, 'user');

    logger.info(`New public user registered: ${user.email}`);

    res.status(201).json({
      success: true,
      message: 'Registration successful! Welcome!',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: 'user',
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

    if (admin && (await admin.comparePassword(password))) {
      admin.lastLogin = new Date();
      await admin.save({ validateBeforeSave: false });

      const token = signToken(admin._id, 'admin');

      logger.info(`Admin login: ${admin.email}`);

      return res.json({
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
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    user.lastLogin = new Date();
    await user.save({ validateBeforeSave: false });

    const token = signToken(user._id, 'user');

    logger.info(`Public user login: ${user.email}`);

    return res.json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: 'user',
        lastLogin: user.lastLogin,
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
  const account = req.user || req.admin;
  res.json({
    success: true,
    user: {
      id: account._id,
      email: account.email,
      name: account.name,
      role: account.role || (req.admin ? 'admin' : 'user'),
      lastLogin: account.lastLogin,
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

    const account = req.user || req.admin;
    const Model = account.role === 'user' ? User : Admin;
    const record = await Model.findById(account._id).select('+password');
    if (!(await record.comparePassword(currentPassword))) {
      return res.status(401).json({ success: false, message: 'Current password is incorrect' });
    }

    record.password = newPassword;
    await record.save();

    logger.info(`Password changed: ${record.email}`);
    res.json({ success: true, message: 'Password updated successfully' });
  } catch (err) {
    next(err);
  }
};
