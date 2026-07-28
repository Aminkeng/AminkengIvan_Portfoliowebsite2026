const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const connectDB = require('./config/db');
const Admin = require('./models/Admin');
const logger = require('./utils/logger');
const { notFound, errorHandler } = require('./middleware/errorHandler');
const { apiLimiter } = require('./middleware/rateLimiter');

const app = express();

const ensureAdminAccount = async () => {
  if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
    logger.warn('ADMIN_EMAIL or ADMIN_PASSWORD is not configured. Default admin account will not be created.');
    return;
  }

  const existingAdmin = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
  if (existingAdmin) {
    logger.info('Default admin account already exists.');
    return;
  }

  await Admin.create({
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
    name: process.env.ADMIN_NAME || 'Admin',
  });
  logger.info(`Default admin created: ${process.env.ADMIN_EMAIL}`);
};

const allowedOrigins = (process.env.ALLOWED_ORIGINS || `${process.env.FRONTEND_URL || 'http://localhost:5173'},http://localhost:3000`)
  .split(',')
  .map((origin) => origin.trim().replace(/\/$/, ''))
  .filter(Boolean);

const isAllowedOrigin = (origin) => {
  if (!origin) return true;
  const normalized = origin.replace(/\/$/, '');
  return (
    allowedOrigins.includes(normalized) ||
    /^http:\/\/localhost:\d+$/.test(normalized) ||
    /^http:\/\/127\.0\.0\.1:\d+$/.test(normalized)
  );
};

// Security middleware
app.use(helmet());

// CORS
app.use(cors({
  origin: (origin, callback) => {
    if (isAllowedOrigin(origin)) {
      callback(null, true);
      return;
    }
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));

// Compression
app.use(compression());

// Logging
app.use(morgan('combined', { stream: logger.stream }));

// Rate limiting
app.use('/api/', apiLimiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/projects', require('./routes/projects'));

// Health checks
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling
app.use(notFound);
app.use(errorHandler);

const PORT = Number(process.env.PORT || 5000);

let server;

const startServer = async () => {
  await connectDB();
  await ensureAdminAccount();

  server = app.listen(PORT, () => {
    logger.info(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      const fallbackPort = PORT + 1;
      logger.warn(`Port ${PORT} is already in use. Retrying on ${fallbackPort}.`);
      server.close(() => {
        server = app.listen(fallbackPort, () => {
          logger.info(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${fallbackPort}`);
        });
      });
      return;
    }
    throw err;
  });

  process.on('unhandledRejection', (err, promise) => {
    logger.error(`Error: ${err.message}`);
    if (server) {
      server.close(() => {
        process.exit(1);
      });
    }
  });
};

if (require.main === module) {
  startServer().catch((err) => {
    logger.error(`Server failed to start: ${err.message}`);
    process.exit(1);
  });
}

module.exports = app;