const app = require('../portfolio-backend/src/server');
const connectDB = require('../portfolio-backend/src/config/db');

let connPromise = null;

module.exports = async (req, res) => {
  try {
    if (!connPromise) {
      connPromise = connectDB();
    }
    await connPromise;
  } catch (err) {
    console.error('DB connection error in serverless wrapper:', err);
    res.status(500).json({ error: 'Database connection failure' });
    return;
  }

  // Delegate to Express app
  return app(req, res);
};
