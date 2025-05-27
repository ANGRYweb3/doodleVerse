const express = require('express');
const router = express.Router();

// Mock crypto price data - ในการใช้งานจริงจะดึงจาก CoinGecko หรือ CoinMarketCap API
const mockCryptoPrices = {
  'HBAR': { 
    price: 0.12, 
    name: 'Hedera', 
    icon: '🌐',
    change24h: 5.2,
    marketCap: 4200000000,
    volume24h: 125000000
  },
  'BTC': { 
    price: 43250, 
    name: 'Bitcoin', 
    icon: '₿',
    change24h: -2.1,
    marketCap: 850000000000,
    volume24h: 15000000000
  },
  'ETH': { 
    price: 2650, 
    name: 'Ethereum', 
    icon: 'Ξ',
    change24h: 3.8,
    marketCap: 320000000000,
    volume24h: 8000000000
  },
  'ADA': { 
    price: 0.48, 
    name: 'Cardano', 
    icon: '🔷',
    change24h: -1.5,
    marketCap: 17000000000,
    volume24h: 450000000
  },
  'SOL': { 
    price: 98, 
    name: 'Solana', 
    icon: '☀️',
    change24h: 7.2,
    marketCap: 42000000000,
    volume24h: 1200000000
  },
  'DOT': { 
    price: 7.2, 
    name: 'Polkadot', 
    icon: '⚫',
    change24h: 2.1,
    marketCap: 9500000000,
    volume24h: 280000000
  },
  'MATIC': { 
    price: 0.85, 
    name: 'Polygon', 
    icon: '🔺',
    change24h: 4.5,
    marketCap: 8200000000,
    volume24h: 320000000
  },
  'AVAX': { 
    price: 36, 
    name: 'Avalanche', 
    icon: '🔺',
    change24h: -0.8,
    marketCap: 13500000000,
    volume24h: 580000000
  }
};

// GET endpoint for fetching current crypto prices
router.get('/prices', async (req, res) => {
  try {
    const { symbols } = req.query;
    
    if (symbols) {
      // Return specific symbols
      const symbolArray = symbols.split(',');
      const filteredPrices = {};
      
      symbolArray.forEach(symbol => {
        const upperSymbol = symbol.toUpperCase();
        if (mockCryptoPrices[upperSymbol]) {
          filteredPrices[upperSymbol] = mockCryptoPrices[upperSymbol];
        }
      });
      
      res.json({
        success: true,
        data: filteredPrices,
        timestamp: new Date().toISOString()
      });
    } else {
      // Return all prices
      res.json({
        success: true,
        data: mockCryptoPrices,
        timestamp: new Date().toISOString()
      });
    }
    
  } catch (error) {
    console.error('Error fetching crypto prices:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch crypto prices',
      details: error.message 
    });
  }
});

// POST endpoint for saving portfolio data
router.post('/save', async (req, res) => {
  try {
    const { accountId, portfolio } = req.body;
    
    if (!accountId || !portfolio) {
      return res.status(400).json({
        success: false,
        error: 'Account ID and portfolio data are required'
      });
    }
    
    // ในการใช้งานจริงจะบันทึกลง database
    // ตอนนี้แค่ return success
    console.log(`💾 Saving portfolio for ${accountId}:`, portfolio);
    
    res.json({
      success: true,
      message: 'Portfolio saved successfully',
      accountId,
      portfolioCount: portfolio.length,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error saving portfolio:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to save portfolio',
      details: error.message 
    });
  }
});

// GET endpoint for loading portfolio data
router.get('/load/:accountId', async (req, res) => {
  try {
    const { accountId } = req.params;
    
    // ในการใช้งานจริงจะดึงจาก database
    // ตอนนี้ return demo portfolio
    const demoPortfolio = [
      { symbol: 'HBAR', amount: 10000, avgBuyPrice: 0.08 },
      { symbol: 'BTC', amount: 0.1, avgBuyPrice: 40000 },
      { symbol: 'ETH', amount: 2, avgBuyPrice: 2200 }
    ];
    
    res.json({
      success: true,
      data: demoPortfolio,
      accountId,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error loading portfolio:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to load portfolio',
      details: error.message 
    });
  }
});

// GET endpoint for portfolio analytics
router.get('/analytics/:accountId', async (req, res) => {
  try {
    const { accountId } = req.params;
    
    // Mock analytics data
    const analytics = {
      totalValue: 5420.50,
      totalPnL: 1220.50,
      totalPnLPercentage: 29.1,
      bestPerformer: 'SOL',
      worstPerformer: 'ADA',
      diversificationScore: 7.5,
      riskScore: 6.2,
      monthlyPerformance: [
        { month: 'Jan', value: 4200 },
        { month: 'Feb', value: 4800 },
        { month: 'Mar', value: 5420 }
      ],
      topHoldings: [
        { symbol: 'BTC', percentage: 45.2 },
        { symbol: 'ETH', percentage: 32.1 },
        { symbol: 'HBAR', percentage: 22.7 }
      ]
    };
    
    res.json({
      success: true,
      data: analytics,
      accountId,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error generating analytics:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to generate analytics',
      details: error.message 
    });
  }
});

// GET endpoint for market overview
router.get('/market-overview', async (req, res) => {
  try {
    const marketData = {
      totalMarketCap: 1750000000000,
      totalVolume24h: 45000000000,
      btcDominance: 48.5,
      ethDominance: 18.2,
      fearGreedIndex: 72,
      trendingCoins: ['BTC', 'ETH', 'SOL', 'HBAR'],
      topGainers: [
        { symbol: 'SOL', change: 7.2 },
        { symbol: 'HBAR', change: 5.2 },
        { symbol: 'MATIC', change: 4.5 }
      ],
      topLosers: [
        { symbol: 'BTC', change: -2.1 },
        { symbol: 'ADA', change: -1.5 },
        { symbol: 'AVAX', change: -0.8 }
      ]
    };
    
    res.json({
      success: true,
      data: marketData,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error fetching market overview:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch market overview',
      details: error.message 
    });
  }
});

module.exports = router;
