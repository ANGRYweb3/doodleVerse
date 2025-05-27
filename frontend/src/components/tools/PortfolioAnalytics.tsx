import React, { useState, useRef } from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { mockHederaData } from '../../services/hedera/mockData';

interface PortfolioAnalyticsProps {
  accountId: string | null;
  onBack: () => void;
}

const PortfolioAnalytics: React.FC<PortfolioAnalyticsProps> = ({ accountId, onBack }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'performance' | 'allocation' | 'tokens'>('overview');
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [isExporting, setIsExporting] = useState(false);
  const analyticsRef = useRef<HTMLDivElement>(null);

  const { portfolioSummary, portfolioPerformance, tokenPerformance, assetAllocation } = mockHederaData;

  // Download as PDF
  const downloadPDF = async () => {
    if (!analyticsRef.current) return;
    
    setIsExporting(true);
    try {
      const canvas = await html2canvas(analyticsRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      
      let position = 0;
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      pdf.save(`hedera-portfolio-analytics-${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsExporting(false);
    }
  };

  // Download as PNG
  const downloadPNG = async () => {
    if (!analyticsRef.current) return;
    
    setIsExporting(true);
    try {
      const canvas = await html2canvas(analyticsRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true
      });
      
      const link = document.createElement('a');
      link.download = `hedera-portfolio-analytics-${new Date().toISOString().split('T')[0]}.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('Error generating PNG:', error);
    } finally {
      setIsExporting(false);
    }
  };

  // Download CSV data
  const downloadCSV = () => {
    const data = portfolioPerformance[timeframe];
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(row => Object.values(row).join(',')).join('\n');
    const csv = `${headers}\n${rows}`;
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `hedera-portfolio-data-${timeframe}-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const formatCurrency = (value: number) => `$${value.toFixed(2)}`;
  const formatPercentage = (value: number) => `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8" ref={analyticsRef}>
        
        {/* Header */}
        <div className="doodle-border doodle-shadow bg-white p-8 rounded-2xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="doodle-border doodle-shadow px-4 py-2 bg-gray-100 hover:bg-gray-200 transition-colors rounded-xl"
              >
                ← Back
              </button>
              <div>
                <h1 className="text-4xl font-bold text-gray-800 flex items-center gap-3">
                  <span className="text-5xl">📊</span>
                  Portfolio Analytics
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    DEMO
                  </span>
                </h1>
                <p className="text-gray-600 text-lg mt-2">
                  Deep dive into your portfolio performance and insights
                </p>
              </div>
            </div>
            
            {/* Download Options */}
            <div className="flex items-center gap-3">
              <button
                onClick={downloadCSV}
                disabled={isExporting}
                className="doodle-border doodle-shadow px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-colors disabled:opacity-50"
              >
                📊 CSV
              </button>
              <button
                onClick={downloadPNG}
                disabled={isExporting}
                className="doodle-border doodle-shadow px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors disabled:opacity-50"
              >
                🖼️ PNG
              </button>
              <button
                onClick={downloadPDF}
                disabled={isExporting}
                className="doodle-border doodle-shadow px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-colors disabled:opacity-50"
              >
                {isExporting ? '⏳ Exporting...' : '📄 PDF'}
              </button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-green-100 to-emerald-200 p-6 rounded-2xl">
              <div className="text-3xl mb-2">💰</div>
              <h3 className="text-lg font-bold text-gray-800">Total Value</h3>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(portfolioSummary.totalUsdValue)}
              </p>
              <p className="text-sm text-gray-600">Current Portfolio Value</p>
            </div>

            <div className="bg-gradient-to-br from-blue-100 to-indigo-200 p-6 rounded-2xl">
              <div className="text-3xl mb-2">📈</div>
              <h3 className="text-lg font-bold text-gray-800">Total P&L</h3>
              <p className="text-2xl font-bold text-blue-600">
                {formatCurrency(portfolioSummary.totalProfitLoss)}
              </p>
              <p className="text-sm text-green-600">
                {formatPercentage(portfolioSummary.totalProfitLossPercentage)}
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-100 to-pink-200 p-6 rounded-2xl">
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="text-lg font-bold text-gray-800">Initial Investment</h3>
              <p className="text-2xl font-bold text-purple-600">
                {formatCurrency(portfolioSummary.initialInvestment)}
              </p>
              <p className="text-sm text-gray-600">Starting Value</p>
            </div>

            <div className="bg-gradient-to-br from-yellow-100 to-orange-200 p-6 rounded-2xl">
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="text-lg font-bold text-gray-800">HBAR Price</h3>
              <p className="text-2xl font-bold text-orange-600">
                {formatCurrency(portfolioSummary.hbarPrice)}
              </p>
              <p className="text-sm text-gray-600">Current Price</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="doodle-border doodle-shadow bg-white p-2 rounded-2xl">
          <div className="flex space-x-2">
            {[
              { id: 'overview', label: '📊 Overview', icon: '📊' },
              { id: 'performance', label: '📈 Performance', icon: '📈' },
              { id: 'allocation', label: '🥧 Allocation', icon: '🥧' },
              { id: 'tokens', label: '🪙 Token Analysis', icon: '🪙' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-3 rounded-xl font-bold transition-colors ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              
              {/* Portfolio Performance Chart */}
              <div className="doodle-border doodle-shadow bg-white p-6 rounded-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-800">Portfolio Performance</h3>
                  <div className="flex space-x-2">
                    {['daily', 'weekly', 'monthly'].map((tf) => (
                      <button
                        key={tf}
                        onClick={() => setTimeframe(tf as any)}
                        className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                          timeframe === tf
                            ? 'bg-indigo-500 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {tf.charAt(0).toUpperCase() + tf.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={portfolioPerformance[timeframe]}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis tickFormatter={formatCurrency} />
                    <Tooltip formatter={(value: any) => [formatCurrency(value), 'Portfolio Value']} />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#6366f1"
                      fillOpacity={1}
                      fill="url(#colorValue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Asset Allocation Pie Chart */}
              <div className="doodle-border doodle-shadow bg-white p-6 rounded-2xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Asset Allocation</h3>
                
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={assetAllocation}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {assetAllocation.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: any) => [`${value}%`, 'Allocation']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Performance Tab */}
          {activeTab === 'performance' && (
            <div className="space-y-8">
              
              {/* Detailed Performance Chart */}
              <div className="doodle-border doodle-shadow bg-white p-6 rounded-2xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Detailed Performance Analysis</h3>
                
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={portfolioPerformance.daily}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" tickFormatter={formatCurrency} />
                    <YAxis yAxisId="right" orientation="right" tickFormatter={formatCurrency} />
                    <Tooltip 
                      formatter={(value: any, name: string) => [
                        name === 'value' ? formatCurrency(value) : formatCurrency(value),
                        name === 'value' ? 'Portfolio Value' : 'HBAR Price'
                      ]} 
                    />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="value"
                      stroke="#6366f1"
                      strokeWidth={3}
                      name="Portfolio Value"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="hbarPrice"
                      stroke="#f59e0b"
                      strokeWidth={2}
                      name="HBAR Price"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="doodle-border doodle-shadow bg-white p-6 rounded-2xl">
                  <h4 className="text-lg font-bold text-gray-800 mb-4">📈 Best Day</h4>
                  <p className="text-2xl font-bold text-green-600">+$1.67</p>
                  <p className="text-sm text-gray-600">January 13, 2024</p>
                </div>
                
                <div className="doodle-border doodle-shadow bg-white p-6 rounded-2xl">
                  <h4 className="text-lg font-bold text-gray-800 mb-4">📉 Worst Day</h4>
                  <p className="text-2xl font-bold text-red-600">-$0.26</p>
                  <p className="text-sm text-gray-600">January 9, 2024</p>
                </div>
                
                <div className="doodle-border doodle-shadow bg-white p-6 rounded-2xl">
                  <h4 className="text-lg font-bold text-gray-800 mb-4">📊 Volatility</h4>
                  <p className="text-2xl font-bold text-blue-600">12.5%</p>
                  <p className="text-sm text-gray-600">30-day volatility</p>
                </div>
              </div>
            </div>
          )}

          {/* Allocation Tab */}
          {activeTab === 'allocation' && (
            <div className="space-y-8">
              
              {/* Detailed Allocation Chart */}
              <div className="doodle-border doodle-shadow bg-white p-6 rounded-2xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Asset Allocation Breakdown</h3>
                
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={assetAllocation} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" tickFormatter={(value) => `${value}%`} />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip formatter={(value: any) => [`${value}%`, 'Allocation']} />
                    <Bar dataKey="value" fill="#6366f1" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Allocation Table */}
              <div className="doodle-border doodle-shadow bg-white p-6 rounded-2xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Allocation Details</h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-left py-3 px-4 font-bold text-gray-800">Asset</th>
                        <th className="text-right py-3 px-4 font-bold text-gray-800">Allocation</th>
                        <th className="text-right py-3 px-4 font-bold text-gray-800">Value</th>
                        <th className="text-center py-3 px-4 font-bold text-gray-800">Color</th>
                      </tr>
                    </thead>
                    <tbody>
                      {assetAllocation.map((asset, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 font-semibold">{asset.name}</td>
                          <td className="py-3 px-4 text-right font-bold">{asset.value}%</td>
                          <td className="py-3 px-4 text-right">
                            {formatCurrency((portfolioSummary.totalUsdValue * asset.value) / 100)}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <div 
                              className="w-6 h-6 rounded-full mx-auto"
                              style={{ backgroundColor: asset.color }}
                            ></div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Token Analysis Tab */}
          {activeTab === 'tokens' && (
            <div className="space-y-8">
              
              {/* Token Performance Chart */}
              <div className="doodle-border doodle-shadow bg-white p-6 rounded-2xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Token Performance Comparison</h3>
                
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={tokenPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="symbol" />
                    <YAxis tickFormatter={(value) => `${value}%`} />
                    <Tooltip formatter={(value: any) => [`${value}%`, 'P&L %']} />
                    <Bar dataKey="profitLossPercentage" fill="#6366f1" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Token Details Table */}
              <div className="doodle-border doodle-shadow bg-white p-6 rounded-2xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Token Analysis Details</h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-left py-3 px-4 font-bold text-gray-800">Token</th>
                        <th className="text-right py-3 px-4 font-bold text-gray-800">Current Value</th>
                        <th className="text-right py-3 px-4 font-bold text-gray-800">Initial Value</th>
                        <th className="text-right py-3 px-4 font-bold text-gray-800">P&L</th>
                        <th className="text-right py-3 px-4 font-bold text-gray-800">P&L %</th>
                        <th className="text-right py-3 px-4 font-bold text-gray-800">Allocation</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tokenPerformance.map((token, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 font-semibold">{token.symbol}</td>
                          <td className="py-3 px-4 text-right">{formatCurrency(token.currentValue)}</td>
                          <td className="py-3 px-4 text-right">{formatCurrency(token.initialValue)}</td>
                          <td className={`py-3 px-4 text-right font-bold ${
                            token.profitLoss >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {formatCurrency(token.profitLoss)}
                          </td>
                          <td className={`py-3 px-4 text-right font-bold ${
                            token.profitLossPercentage >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {formatPercentage(token.profitLossPercentage)}
                          </td>
                          <td className="py-3 px-4 text-right">{token.allocation}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortfolioAnalytics; 
 