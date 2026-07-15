const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { login, register, getMe, changePassword } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { authLimiter } = require('../middleware/rateLimiter');

const loginValidation = [
  body('email').trim().isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
];

const registerValidation = [
  body('email').trim().isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters').trim(),
  body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
];

router.post('/register', authLimiter, registerValidation, register);
router.post('/login', authLimiter, loginValidation, login);
router.get('/me', protect, getMe);
router.put('/change-password', protect, changePassword);

module.exports = router;
