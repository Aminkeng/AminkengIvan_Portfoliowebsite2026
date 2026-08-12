const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const Contact = require('../models/Contact');
const { protectAdmin } = require('../middleware/auth');

/**
 * GET /api/admin/dashboard
 * Returns summary stats for the admin dashboard.
 */
router.get('/dashboard', protectAdmin, async (req, res, next) => {
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

router.get('/projects', protectAdmin, getAllProjects);
router.post('/projects', protectAdmin, createProject);
router.put('/projects/:id', protectAdmin, updateProject);
router.delete('/projects/:id', protectAdmin, deleteProject);

// Admin contact routes (alias)
const {
  getContacts,
  getContact,
  updateContactStatus,
  deleteContact,
} = require('../controllers/contactController');

router.get('/contacts', protectAdmin, getContacts);
router.get('/contacts/:id', protectAdmin, getContact);
router.patch('/contacts/:id/status', protectAdmin, updateContactStatus);
router.delete('/contacts/:id', protectAdmin, deleteContact);

module.exports = router;
