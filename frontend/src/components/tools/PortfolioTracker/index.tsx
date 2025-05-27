import React from 'react';
import { ToolPageProps } from '../../../types/tools';

const PortfolioTracker: React.FC<ToolPageProps> = ({ onBack }) => {
  // Mock data for UI display only
  const mockHoldings = [
    {
      symbol: 'HBAR',
      name: 'Hedera',
      amount: 10000,
      avgBuyPrice: 0.08,
      currentPrice: 0.12,
      value: 1200,
      pnl: 400,
      pnlPercentage: 50,
      icon: '🌐'
    },
    {
      symbol: 'BTC',
      name: 'Bitcoin',
      amount: 0.1,
      avgBuyPrice: 40000,
      currentPrice: 43250,
      value: 4325,
      pnl: 325,
      pnlPercentage: 8.125,
      icon: '₿'
    },
    {
      symbol: 'ETH',
      name: 'Ethereum',
      amount: 2,
      avgBuyPrice: 2200,
      currentPrice: 2650,
      value: 5300,
      pnl: 900,
      pnlPercentage: 20.45,
      icon: 'Ξ'
    }
  ];

  const mockStats = {
    totalValue: 10825,
    totalPnL: 1625,
    totalPnLPercentage: 17.67,
    totalInvested: 9200,
    bestPerformer: 'HBAR',
    worstPerformer: 'BTC'
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const formatPercentage = (percentage: number) => {
    const sign = percentage >= 0 ? '+' : '';
    return `${sign}${percentage.toFixed(2)}%`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 font-doodle mb-2">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              💼 Portfolio Tracker
            </span>
          </h1>
          <p className="text-gray-600 font-doodle-body">
            Track and analyze your cryptocurrency portfolio with real-time data
          </p>
        </div>

        {/* Portfolio Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-lg doodle-border">
            <div className="text-sm text-gray-600 font-doodle-fun mb-1">Total Value</div>
            <div className="text-2xl font-bold text-gray-800 font-doodle">
              {formatCurrency(mockStats.totalValue)}
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-lg doodle-border">
            <div className="text-sm text-gray-600 font-doodle-fun mb-1">Total P&L</div>
            <div className={`text-2xl font-bold font-doodle ${mockStats.totalPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(mockStats.totalPnL)}
            </div>
            <div className={`text-sm font-doodle-fun ${mockStats.totalPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatPercentage(mockStats.totalPnLPercentage)}
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-lg doodle-border">
            <div className="text-sm text-gray-600 font-doodle-fun mb-1">Best Performer</div>
            <div className="text-xl font-bold text-green-600 font-doodle">
              {mockStats.bestPerformer}
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-lg doodle-border">
            <div className="text-sm text-gray-600 font-doodle-fun mb-1">Worst Performer</div>
            <div className="text-xl font-bold text-red-600 font-doodle">
              {mockStats.worstPerformer}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-6">
          <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-all duration-200 font-doodle-fun">
            ➕ Add Holding
          </button>
          
          <button className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-all duration-200 font-doodle-fun">
            🔄 Refresh Prices
          </button>
        </div>

        {/* Holdings Table */}
        <div className="bg-white rounded-xl shadow-lg doodle-border overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 font-doodle">Your Holdings</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider font-doodle-fun">Asset</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider font-doodle-fun">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider font-doodle-fun">Avg Buy Price</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider font-doodle-fun">Current Price</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider font-doodle-fun">Value</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider font-doodle-fun">P&L</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider font-doodle-fun">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockHoldings.map((holding) => (
                  <tr key={holding.symbol} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{holding.icon}</span>
                        <div>
                          <div className="text-sm font-bold text-gray-900 font-doodle">{holding.symbol}</div>
                          <div className="text-sm text-gray-500 font-doodle-fun">{holding.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-doodle-fun">
                      {holding.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-doodle-fun">
                      {formatCurrency(holding.avgBuyPrice)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-doodle-fun">
                      {formatCurrency(holding.currentPrice)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 font-doodle">
                      {formatCurrency(holding.value)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold font-doodle">
                      <div className={holding.pnl >= 0 ? 'text-green-600' : 'text-red-600'}>
                        {formatCurrency(holding.pnl)}
                      </div>
                      <div className={`text-xs ${holding.pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatPercentage(holding.pnlPercentage)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button className="text-red-600 hover:text-red-800 font-doodle-fun">
                        🗑️ Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Demo Notice */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <div className="flex items-center">
            <span className="text-2xl mr-3">⚠️</span>
            <div>
              <h3 className="text-lg font-bold text-yellow-800 font-doodle">Demo Mode</h3>
              <p className="text-yellow-700 font-doodle-fun">
                This is a UI demonstration. All data shown is mock data for display purposes only.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PortfolioTracker;
