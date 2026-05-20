const { validationResult } = require('express-validator');
const Contact = require('../models/Contact');
const { sendContactNotification, sendContactAutoReply } = require('../utils/email');
const logger = require('../utils/logger');

/**
 * POST /api/contact
 * Public – submit a contact form.
 */
exports.submitContact = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, email, subject, message } = req.body;

    const contact = await Contact.create({
      name,
      email,
      subject: subject || 'Portfolio Contact',
      message,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent') || '',
    });

    // Fire-and-forget emails (don't block the response)
    Promise.allSettled([
      sendContactNotification({ name, email, subject: contact.subject, message }),
      sendContactAutoReply({ name, email }),
    ])
      .then((results) => {
        const emailSent = results.every((r) => r.status === 'fulfilled');
        if (emailSent) {
          Contact.findByIdAndUpdate(contact._id, { emailSent: true }).exec();
        } else {
          results
            .filter((r) => r.status === 'rejected')
            .forEach((r) => logger.error(`Email error: ${r.reason?.message}`));
        }
      });

    logger.info(`Contact form submitted from ${email}`);

    res.status(201).json({
      success: true,
      message: "Thank you for your message! I'll be in touch soon.",
    });
  } catch (err) {
    next(err);
  }
};

// ── Admin ────────────────────────────────────────────────────────────────────

/**
 * GET /api/admin/contacts
 * Query: ?status=unread&page=1&limit=20
 */
exports.getContacts = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (status) filter.status = status;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [contacts, total] = await Promise.all([
      Contact.find(filter).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)),
      Contact.countDocuments(filter),
    ]);

    const unreadCount = await Contact.countDocuments({ status: 'unread' });

    res.json({
      success: true,
      count: contacts.length,
      total,
      unreadCount,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: contacts,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/admin/contacts/:id
 */
exports.getContact = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      const err = new Error('Contact not found');
      err.statusCode = 404;
      return next(err);
    }
    // Mark as read automatically when viewed
    if (contact.status === 'unread') {
      contact.status = 'read';
      await contact.save();
    }
    res.json({ success: true, data: contact });
  } catch (err) {
    next(err);
  }
};

/**
 * PATCH /api/admin/contacts/:id/status
 */
exports.updateContactStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const allowed = ['unread', 'read', 'replied', 'archived'];
    if (!allowed.includes(status)) {
      return res.status(400).json({ success: false, message: `Status must be one of: ${allowed.join(', ')}` });
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!contact) {
      const err = new Error('Contact not found');
      err.statusCode = 404;
      return next(err);
    }

    res.json({ success: true, data: contact });
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE /api/admin/contacts/:id
 */
exports.deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      const err = new Error('Contact not found');
      err.statusCode = 404;
      return next(err);
    }
    res.json({ success: true, message: 'Contact deleted' });
  } catch (err) {
    next(err);
  }
};
