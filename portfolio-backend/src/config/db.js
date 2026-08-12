const mongoose = require('mongoose');
const logger = require('../utils/logger');

const cached = globalThis.__portfolioMongoose || (globalThis.__portfolioMongoose = {
  connection: null,
  promise: null,
});

const connectDB = async () => {
  if (cached.connection && mongoose.connection.readyState === 1) {
    return cached.connection;
  }

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not configured');
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGO_URI, {
      maxPoolSize: 5,
      serverSelectionTimeoutMS: 5000,
    });
  }

  try {
    cached.connection = await cached.promise;
    logger.info(`MongoDB connected: ${cached.connection.connection.host}`);
    return cached.connection;
  } catch (err) {
    cached.connection = null;
    cached.promise = null;
    logger.error(`MongoDB connection error: ${err.message}`);
    throw err;
  }
};

mongoose.connection.on('disconnected', () => {
  cached.connection = null;
  cached.promise = null;
  logger.warn('MongoDB disconnected');
});

module.exports = connectDB;
