const app = require('./server');
const connectDB = require('./config/db');

let connPromise = null;

module.exports = async (req, res) => {
  try {
    if (!connPromise) {
      connPromise = connectDB();
    }
    await connPromise;
  } catch (err) {
    console.error('DB connection error in Vercel serverless wrapper:', err);
    res.status(500).json({ error: 'Database connection failure' });
    return;
  }

  return app(req, res);
};
