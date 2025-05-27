const express = require('express');
const router = express.Router();

// Node.js 18+ has built-in fetch, no need for node-fetch

// Hedera Mirror Node base URLs
const MIRROR_NODE_URLS = {
  mainnet: 'https://mainnet-public.mirrornode.hedera.com',
  testnet: 'https://testnet.mirrornode.hedera.com'
};

// Helper function to get mirror node URL
const getMirrorNodeUrl = (network = 'testnet') => {
  return MIRROR_NODE_URLS[network] || MIRROR_NODE_URLS.testnet;
};

// Helper function to make mirror node requests
const fetchFromMirrorNode = async (endpoint, network = 'testnet') => {
  const baseUrl = getMirrorNodeUrl(network);
  const url = `${baseUrl}${endpoint}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Mirror Node request failed: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Mirror Node fetch error:', error);
    throw error;
  }
};

// Get account information
router.get('/account/:accountId', async (req, res) => {
  try {
    const { accountId } = req.params;
    const { network = 'testnet' } = req.query;
    
    const data = await fetchFromMirrorNode(`/api/v1/accounts/${accountId}`, network);
    res.json(data);
  } catch (error) {
    console.error('Error fetching account info:', error);
    res.status(500).json({ 
      error: 'Failed to fetch account information',
      message: error.message 
    });
  }
});

// Get token balances for an account
router.get('/account/:accountId/tokens', async (req, res) => {
  try {
    const { accountId } = req.params;
    const { network = 'testnet' } = req.query;
    
    const data = await fetchFromMirrorNode(`/api/v1/accounts/${accountId}/tokens`, network);
    res.json(data);
  } catch (error) {
    console.error('Error fetching token balances:', error);
    res.status(500).json({ 
      error: 'Failed to fetch token balances',
      message: error.message 
    });
  }
});

// Get NFTs for an account
router.get('/account/:accountId/nfts', async (req, res) => {
  try {
    const { accountId } = req.params;
    const { network = 'testnet' } = req.query;
    
    const data = await fetchFromMirrorNode(`/api/v1/accounts/${accountId}/nfts`, network);
    res.json(data);
  } catch (error) {
    console.error('Error fetching NFTs:', error);
    res.status(500).json({ 
      error: 'Failed to fetch NFTs',
      message: error.message 
    });
  }
});

// Get transactions for an account
router.get('/account/:accountId/transactions', async (req, res) => {
  try {
    const { accountId } = req.params;
    const { network = 'testnet', limit = 25 } = req.query;
    
    const data = await fetchFromMirrorNode(
      `/api/v1/transactions?account.id=${accountId}&limit=${limit}&order=desc`, 
      network
    );
    res.json(data);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ 
      error: 'Failed to fetch transactions',
      message: error.message 
    });
  }
});

// Get token information
router.get('/token/:tokenId', async (req, res) => {
  try {
    const { tokenId } = req.params;
    const { network = 'testnet' } = req.query;
    
    const data = await fetchFromMirrorNode(`/api/v1/tokens/${tokenId}`, network);
    res.json(data);
  } catch (error) {
    console.error('Error fetching token info:', error);
    res.status(500).json({ 
      error: 'Failed to fetch token information',
      message: error.message 
    });
  }
});

// Get HBAR price from CoinGecko
router.get('/hbar-price', async (req, res) => {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=hedera-hashgraph&vs_currencies=usd');
    if (!response.ok) {
      throw new Error(`CoinGecko request failed: ${response.statusText}`);
    }
    const data = await response.json();
    res.json({
      price: data['hedera-hashgraph']?.usd || 0,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching HBAR price:', error);
    res.status(500).json({ 
      error: 'Failed to fetch HBAR price',
      message: error.message 
    });
  }
});

// Get portfolio summary for an account
router.get('/portfolio/:accountId', async (req, res) => {
  try {
    const { accountId } = req.params;
    const { network = 'testnet' } = req.query;
    
    // Fetch all data in parallel
    const [accountInfo, tokenBalances, nfts, hbarPriceResponse] = await Promise.all([
      fetchFromMirrorNode(`/api/v1/accounts/${accountId}`, network),
      fetchFromMirrorNode(`/api/v1/accounts/${accountId}/tokens`, network),
      fetchFromMirrorNode(`/api/v1/accounts/${accountId}/nfts`, network),
      fetch('https://api.coingecko.com/api/v3/simple/price?ids=hedera-hashgraph&vs_currencies=usd')
    ]);
    
    const hbarPriceData = await hbarPriceResponse.json();
    const hbarPrice = hbarPriceData['hedera-hashgraph']?.usd || 0;
    
    // Calculate portfolio summary
    const hbarBalance = accountInfo.balance.balance / 100000000; // Convert tinybars to HBAR
    const totalUsdValue = hbarBalance * hbarPrice;
    
    const summary = {
      account: accountInfo,
      hbarBalance,
      hbarPrice,
      totalUsdValue,
      tokenCount: tokenBalances.tokens?.length || 0,
      nftCount: nfts.nfts?.length || 0,
      tokens: tokenBalances.tokens || [],
      nfts: nfts.nfts || [],
      lastUpdated: new Date().toISOString()
    };
    
    res.json(summary);
  } catch (error) {
    console.error('Error fetching portfolio summary:', error);
    res.status(500).json({ 
      error: 'Failed to fetch portfolio summary',
      message: error.message 
    });
  }
});

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    service: 'Hedera Mirror Node API',
    timestamp: new Date().toISOString()
  });
});

module.exports = router; 
 