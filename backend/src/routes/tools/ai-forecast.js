const express = require('express');
const axios = require('axios');
const router = express.Router();

// Python AI service configuration
const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:5000';

// Timeout configuration
const REQUEST_TIMEOUT = 30000; // 30 seconds

// Create axios instance with timeout
const aiService = axios.create({
  baseURL: AI_SERVICE_URL,
  timeout: REQUEST_TIMEOUT,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Error handler for AI service requests
const handleAIServiceError = (error, res) => {
  console.error('AI Service Error:', error.message);
  
  if (error.code === 'ECONNREFUSED') {
    return res.status(503).json({
      error: 'AI forecasting service is not available',
      message: 'Please ensure the Python AI service is running',
      service_url: AI_SERVICE_URL
    });
  }
  
  if (error.response) {
    return res.status(error.response.status).json({
      error: error.response.data.error || 'AI service error',
      details: error.response.data
    });
  }
  
  return res.status(500).json({
    error: 'Failed to communicate with AI service',
    message: error.message
  });
};

// Health check for AI service
router.get('/health', async (req, res) => {
  try {
    const response = await aiService.get('/health');
    res.json({
      ai_service: 'healthy',
      ai_service_data: response.data,
      node_service: 'healthy',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    handleAIServiceError(error, res);
  }
});

// Get supported symbols
router.get('/symbols', async (req, res) => {
  try {
    const response = await aiService.get('/symbols');
    res.json(response.data);
  } catch (error) {
    handleAIServiceError(error, res);
  }
});

// Get current price for a symbol
router.get('/price/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;
    const response = await aiService.get(`/price/${symbol}`);
    res.json(response.data);
  } catch (error) {
    handleAIServiceError(error, res);
  }
});

// Get historical data
router.get('/historical/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;
    const { period = '3mo', interval = '1d' } = req.query;
    
    const response = await aiService.get(`/historical/${symbol}`, {
      params: { period, interval }
    });
    
    res.json(response.data);
  } catch (error) {
    handleAIServiceError(error, res);
  }
});

// Train AI model
router.post('/train/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;
    
    // Increase timeout for training requests
    const response = await aiService.post(`/train/${symbol}`, {}, {
      timeout: 300000 // 5 minutes for training
    });
    
    res.json(response.data);
  } catch (error) {
    handleAIServiceError(error, res);
  }
});

// Get training status
router.get('/training-status/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;
    const response = await aiService.get(`/training-status/${symbol}`);
    res.json(response.data);
  } catch (error) {
    handleAIServiceError(error, res);
  }
});

// Make predictions
router.post('/predict/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;
    const { days_ahead = 7 } = req.body;
    
    // Validate days_ahead
    if (days_ahead < 1 || days_ahead > 30) {
      return res.status(400).json({
        error: 'days_ahead must be between 1 and 30'
      });
    }
    
    const response = await aiService.post(`/predict/${symbol}`, {
      days_ahead
    }, {
      timeout: 60000 // 1 minute for predictions
    });
    
    res.json(response.data);
  } catch (error) {
    handleAIServiceError(error, res);
  }
});

// Get model information
router.get('/model-info/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;
    const response = await aiService.get(`/model-info/${symbol}`);
    res.json(response.data);
  } catch (error) {
    handleAIServiceError(error, res);
  }
});

// Retrain model
router.post('/retrain/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;
    
    const response = await aiService.post(`/retrain/${symbol}`, {}, {
      timeout: 300000 // 5 minutes for retraining
    });
    
    res.json(response.data);
  } catch (error) {
    handleAIServiceError(error, res);
  }
});

// Batch predictions for multiple symbols
router.post('/batch-predict', async (req, res) => {
  try {
    const { symbols = ['HBAR'], days_ahead = 7 } = req.body;
    
    if (!Array.isArray(symbols) || symbols.length === 0) {
      return res.status(400).json({
        error: 'symbols must be a non-empty array'
      });
    }
    
    if (symbols.length > 5) {
      return res.status(400).json({
        error: 'Maximum 5 symbols allowed for batch prediction'
      });
    }
    
    // Make parallel requests for all symbols
    const predictions = await Promise.allSettled(
      symbols.map(async (symbol) => {
        try {
          const response = await aiService.post(`/predict/${symbol}`, {
            days_ahead
          }, {
            timeout: 60000
          });
          return {
            symbol,
            success: true,
            data: response.data
          };
        } catch (error) {
          return {
            symbol,
            success: false,
            error: error.response?.data?.error || error.message
          };
        }
      })
    );
    
    const results = predictions.map(result => result.value);
    
    res.json({
      batch_predictions: results,
      requested_symbols: symbols,
      days_ahead,
      generated_at: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Batch prediction error:', error);
    res.status(500).json({
      error: 'Failed to process batch predictions',
      message: error.message
    });
  }
});

// Get market overview with predictions
router.get('/market-overview', async (req, res) => {
  try {
    const symbols = ['HBAR', 'BTC', 'ETH']; // Default symbols for overview
    
    // Get current prices and basic predictions
    const marketData = await Promise.allSettled(
      symbols.map(async (symbol) => {
        try {
          // Get current price
          const priceResponse = await aiService.get(`/price/${symbol}`);
          
          // Get model info
          const modelResponse = await aiService.get(`/model-info/${symbol}`);
          
          // Get short-term prediction if model is available
          let prediction = null;
          if (modelResponse.data.model_available) {
            try {
              const predResponse = await aiService.post(`/predict/${symbol}`, {
                days_ahead: 1
              }, { timeout: 30000 });
              prediction = predResponse.data.predictions[0];
            } catch (predError) {
              console.warn(`Prediction failed for ${symbol}:`, predError.message);
            }
          }
          
          return {
            symbol,
            success: true,
            current_price: priceResponse.data.current_price,
            market_data: priceResponse.data.market_data,
            model_available: modelResponse.data.model_available,
            prediction
          };
        } catch (error) {
          return {
            symbol,
            success: false,
            error: error.response?.data?.error || error.message
          };
        }
      })
    );
    
    const results = marketData.map(result => result.value);
    
    res.json({
      market_overview: results,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Market overview error:', error);
    res.status(500).json({
      error: 'Failed to get market overview',
      message: error.message
    });
  }
});

module.exports = router; 
 