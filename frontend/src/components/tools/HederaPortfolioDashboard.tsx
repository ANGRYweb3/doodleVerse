import React, { useState } from 'react';
import { useHederaPortfolio } from '../../hooks/useHederaPortfolio';
import { hederaMirrorNode } from '../../services/hedera/mirrorNode';
import PortfolioAnalytics from './PortfolioAnalytics';

interface HederaPortfolioDashboardProps {
  accountId: string | null;
}

const HederaPortfolioDashboard: React.FC<HederaPortfolioDashboardProps> = ({ accountId }) => {
  const [showAnalytics, setShowAnalytics] = useState(false);
  
  // Debug logging
  console.log('HederaPortfolioDashboard loaded with accountId:', accountId);

  const {
    account,
    tokenBalances,
    nfts,
    transactions,
    portfolioSummary,
    isLoading,
    isLoadingTokens,
    isLoadingNFTs,
    isLoadingTransactions,
    error,
    refreshPortfolio,
    refreshTokens,
    refreshNFTs,
    refreshTransactions
  } = useHederaPortfolio(accountId);

  // Debug portfolio data
  console.log('Portfolio Data:', {
    account,
    tokenBalances,
    nfts,
    transactions,
    portfolioSummary,
    isLoading,
    error
  });

  // Show analytics view if requested
  if (showAnalytics) {
    return (
      <PortfolioAnalytics 
        accountId={accountId} 
        onBack={() => setShowAnalytics(false)} 
      />
    );
  }

  if (!accountId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="doodle-border doodle-shadow bg-white p-8 text-center">
            <div className="text-6xl mb-4">🔗</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Connect Hedera Wallet</h2>
            <p className="text-gray-600">Please connect your HashPack wallet to view your portfolio</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="doodle-border doodle-shadow bg-white p-8 text-center">
            <div className="text-6xl mb-4">❌</div>
            <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Portfolio</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={refreshPortfolio}
              className="doodle-border doodle-shadow px-6 py-3 bg-gradient-to-r from-blue-300 to-purple-300 hover:from-purple-300 hover:to-blue-400 transition-colors font-bold text-gray-800 hover:animate-wiggle"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="doodle-border doodle-shadow bg-white p-8 rounded-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-3 flex items-center gap-3">
                <span className="text-5xl">🌐</span>
                Hedera Portfolio Dashboard
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  DEMO MODE
                </span>
              </h1>
              <p className="text-gray-600 text-lg">
                Portfolio overview with sample data for account: <span className="font-mono text-indigo-600 font-semibold">{accountId}</span>
              </p>
              <p className="text-sm text-yellow-600 mt-1">
                🎭 This is demo data to showcase the dashboard features. Connect your real wallet to see actual portfolio data.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowAnalytics(true)}
                className="doodle-border doodle-shadow px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-emerald-600 hover:to-green-700 transition-all duration-300 font-bold text-white rounded-xl hover:scale-105"
              >
                <span className="flex items-center gap-2">
                  📊 Deep Analytics
                </span>
              </button>
              
              <button
                onClick={refreshPortfolio}
                disabled={isLoading}
                className="doodle-border doodle-shadow px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 font-bold text-white rounded-xl hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                    Loading...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    🔄 Refresh Data
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Portfolio Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <div className="doodle-border doodle-shadow bg-gradient-to-br from-blue-100 to-indigo-200 p-6 rounded-2xl hover:scale-105 transition-transform">
            <div className="text-4xl mb-3">💰</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">HBAR Balance</h3>
            <p className="text-3xl font-bold text-blue-600 mb-1">
              {portfolioSummary.totalHbarBalance.toFixed(2)} ℏ
            </p>
            <p className="text-sm text-gray-600">
              ≈ ${portfolioSummary.totalUsdValue.toFixed(2)} USD
            </p>
          </div>

          <div className="doodle-border doodle-shadow bg-gradient-to-br from-green-100 to-emerald-200 p-6 rounded-2xl hover:scale-105 transition-transform">
            <div className="text-4xl mb-3">📈</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Total P&L</h3>
            <p className="text-3xl font-bold text-green-600 mb-1">
              +${portfolioSummary.totalProfitLoss?.toFixed(2) || '0.00'}
            </p>
            <p className="text-sm text-green-600 font-semibold">
              +{portfolioSummary.totalProfitLossPercentage?.toFixed(1) || '0.0'}% 🚀
            </p>
          </div>

          <div className="doodle-border doodle-shadow bg-gradient-to-br from-emerald-100 to-green-200 p-6 rounded-2xl hover:scale-105 transition-transform">
            <div className="text-4xl mb-3">🪙</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Tokens</h3>
            <p className="text-3xl font-bold text-emerald-600 mb-1">{portfolioSummary.tokenCount}</p>
            <p className="text-sm text-gray-600">Token Types</p>
          </div>

          <div className="doodle-border doodle-shadow bg-gradient-to-br from-purple-100 to-pink-200 p-6 rounded-2xl hover:scale-105 transition-transform">
            <div className="text-4xl mb-3">🎨</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">NFTs</h3>
            <p className="text-3xl font-bold text-purple-600 mb-1">{portfolioSummary.nftCount}</p>
            <p className="text-sm text-gray-600">NFT Collection</p>
          </div>

          <div className="doodle-border doodle-shadow bg-gradient-to-br from-yellow-100 to-orange-200 p-6 rounded-2xl hover:scale-105 transition-transform">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">HBAR Price</h3>
            <p className="text-3xl font-bold text-orange-600 mb-1">
              ${portfolioSummary.hbarPrice.toFixed(4)}
            </p>
            <p className="text-sm text-gray-600">Current Price</p>
          </div>
        </div>

        {/* Comprehensive Portfolio Overview */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Left Column - Account Info & Top Tokens */}
          <div className="xl:col-span-1 space-y-6">
            
            {/* Account Information */}
            {account && (
              <div className="doodle-border doodle-shadow bg-white p-6 rounded-2xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="text-2xl">👤</span>
                  Account Details
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Account ID:</span>
                    <span className="font-mono text-indigo-600 font-semibold">{account.account}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Created:</span>
                    <span className="text-gray-800">{new Date(Number(account.created_timestamp) * 1000).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">EVM Address:</span>
                    <span className="font-mono text-xs text-gray-600">{account.evm_address.substring(0, 10)}...</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Auto Renew:</span>
                    <span className="text-gray-800">{Math.floor(account.auto_renew_period / 86400)} days</span>
                  </div>
                </div>
              </div>
            )}

            {/* Top Tokens */}
            <div className="doodle-border doodle-shadow bg-white p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <span className="text-2xl">🪙</span>
                  Token Holdings
                </h3>
                <button
                  onClick={refreshTokens}
                  disabled={isLoadingTokens}
                  className="text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  {isLoadingTokens ? '⏳' : '🔄'}
                </button>
              </div>
              
              {tokenBalances.length === 0 ? (
                <div className="text-center py-6">
                  <div className="text-4xl mb-2">🪙</div>
                  <p className="text-gray-600">No tokens found</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {tokenBalances.map((token, index) => (
                    <div key={token.token_id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex-1">
                        <div className="font-semibold text-gray-800">
                          {token.tokenInfo?.symbol || token.token_id}
                        </div>
                        <div className="text-sm text-gray-600">
                          {token.tokenInfo?.name || 'Unknown Token'}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-800">{token.formattedBalance}</div>
                        <div className="text-xs text-gray-500">{token.tokenInfo?.symbol}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Middle Column - NFTs */}
          <div className="xl:col-span-1 space-y-6">
            <div className="doodle-border doodle-shadow bg-white p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <span className="text-2xl">🎨</span>
                  NFT Collection
                </h3>
                <button
                  onClick={refreshNFTs}
                  disabled={isLoadingNFTs}
                  className="text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  {isLoadingNFTs ? '⏳' : '🔄'}
                </button>
              </div>
              
              {nfts.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-2">🎨</div>
                  <p className="text-gray-600">No NFTs found</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                  {nfts.slice(0, 12).map((nft, index) => (
                    <div key={`${nft.token_id}-${nft.serial_number}`} className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200 hover:shadow-lg transition-all">
                      <div className="text-center">
                        <div className="text-3xl mb-2">🎨</div>
                        <div className="font-semibold text-gray-800 text-sm">#{nft.serial_number}</div>
                        <div className="text-xs text-gray-600 truncate">{nft.token_id}</div>
                                                 <div className="text-xs text-gray-500 mt-1">
                           {new Date(Number(nft.created_timestamp) * 1000).toLocaleDateString()}
                         </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Recent Transactions */}
          <div className="xl:col-span-1 space-y-6">
            <div className="doodle-border doodle-shadow bg-white p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <span className="text-2xl">📋</span>
                  Recent Transactions
                </h3>
                <button
                  onClick={refreshTransactions}
                  disabled={isLoadingTransactions}
                  className="text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  {isLoadingTransactions ? '⏳' : '🔄'}
                </button>
              </div>
              
              {transactions.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-2">📋</div>
                  <p className="text-gray-600">No recent transactions</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {transactions.slice(0, 10).map((tx, index) => (
                    <div key={tx.transaction_id} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-semibold text-gray-800 text-sm">{tx.name}</div>
                        <div className={`text-xs font-semibold px-2 py-1 rounded ${
                          tx.result === 'SUCCESS' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {tx.result}
                        </div>
                      </div>
                                             <div className="text-xs text-gray-600">
                         {new Date(Number(tx.consensus_timestamp) * 1000).toLocaleString()}
                       </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Fee: {hederaMirrorNode.tinybarToHbar(tx.charged_tx_fee).toFixed(6)} ℏ
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



export default HederaPortfolioDashboard; 
 