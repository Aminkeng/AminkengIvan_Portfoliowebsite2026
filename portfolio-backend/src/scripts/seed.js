/**
 * Seed script – run once to create the admin account and sample projects.
 * Usage: node src/scripts/seed.js
 */
require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('../models/Admin');
const Project = require('../models/Project');
const logger = require('../utils/logger');

const sampleProjects = [
  {
    title: 'Portfolio Website',
    description:
      'A modern, responsive portfolio website built with React and Vite featuring smooth animations, dark mode, and a contact form.',
    shortDescription: 'Personal portfolio built with React & Vite',
    technologies: ['React', 'Vite', 'CSS', 'Node.js', 'Express', 'MongoDB'],
    category: 'web',
    liveUrl: 'https://yourportfolio.com',
    githubUrl: 'https://github.com/Aminkeng/bigjonesportfolio_44',
    featured: true,
    order: 1,
    published: true,
  },
  {
    title: 'E-Commerce Platform',
    description:
      'Full-stack e-commerce application with product management, cart functionality, payment processing, and order tracking.',
    shortDescription: 'Full-stack e-commerce with payments',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redux'],
    category: 'web',
    featured: true,
    order: 2,
    published: true,
  },
  {
    title: 'Task Manager App',
    description:
      'Productivity app for managing tasks with drag-and-drop, categories, due dates, and team collaboration features.',
    shortDescription: 'Collaborative task management app',
    technologies: ['React', 'TypeScript', 'Firebase', 'Tailwind CSS'],
    category: 'web',
    featured: false,
    order: 3,
    published: true,
  },
];

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  logger.info('Connected to database');

  // Create admin
  const existing = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
  if (existing) {
    logger.info('Admin already exists – skipping');
  } else {
    await Admin.create({
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      name: 'BigJones Admin',
    });
    logger.info(`Admin created: ${process.env.ADMIN_EMAIL}`);
  }

  // Seed projects
  const projectCount = await Project.countDocuments();
  if (projectCount === 0) {
    await Project.insertMany(sampleProjects);
    logger.info(`Seeded ${sampleProjects.length} projects`);
  } else {
    logger.info('Projects already exist – skipping');
  }

  await mongoose.disconnect();
  logger.info('Seed complete ✓');
};

seed().catch((err) => {
  logger.error(err.message);
  process.exit(1);
});
