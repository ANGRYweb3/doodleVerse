const express = require('express');
const router = express.Router();
const {
  getHBARData,
  getTechnicalIndicators,
  generateForecast,
  performBacktesting,
  getStatus,
  getDashboardData
} = require('../controllers/hbarController');

// Routes for HBAR data and analysis
router.get('/data', getHBARData);
router.get('/indicators', getTechnicalIndicators);
router.get('/forecast', generateForecast);
router.get('/backtest', performBacktesting);
router.get('/status', getStatus);
router.get('/dashboard', getDashboardData);

module.exports = router; 