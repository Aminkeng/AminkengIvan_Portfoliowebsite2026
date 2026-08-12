const app = require('./server');
const logger = require('./utils/logger');

let initializationPromise = null;

const isHealthCheck = (url = '') => /^\/(?:api\/)?health\/?(?:\?|$)/.test(url);

module.exports = async (req, res) => {
  if (isHealthCheck(req.url)) {
    return app(req, res);
  }

  try {
    if (!initializationPromise) {
      initializationPromise = app.initialize().catch((err) => {
        initializationPromise = null;
        throw err;
      });
    }
    await initializationPromise;
  } catch (err) {
    logger.error(`API initialization failed: ${err.message}`);
    return res.status(503).json({
      success: false,
      message: 'API service is temporarily unavailable',
    });
  }

  return app(req, res);
};
