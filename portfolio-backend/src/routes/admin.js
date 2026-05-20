const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const Contact = require('../models/Contact');
const { protect } = require('../middleware/auth');

/**
 * GET /api/admin/dashboard
 * Returns summary stats for the admin dashboard.
 */
router.get('/dashboard', protect, async (req, res, next) => {
  try {
    const [
      totalProjects,
      publishedProjects,
      featuredProjects,
      totalContacts,
      unreadContacts,
      recentContacts,
    ] = await Promise.all([
      Project.countDocuments(),
      Project.countDocuments({ published: true }),
      Project.countDocuments({ featured: true }),
      Contact.countDocuments(),
      Contact.countDocuments({ status: 'unread' }),
      Contact.find().sort({ createdAt: -1 }).limit(5).select('name email subject status createdAt'),
    ]);

    res.json({
      success: true,
      data: {
        projects: { total: totalProjects, published: publishedProjects, featured: featuredProjects },
        contacts: { total: totalContacts, unread: unreadContacts, recent: recentContacts },
      },
    });
  } catch (err) {
    next(err);
  }
});

// Admin project routes (alias)
const {
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');

router.get('/projects', protect, getAllProjects);
router.post('/projects', protect, createProject);
router.put('/projects/:id', protect, updateProject);
router.delete('/projects/:id', protect, deleteProject);

// Admin contact routes (alias)
const {
  getContacts,
  getContact,
  updateContactStatus,
  deleteContact,
} = require('../controllers/contactController');

router.get('/contacts', protect, getContacts);
router.get('/contacts/:id', protect, getContact);
router.patch('/contacts/:id/status', protect, updateContactStatus);
router.delete('/contacts/:id', protect, deleteContact);

module.exports = router;
