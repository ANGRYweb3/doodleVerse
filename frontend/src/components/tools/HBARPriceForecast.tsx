import React, { useState, useEffect, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface HBARData {
  timestamp: string;
  close: number;
  high: number;
  low: number;
  open: number;
  volume: number;
}

interface TechnicalIndicators {
  sma14?: number;
  ema14?: number;
  rsi14?: number;
  macd?: number;
  macdSignal?: number;
  bbUpper?: number;
  bbMiddle?: number;
  bbLower?: number;
  atr14?: number;
}

interface ForecastData {
  currentPrice: number;
  forecast: {
    dates: string[];
    prices: number[];
    confidence_intervals: Array<{
      lower: number;
      upper: number;
    }>;
  };
  forecastDays: number;
  modelInfo: {
    type: string;
    order: {
      p: number;
      d: number;
      q: number;
    };
    seasonal_order: {
      P: number;
      D: number;
      Q: number;
      s: number;
    };
    n_observations: number;
    mean_return: number;
    volatility: number;
    isStationary: boolean;
    adf_statistic: number;
    adf_p_value: number;
  };
  seasonality: {
    acf: number[];
    detected_patterns: Array<{
      lag: number;
      correlation: number;
      significant: boolean;
    }>;
  };
}

interface BacktestResult {
  step: number;
  rmse: number;
  winRate: number;
  seasonalPeriod: number;
  isStationary: boolean;
}

// Simple SVG Icons
const TrendingUpIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const TrendingDownIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
  </svg>
);

const ActivityIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const BarChart3Icon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ClockIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const TargetIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const HBARPriceForecast: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'technical' | 'forecast' | 'backtest'>('overview');
  const [hbarData, setHbarData] = useState<HBARData[]>([]);
  const [technicalData, setTechnicalData] = useState<(HBARData & TechnicalIndicators)[]>([]);
  const [forecastData, setForecastData] = useState<any>(null);
  const [backtestResults, setBacktestResults] = useState<any[]>([]);
  const [backtestMetrics, setBacktestMetrics] = useState<any>(null);
  const [currentStatus, setCurrentStatus] = useState<any>(null);
  
  // Settings
  const [forecastDays, setForecastDays] = useState(7);
  const [selectedIndicators, setSelectedIndicators] = useState<string[]>(['sma', 'ema', 'rsi', 'macd']);
  const [backtestPeriod, setBacktestPeriod] = useState(30);
  // New backtest parameters
  const [backtestStartDay, setBacktestStartDay] = useState(30); // How many days back to start
  const [backtestPredictionDays, setBacktestPredictionDays] = useState(10); // How many days to predict

  const API_BASE = 'http://localhost:3001/api/hbar';

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        loadHBARData(),
        loadCurrentStatus()
      ]);
    } catch (error) {
      console.error('Error loading initial data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadHBARData = async () => {
    try {
      const response = await fetch(`${API_BASE}/data`);
      const result = await response.json();
      if (result.success) {
        setHbarData(result.data || []);
      }
    } catch (error) {
      console.error('Error loading HBAR data:', error);
    }
  };

  const loadCurrentStatus = async () => {
    try {
      const response = await fetch(`${API_BASE}/status`);
      const result = await response.json();
      if (result.success) {
        setCurrentStatus(result.status);
      }
    } catch (error) {
      console.error('Error loading current status:', error);
    }
  };

  const generateForecast = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/forecast?days=${forecastDays}`);
      const result = await response.json();
      if (result.success) {
        setForecastData(result);
      }
    } catch (error) {
      console.error('Error generating forecast:', error);
    } finally {
      setLoading(false);
    }
  };

  const runBacktest = async () => {
    setLoading(true);
    setBacktestResults([]);
    setBacktestMetrics(null);
    try {
      const response = await fetch(`${API_BASE}/backtest?startDay=${backtestStartDay}&predictionDays=${backtestPredictionDays}`);
      const result = await response.json();
      if (result.success) {
        setBacktestResults(result.results || []);
        setBacktestMetrics(result.backtest?.metrics || null);
      }
    } catch (error) {
      console.error('Error running backtest:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 4,
      maximumFractionDigits: 4
    }).format(price);
  };

  const formatPercent = (value: number) => {
    return `${(value * 100).toFixed(2)}%`;
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  // Prepare chart data (last 90 days)
  const chartData = useMemo(() => {
    if (!hbarData || hbarData.length === 0) return [];
    
    const recentData = hbarData.slice(-90);
    return recentData.map((item) => ({
      date: formatDate(item.timestamp),
      price: item.close,
      volume: item.volume
    }));
  }, [hbarData]);

  // Prepare forecast chart data
  const forecastChartData = useMemo(() => {
    if (!forecastData || !forecastData.forecast || !Array.isArray(forecastData.forecast.prices) || !hbarData || hbarData.length === 0) return [];
    
    const historicalData = hbarData.slice(-30).map((item) => ({
      date: formatDate(item.timestamp),
      actual: item.close,
      forecast: null,
      type: 'historical'
    }));
    
    const forecastPoints = forecastData.forecast.prices.map((price: number, index: number) => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + index + 1);
      return {
        date: futureDate.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric'
        }),
        actual: null,
        forecast: price,
        type: 'forecast'
      };
    });
    
    return [...historicalData, ...forecastPoints];
  }, [forecastData, hbarData]);

  const renderOverviewTab = () => {
    // Determine Y-axis domain for overview forecast chart
    let yDomainOverview: [number | string, number | string] = ['auto', 'auto'];
    if (forecastData && forecastChartData && forecastChartData.length > 0) {
      const prices = forecastChartData.flatMap(d => [d.actual, d.forecast]).filter(p => p !== null && p !== undefined) as number[];
      if (prices.length > 0) {
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        yDomainOverview = [minPrice * 0.99, maxPrice * 1.01];
      }
    }

    return (
      <div className="space-y-6">
        {/* Current Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Current Price</p>
                <p className="text-2xl font-bold text-gray-900">
                  {currentStatus ? formatPrice(currentStatus.currentPrice) : '--'}
                </p>
              </div>
              <div className={`p-2 rounded-full ${
                currentStatus?.priceChange >= 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
              }`}>
                {currentStatus?.priceChange >= 0 ? <TrendingUpIcon /> : <TrendingDownIcon />}
              </div>
            </div>
            {currentStatus && (
              <div className={`flex items-center mt-2 text-sm ${
                currentStatus.priceChange >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                <span>{currentStatus.priceChange >= 0 ? '+' : ''}{formatPrice(currentStatus.priceChange)}</span>
                <span className="ml-2">({formatPercent(currentStatus.priceChangePercent / 100)})</span>
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">RSI</p>
                <p className="text-2xl font-bold text-gray-900">
                  {currentStatus?.technicalIndicators?.rsi ? 
                    currentStatus.technicalIndicators.rsi.toFixed(2) : '--'}
                </p>
              </div>
              <div className="text-blue-600">
                <ActivityIcon />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Data</p>
                <p className="text-2xl font-bold text-gray-900">{hbarData?.length || 0}</p>
              </div>
              <div className="text-purple-600">
                <BarChart3Icon />
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2">Days</p>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Data Status</p>
                <p className="text-lg font-semibold text-green-600">Normal</p>
              </div>
              <div className="text-green-600">
                <CheckCircleIcon />
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Last Updated: {hbarData.length > 0 ? formatDate(hbarData[hbarData.length - 1].timestamp) : 'N/A'}
            </p>
          </div>
        </div>

        {/* Price Chart */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">HBAR Price Forecast Chart</h3>
          {forecastData && forecastChartData && forecastChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={forecastChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis allowDataOverflow={true} domain={yDomainOverview} />
                <Tooltip
                  formatter={(value: any, name: string) => [
                    value ? formatPrice(value) : '--',
                    name === 'actual' ? 'Actual Price' : 'Forecast'
                  ]}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="actual"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={false}
                  name="Actual Price"
                />
                <Line
                  type="monotone"
                  dataKey="forecast"
                  stroke="#EF4444"
                  strokeWidth={2}
                  dot={false}
                  name="Forecast Price"
                  strokeDasharray="5 5"
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-600 mb-4">No forecast data available. Please generate a forecast in the 'Forecast' tab.</p>
              <button
                onClick={() => setActiveTab('forecast')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center mx-auto"
              >
                <TrendingUpIcon />
                <span className="ml-2">Go to Forecast Tab</span>
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderForecastTab = () => (
    <div className="space-y-6">
      {/* Forecast Settings */}
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Forecast Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Forecast Days
            </label>
            <input
              type="number"
              value={forecastDays}
              onChange={(e) => setForecastDays(parseInt(e.target.value))}
              min="1"
              max="30"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={generateForecast}
              disabled={loading}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center justify-center"
            >
              {loading ? (
                <>
                  <ClockIcon />
                  <span className="ml-2">Generating...</span>
                </>
              ) : (
                <>
                  <TargetIcon />
                  <span className="ml-2">Generate Forecast</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Forecast Results */}
      {forecastData && (
        <>
          {/* Model Information */}
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <h3 className="text-lg font-semibold mb-4">Enhanced SARIMAX Model Information</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-sm text-gray-600">Model Type</p>
                <p className="font-semibold text-blue-600">
                  {forecastData.modelInfo?.type || 'Enhanced SARIMAX'}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Stationarity</p>
                <p className={`font-semibold ${forecastData.modelInfo?.isStationary ? 'text-green-600' : 'text-red-600'}`}>
                  {forecastData.modelInfo?.isStationary ? 'Stationary' : 'Non-stationary'}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Volatility</p>
                <p className="font-semibold">{(forecastData.modelInfo?.volatility * 100)?.toFixed(2)}%</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Observations</p>
                <p className="font-semibold">{forecastData.modelInfo?.n_observations}</p>
              </div>
            </div>
          </div>

          {/* Forecast Chart */}
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <h3 className="text-lg font-semibold mb-4">HBAR Price Forecast</h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={forecastChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip 
                  formatter={(value: any, name: string) => [
                    value ? formatPrice(value) : '--',
                    name === 'actual' ? 'Actual Price' : 'Forecast'
                  ]}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  dot={false}
                  name="Actual Price"
                />
                <Line 
                  type="monotone" 
                  dataKey="forecast" 
                  stroke="#EF4444" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                  name="Forecast"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Forecast Summary */}
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <h3 className="text-lg font-semibold mb-4">Forecast Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-600">Current Price</p>
                <p className="text-lg font-semibold">{formatPrice(forecastData.currentPrice)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">7-Day Forecast</p>
                <p className="text-lg font-semibold">
                  {forecastData.forecast?.prices?.[6] ? formatPrice(forecastData.forecast.prices[6]) : '--'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Forecast Days</p>
                <p className="text-lg font-semibold">{forecastData.forecastDays}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Change</p>
                <p className={`text-lg font-semibold ${
                  forecastData.forecast?.prices?.[6] > forecastData.currentPrice ? 'text-green-600' : 'text-red-600'
                }`}>
                  {forecastData.forecast?.prices?.[6] ? 
                    formatPercent((forecastData.forecast.prices[6] - forecastData.currentPrice) / forecastData.currentPrice) : '--'}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );

  const renderBacktestTab = () => {
    const mae = backtestMetrics?.mae || 0;
    const rmse = backtestMetrics?.rmse || 0;
    const winRate = backtestMetrics?.winRate || 0;

    // Determine Y-axis domain for backtest chart
    const backtestPrices = backtestResults.flatMap(r => [r.actual, r.predicted].filter(p => p !== null && p !== undefined)) as number[];
    const yDomainBacktest: [number | string, number | string] = backtestPrices.length > 0 
        ? [Math.min(...backtestPrices) * 0.99, Math.max(...backtestPrices) * 1.01]
        : ['auto', 'auto'];

    const formatBacktestTooltip = (value: number) => {
      return value.toFixed(3); // Format to 0.xxx
    };

    return (
      <div className="space-y-6">
        {/* Backtest Controls */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Backtesting Controls</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label htmlFor="backtestStartDay" className="block text-sm font-medium text-gray-700">
                Start From (Days Back)
              </label>
              <select
                id="backtestStartDay"
                value={backtestStartDay}
                onChange={(e) => setBacktestStartDay(parseInt(e.target.value))}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                {[10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60].map(days => (
                  <option key={days} value={days}>{days} Days Ago</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="backtestPredictionDays" className="block text-sm font-medium text-gray-700">
                Prediction Period (Days)
              </label>
              <select
                id="backtestPredictionDays"
                value={backtestPredictionDays}
                onChange={(e) => setBacktestPredictionDays(parseInt(e.target.value))}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                {[5, 7, 10, 14, 15, 20, 25, 30].map(days => (
                  <option key={days} value={days}>{days} Days</option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={runBacktest}
                disabled={loading}
                className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <ClockIcon />
                    <span className="ml-2">Running Test...</span>
                  </>
                ) : (
                  <>
                    <BarChart3Icon />
                    <span className="ml-2">Start Backtest</span>
                  </>
                )}
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            Select how many days back to start the backtest and how many days to predict. 
            Example: Start from 30 days ago and predict 10 days = predict days 71-80.
          </p>
        </div>

        {/* Backtest Summary Cards */}
        {backtestResults.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm border text-center">
              <p className="text-sm text-gray-600">Start From</p>
              <p className="text-2xl font-bold text-blue-600">{backtestStartDay} Days Ago</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border text-center">
              <p className="text-sm text-gray-600">Prediction Period</p>
              <p className="text-2xl font-bold text-purple-600">{backtestPredictionDays} Days</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border text-center">
              <p className="text-sm text-gray-600">Average Error (MAE)</p>
              <p className="text-2xl font-bold text-orange-600">{typeof mae === 'number' ? mae.toFixed(6) : 'N/A'}</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border text-center">
              <p className="text-sm text-gray-600">Root Mean Square Error (RMSE)</p>
              <p className="text-2xl font-bold text-red-600">{typeof rmse === 'number' ? rmse.toFixed(6) : 'N/A'}</p>
            </div>
          </div>
        )}

        {/* Backtest Results */}
        {backtestResults.length > 0 && (
          <>
            {/* Backtest Performance Chart */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h3 className="text-lg font-semibold mb-4">Backtest Performance Chart</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={backtestResults.map(r => ({ date: formatDate(r.timestamp), actual: r.actual, predicted: r.predicted }))}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={yDomainBacktest} tickFormatter={(tick) => tick.toFixed(3)} />
                  <Tooltip formatter={formatBacktestTooltip} />
                  <Legend />
                  <Line type="monotone" dataKey="actual" stroke="#3B82F6" strokeWidth={2} name="Actual Price" dot={false} />
                  <Line type="monotone" dataKey="predicted" stroke="#EF4444" strokeWidth={2} name="Predicted Price" dot={false} strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h3 className="text-lg font-semibold mb-4">Backtest Results Table</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actual
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Predicted
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Error
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {backtestResults.map((result, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {formatDate(result.timestamp)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatPrice(result.actual)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatPrice(result.predicted)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatPrice(Math.abs(result.error))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Navigation Tabs */}
        <div className="mb-6">
          <nav className="flex space-x-8">
            {[
              { key: 'overview', label: 'Overview', icon: BarChart3Icon },
              { key: 'forecast', label: 'Forecast', icon: TrendingUpIcon },
              { key: 'backtest', label: 'Backtesting', icon: TargetIcon }
            ].map(tab => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg ${
                    activeTab === tab.key
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <div className="w-4 h-4 mr-2">
                    <IconComponent />
                  </div>
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        {loading && activeTab === 'overview' ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="w-8 h-8 mx-auto mb-4 text-blue-600">
                <ClockIcon />
              </div>
              <p className="text-gray-600">Loading data...</p>
            </div>
          </div>
        ) : (
          <>
            {activeTab === 'overview' && renderOverviewTab()}
            {activeTab === 'forecast' && renderForecastTab()}
            {activeTab === 'backtest' && renderBacktestTab()}
          </>
        )}
      </div>
    </div>
  );
};

export default HBARPriceForecast; 