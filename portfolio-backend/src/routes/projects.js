const express = require('express');
const router = express.Router();
const {
  getProjects,
  getProject,
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');
const { protect } = require('../middleware/auth');

// ── Public ──────────────────────────────────────────────
router.get('/', getProjects);
router.get('/:id', getProject);

// ── Admin (protected) ───────────────────────────────────
router.use(protect);
router.get('/admin/all', getAllProjects);
router.post('/', createProject);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);

module.exports = router;
