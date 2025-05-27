const express = require('express');
const router = express.Router();

// Tools will be dynamically loaded here
const portfolioTrackerRouter = require('./portfolio-tracker');
const hederaRouter = require('./hedera');
const aiForecastRouter = require('./ai-forecast');

router.use('/portfolio-tracker', portfolioTrackerRouter);
router.use('/hedera', hederaRouter);
router.use('/ai-forecast', aiForecastRouter);

// Health check for tools API
router.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    message: 'Tools API is ready',
    availableTools: ['portfolio-tracker', 'hedera', 'ai-forecast'],
    timestamp: new Date().toISOString()
  });
});

// List all available tools
router.get('/list', (req, res) => {
  res.json({
    tools: [
      {
        id: 'portfolio-tracker',
        name: 'Portfolio Tracker',
        description: 'Track and analyze your cryptocurrency portfolio',
        status: 'active',
        endpoints: ['/portfolio-tracker/prices', '/portfolio-tracker/save']
      },
      {
        id: 'hedera',
        name: 'Hedera Portfolio Dashboard',
        description: 'Hedera Hashgraph portfolio and Mirror Node API',
        status: 'active',
        endpoints: ['/hedera/account/:accountId', '/hedera/portfolio/:accountId', '/hedera/hbar-price']
      },
      {
        id: 'ai-forecast',
        name: 'AI Price Forecasting',
        description: 'AI-powered cryptocurrency price prediction using machine learning',
        status: 'active',
        endpoints: ['/ai-forecast/predict/:symbol', '/ai-forecast/train/:symbol', '/ai-forecast/historical/:symbol']
      }
    ],
    count: 3,
    timestamp: new Date().toISOString()
  });
});

module.exports = router; 
 