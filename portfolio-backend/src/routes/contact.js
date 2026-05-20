const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  submitContact,
  getContacts,
  getContact,
  updateContactStatus,
  deleteContact,
} = require('../controllers/contactController');
const { protect } = require('../middleware/auth');
const { contactLimiter } = require('../middleware/rateLimiter');

// ── Public ──────────────────────────────────────────────
const contactValidation = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }),
  body('email').trim().isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('subject').optional().trim().isLength({ max: 200 }),
  body('message').trim().notEmpty().withMessage('Message is required').isLength({ max: 2000 }),
];

router.post('/', contactLimiter, contactValidation, submitContact);

// ── Admin (protected) ───────────────────────────────────
router.use(protect);
router.get('/', getContacts);
router.get('/:id', getContact);
router.patch('/:id/status', updateContactStatus);
router.delete('/:id', deleteContact);

module.exports = router;
