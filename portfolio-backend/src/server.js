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

if (process.env.VERCEL) {
  app.set('trust proxy', 1);
}

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

  try {
    await Admin.create({
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      name: process.env.ADMIN_NAME || 'Admin',
    });
    logger.info(`Default admin created: ${process.env.ADMIN_EMAIL}`);
  } catch (err) {
    if (err.code !== 11000) throw err;
    logger.info('Default admin account already exists.');
  }
};

const allowedOrigins = (process.env.ALLOWED_ORIGINS || `${process.env.FRONTEND_URL || 'http://localhost:5173'},http://localhost:3000`)
  .split(',')
  .map((origin) => origin.trim().replace(/\/$/, ''))
  .filter(Boolean);

const isAllowedOrigin = (origin, requestHost) => {
  if (!origin) return true;
  const normalized = origin.replace(/\/$/, '');
  if (allowedOrigins.includes(normalized)) return true;

  if (process.env.NODE_ENV !== 'production' && (
    /^http:\/\/localhost:\d+$/.test(normalized) ||
    /^http:\/\/127\.0\.0\.1:\d+$/.test(normalized)
  )) {
    return true;
  }

  try {
    return Boolean(requestHost && new URL(normalized).host === requestHost);
  } catch {
    return false;
  }
};

// Security middleware
app.use(helmet());

// CORS
app.use(cors((req, callback) => {
  const forwardedHost = req.get('x-forwarded-host');
  const requestHost = (forwardedHost || req.get('host') || '').split(',')[0].trim();
  callback(null, {
    origin: isAllowedOrigin(req.get('origin'), requestHost),
    credentials: true,
  });
}));

// Compression
app.use(compression());

// Logging
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined', { stream: logger.stream }));
}

// Rate limiting
app.use('/api/', apiLimiter);

// Body parsing
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/projects', require('./routes/projects'));

// Health checks
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'portfolio-api' });
});

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling
app.use(notFound);
app.use(errorHandler);

const PORT = Number(process.env.PORT || 5000);

let server;

const initialize = async () => {
  await connectDB();
  await ensureAdminAccount();
};

const startServer = async () => {
  await initialize();

  server = app.listen(PORT, () => {
    logger.info(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });

  server.on('error', (err) => {
    logger.error(`Server error: ${err.message}`);
    throw err;
  });

  process.on('unhandledRejection', (err) => {
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

app.initialize = initialize;

module.exports = app;
