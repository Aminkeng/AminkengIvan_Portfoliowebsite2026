const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { login, getMe, changePassword } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { authLimiter } = require('../middleware/rateLimiter');

const loginValidation = [
  body('email').trim().isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
];

router.post('/login', authLimiter, loginValidation, login);
router.get('/me', protect, getMe);
router.put('/change-password', protect, changePassword);

module.exports = router;
