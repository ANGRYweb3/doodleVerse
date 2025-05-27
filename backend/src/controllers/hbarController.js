const { loadHBARData } = require('../services/dataLoader');
const { calculateTechnicalIndicators } = require('../services/technicalIndicators');
const { EnhancedSARIMAX, adfTest, calculateACF, performBacktest } = require('../services/sarimaxForecasting');

// Get HBAR data
const getHBARData = async (req, res) => {
  try {
    const data = await loadHBARData();
    res.json({
      success: true,
      data: data,
      count: data.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get technical indicators
const getTechnicalIndicators = async (req, res) => {
  try {
    const data = await loadHBARData();
    const indicators = calculateTechnicalIndicators(data);
    
    res.json({
      success: true,
      indicators: indicators
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Generate forecast using Enhanced SARIMAX
const generateForecast = async (req, res) => {
  try {
    const { days = 7 } = req.query;
    const forecastDays = parseInt(days);
    
    if (forecastDays < 1 || forecastDays > 90) {
      return res.status(400).json({
        success: false,
        error: 'Forecast days must be between 1 and 90'
      });
    }

    const data = await loadHBARData();
    const prices = data.map(d => d.close);
    
    // Create and fit Enhanced SARIMAX model
    const model = new EnhancedSARIMAX(prices);
    await model.fit();
    
    // Generate forecast
    const forecastResult = model.forecast(forecastDays);
    const modelSummary = model.summary();
    
    // Perform stationarity test
    const adfResult = adfTest(prices);
    
    // Calculate ACF for seasonality
    const acf = calculateACF(prices, 20);
    
    // Generate forecast dates
    const lastDate = new Date(data[data.length - 1].timestamp);
    const forecastDates = [];
    for (let i = 1; i <= forecastDays; i++) {
      const forecastDate = new Date(lastDate);
      forecastDate.setDate(lastDate.getDate() + i);
      forecastDates.push(forecastDate.toISOString().split('T')[0]);
    }
    
    res.json({
      success: true,
      currentPrice: prices[prices.length - 1],
      forecast: {
        dates: forecastDates,
        prices: forecastResult.forecast,
        confidence_intervals: forecastResult.confidence_intervals
      },
      forecastDays: forecastDays,
      modelInfo: {
        type: 'Enhanced SARIMAX with Volatility Modeling',
        order: modelSummary.order,
        seasonal_order: modelSummary.seasonal_order,
        n_observations: modelSummary.n_observations,
        mean_return: modelSummary.mean_return,
        volatility: modelSummary.volatility,
        isStationary: adfResult.is_stationary,
        adf_statistic: adfResult.statistic,
        adf_p_value: adfResult.p_value
      },
      seasonality: {
        acf: acf.slice(0, 10), // First 10 lags
        detected_patterns: acf.slice(1, 8).map((val, idx) => ({
          lag: idx + 1,
          correlation: val,
          significant: Math.abs(val) > 0.1
        }))
      }
    });
    
  } catch (error) {
    console.error('Forecast error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Perform backtesting
const performBacktesting = async (req, res) => {
  try {
    const { startDay = 30, predictionDays = 10 } = req.query;
    const startDayNum = parseInt(startDay);
    const predictionDaysNum = parseInt(predictionDays);
    
    if (startDayNum < 10 || startDayNum > 60) {
      return res.status(400).json({
        success: false,
        error: 'Start day must be between 10 and 60 days back'
      });
    }

    if (predictionDaysNum < 5 || predictionDaysNum > 30) {
      return res.status(400).json({
        success: false,
        error: 'Prediction days must be between 5 and 30 days'
      });
    }

    const data = await loadHBARData();
    
    if (data.length < startDayNum + predictionDaysNum + 50) {
      return res.status(400).json({
        success: false,
        error: 'Insufficient data for backtesting'
      });
    }
    
    // Perform backtesting with new parameters
    const backtestResult = await performBacktest(data, startDayNum, predictionDaysNum);
    
    res.json({
      success: true,
      backtest: {
        startDay: startDayNum,
        predictionDays: predictionDaysNum,
        totalPredictions: backtestResult.metrics.total_predictions,
        correctPredictions: backtestResult.metrics.correct_predictions,
        metrics: {
          rmse: backtestResult.metrics.rmse,
          mae: backtestResult.metrics.mae,
          winRate: backtestResult.metrics.win_rate,
          accuracy: (backtestResult.metrics.correct_predictions / backtestResult.metrics.total_predictions * 100).toFixed(2)
        }
      },
      results: backtestResult.results, // Return all results
      summary: {
        averageError: backtestResult.metrics.mae,
        rootMeanSquareError: backtestResult.metrics.rmse,
        directionAccuracy: `${backtestResult.metrics.win_rate.toFixed(2)}%`,
        totalTests: backtestResult.metrics.total_predictions
      }
    });
    
  } catch (error) {
    console.error('Backtest error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get current status and basic statistics
const getStatus = async (req, res) => {
  try {
    const data = await loadHBARData();
    
    const currentPrice = data[data.length - 1].close;
    const previousPrice = data[data.length - 2].close;
    const priceChange = currentPrice - previousPrice;
    const priceChangePercent = (priceChange / previousPrice) * 100;
    
    // Calculate basic statistics
    const prices = data.map(d => d.close);
    const recentPrices = prices.slice(-30); // Last 30 days
    
    const minPrice = Math.min(...recentPrices);
    const maxPrice = Math.max(...recentPrices);
    const avgPrice = recentPrices.reduce((sum, price) => sum + price, 0) / recentPrices.length;
    
    // Simple RSI calculation
    const calculateSimpleRSI = (prices, period = 14) => {
      if (prices.length < period + 1) return 50;
      
      let gains = 0;
      let losses = 0;
      
      for (let i = prices.length - period; i < prices.length; i++) {
        const change = prices[i] - prices[i - 1];
        if (change > 0) gains += change;
        else losses -= change;
      }
      
      const avgGain = gains / period;
      const avgLoss = losses / period;
      const rs = avgGain / avgLoss;
      return 100 - (100 / (1 + rs));
    };
    
    const rsi = calculateSimpleRSI(prices);
    
    res.json({
      success: true,
      status: {
        currentPrice: currentPrice,
        priceChange: priceChange,
        priceChangePercent: priceChangePercent,
        trend: priceChange > 0 ? 'up' : priceChange < 0 ? 'down' : 'neutral',
        statistics: {
          last30Days: {
            min: minPrice,
            max: maxPrice,
            average: avgPrice,
            volatility: Math.sqrt(recentPrices.reduce((sum, price) => sum + Math.pow(price - avgPrice, 2), 0) / recentPrices.length)
          }
        },
        technicalIndicators: {
          rsi: rsi
        },
        dataInfo: {
          totalRecords: data.length,
          dateRange: {
            start: data[0].timestamp,
            end: data[data.length - 1].timestamp
          },
          lastUpdated: new Date().toISOString()
        }
      }
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get comprehensive dashboard data
const getDashboardData = async (req, res) => {
  try {
    const data = await loadHBARData();
    
    // Get recent data for charts (last 90 days)
    const recentData = data.slice(-90);
    const recentPrices = recentData.map(d => d.close);
    
    // Quick forecast (7 days)
    const model = new EnhancedSARIMAX(data.map(d => d.close));
    await model.fit();
    const quickForecast = model.forecast(7);
    
    // Generate forecast dates
    const lastDate = new Date(data[data.length - 1].timestamp);
    const forecastDates = [];
    for (let i = 1; i <= 7; i++) {
      const forecastDate = new Date(lastDate);
      forecastDate.setDate(lastDate.getDate() + i);
      forecastDates.push(forecastDate.toISOString().split('T')[0]);
    }
    
    res.json({
      success: true,
      dashboard: {
        currentPrice: data[data.length - 1].close,
        priceHistory: recentData.map(d => ({
          date: d.timestamp,
          price: d.close,
          volume: d.volume
        })),
        forecast: {
          dates: forecastDates,
          prices: quickForecast.forecast
        },
        technicalIndicators: {
          rsi: null,
          sma20: null,
          ema20: null
        },
        statistics: {
          volatility: Math.sqrt(recentPrices.reduce((sum, price, i, arr) => {
            if (i === 0) return sum;
            const return_val = (price - arr[i-1]) / arr[i-1];
            return sum + Math.pow(return_val, 2);
          }, 0) / (recentPrices.length - 1)),
          averageVolume: recentData.reduce((sum, d) => sum + d.volume, 0) / recentData.length,
          priceRange: {
            min: Math.min(...recentPrices),
            max: Math.max(...recentPrices)
          }
        }
      }
    });
    
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = {
  getHBARData,
  getTechnicalIndicators,
  generateForecast,
  performBacktesting,
  getStatus,
  getDashboardData
}; 