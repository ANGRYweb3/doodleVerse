require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Import routes
const hbarRoutes = require('./src/routes/hbarRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/hbar', hbarRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// NFT Verification endpoint
app.get('/api/verify-nft/:accountId', async (req, res) => {
  try {
    const { accountId } = req.params;
    
    // Mock NFT verification (replace with real Hedera API call)
    // In production, check if accountId owns DoodleVerse NFT #1-50
    const hasNFT = Math.random() > 0.3; // 70% chance for demo
    const nftCount = hasNFT ? Math.floor(Math.random() * 3) + 1 : 0;
    
    console.log(`🔍 NFT Check for ${accountId}: ${hasNFT ? `✅ ${nftCount} NFTs` : '❌ No NFTs'}`);
    
    res.json({
      accountId,
      hasNFT,
      nftCount,
      eligibleNFTs: hasNFT ? [`DoodleVerse #${Math.floor(Math.random() * 50) + 1}`] : [],
      verified: hasNFT,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error verifying NFT:', error);
    res.status(500).json({ 
      error: 'Failed to verify NFT ownership',
      details: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 DoodleVerse API Server running on port ${PORT}`);
  console.log(`📊 Available endpoints:`);
  console.log(`   GET  /api/health - Check API health`);
  console.log(`   GET  /api/verify-nft/:accountId - Verify NFT ownership`);
  console.log(`   GET  /api/hbar/data - Get HBAR price data`);
  console.log(`   GET  /api/hbar/indicators - Get technical indicators`);
  console.log(`   GET  /api/hbar/forecast - Get price forecast`);
  console.log(`   GET  /api/hbar/backtest - Run backtesting`);
  console.log(`   GET  /api/hbar/status - Get current status`);
  console.log(`   GET  /api/hbar/dashboard - Get dashboard data`);
  console.log(`\n🎯 HBAR Price Forecasting System Ready!`);
}); 