import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { aiForecastService, ForecastResponse, TrainingStatus, HistoricalDataPoint } from '../../services/ai-forecast';

interface AIForecastToolProps {
  accountId?: string | null;
}

const AIForecastTool: React.FC<AIForecastToolProps> = ({ accountId }) => {
  // State management
  const [selectedSymbol, setSelectedSymbol] = useState<string>('HBAR');
  const [supportedSymbols, setSupportedSymbols] = useState<string[]>([]);
  const [daysAhead, setDaysAhead] = useState<number>(7);
  const [activeTab, setActiveTab] = useState<'forecast' | 'historical' | 'training'>('forecast');
  
  // Data state
  const [forecastData, setForecastData] = useState<ForecastResponse | null>(null);
  const [historicalData, setHistoricalData] = useState<HistoricalDataPoint[]>([]);
  const [trainingStatus, setTrainingStatus] = useState<TrainingStatus | null>(null);
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);
  
  // Loading states
  const [isLoadingForecast, setIsLoadingForecast] = useState(false);
  const [isLoadingHistorical, setIsLoadingHistorical] = useState(false);
  const [isLoadingTraining, setIsLoadingTraining] = useState(false);
  const [isTraining, setIsTraining] = useState(false);
  
  // Error state
  const [error, setError] = useState<string | null>(null);

  // Load supported symbols on mount
  useEffect(() => {
    loadSupportedSymbols();
  }, []);

  // Load data when symbol changes
  useEffect(() => {
    if (selectedSymbol) {
      loadCurrentPrice();
      loadHistoricalData();
      checkTrainingStatus();
    }
  }, [selectedSymbol]);

  // Auto-refresh training status when training
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTraining) {
      interval = setInterval(() => {
        checkTrainingStatus();
      }, 5000); // Check every 5 seconds
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTraining, selectedSymbol]);

  const loadSupportedSymbols = async () => {
    try {
      const data = await aiForecastService.getSupportedSymbols();
      setSupportedSymbols(data.symbols);
      if (data.default && !selectedSymbol) {
        setSelectedSymbol(data.default);
      }
    } catch (err) {
      console.error('Failed to load supported symbols:', err);
      setError('Failed to load supported symbols');
    }
  };

  const loadCurrentPrice = async () => {
    try {
      const data = await aiForecastService.getCurrentPrice(selectedSymbol);
      setCurrentPrice(data.current_price);
    } catch (err) {
      console.error('Failed to load current price:', err);
    }
  };

  const loadHistoricalData = async () => {
    setIsLoadingHistorical(true);
    try {
      const data = await aiForecastService.getHistoricalData(selectedSymbol, '6mo', '1d');
      setHistoricalData(data.data);
    } catch (err) {
      console.error('Failed to load historical data:', err);
      setError('Failed to load historical data');
    } finally {
      setIsLoadingHistorical(false);
    }
  };

  const checkTrainingStatus = async () => {
    try {
      const status = await aiForecastService.getTrainingStatus(selectedSymbol);
      setTrainingStatus(status);
      
      // Update training state
      if (status.status === 'training') {
        setIsTraining(true);
      } else {
        setIsTraining(false);
      }
    } catch (err) {
      console.error('Failed to check training status:', err);
    }
  };

  const handleTrainModel = async () => {
    setIsLoadingTraining(true);
    setIsTraining(true);
    try {
      await aiForecastService.trainModel(selectedSymbol);
      setError(null);
      // Training status will be updated by the interval
    } catch (err: any) {
      console.error('Failed to start training:', err);
      setError(err.response?.data?.error || 'Failed to start model training');
      setIsTraining(false);
    } finally {
      setIsLoadingTraining(false);
    }
  };

  const handlePredict = async () => {
    setIsLoadingForecast(true);
    try {
      const data = await aiForecastService.predict(selectedSymbol, daysAhead);
      setForecastData(data);
      setError(null);
    } catch (err: any) {
      console.error('Failed to make prediction:', err);
      setError(err.response?.data?.error || 'Failed to make predictions');
      setForecastData(null);
    } finally {
      setIsLoadingForecast(false);
    }
  };

  const formatPrice = (price: number) => aiForecastService.formatPrice(price);
  const formatPercentage = (percentage: number) => aiForecastService.formatPercentage(percentage);

  // Prepare chart data
  const chartData = forecastData ? [
    ...historicalData.slice(-30).map(point => ({
      date: point.date,
      actual: point.close,
      type: 'historical'
    })),
    ...forecastData.predictions.map(pred => ({
      date: pred.date,
      prediction: pred.ensemble_prediction,
      rf_prediction: pred.rf_prediction,
      lstm_prediction: pred.lstm_prediction,
      confidence: pred.confidence,
      type: 'forecast'
    }))
  ] : historicalData.slice(-30).map(point => ({
    date: point.date,
    actual: point.close,
    type: 'historical'
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="doodle-border doodle-shadow bg-white p-8 rounded-2xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-3 flex items-center gap-3">
                <span className="text-5xl">🤖</span>
                AI Price Forecasting
              </h1>
              <p className="text-gray-600 text-lg">
                Advanced cryptocurrency price prediction using machine learning
              </p>
            </div>
            
            {/* Symbol Selector */}
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-2">Select Cryptocurrency</label>
                <select
                  value={selectedSymbol}
                  onChange={(e) => setSelectedSymbol(e.target.value)}
                  className="doodle-border px-4 py-2 rounded-xl bg-white text-gray-800 font-semibold min-w-[120px]"
                >
                  {supportedSymbols.map(symbol => (
                    <option key={symbol} value={symbol}>{symbol}</option>
                  ))}
                </select>
              </div>
              
              {currentPrice && (
                <div className="text-center">
                  <div className="text-sm text-gray-600">Current Price</div>
                  <div className="text-2xl font-bold text-indigo-600">
                    {formatPrice(currentPrice)}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-4">
              <strong>Error:</strong> {error}
            </div>
          )}
        </div>

        {/* Navigation Tabs */}
        <div className="doodle-border doodle-shadow bg-white p-2 rounded-2xl">
          <div className="flex space-x-2">
            {[
              { id: 'forecast', label: '🔮 Forecast', icon: '🔮' },
              { id: 'historical', label: '📈 Historical Data', icon: '📈' },
              { id: 'training', label: '🎯 Model Training', icon: '🎯' }
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
          
          {/* Forecast Tab */}
          {activeTab === 'forecast' && (
            <div className="space-y-8">
              
              {/* Prediction Controls */}
              <div className="doodle-border doodle-shadow bg-white p-6 rounded-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-800">Price Prediction</h3>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col">
                      <label className="text-sm font-semibold text-gray-700 mb-2">Days Ahead</label>
                      <select
                        value={daysAhead}
                        onChange={(e) => setDaysAhead(Number(e.target.value))}
                        className="doodle-border px-3 py-2 rounded-xl bg-white text-gray-800"
                      >
                        {[1, 3, 7, 14, 30].map(days => (
                          <option key={days} value={days}>{days} day{days > 1 ? 's' : ''}</option>
                        ))}
                      </select>
                    </div>
                    
                    <button
                      onClick={handlePredict}
                      disabled={isLoadingForecast || !trainingStatus || trainingStatus.status !== 'completed'}
                      className="doodle-border doodle-shadow px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-emerald-600 hover:to-green-700 transition-all duration-300 font-bold text-white rounded-xl hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                    >
                      {isLoadingForecast ? (
                        <span className="flex items-center gap-2">
                          <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                          Predicting...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          🔮 Make Prediction
                        </span>
                      )}
                    </button>
                  </div>
                </div>

                {/* Model Status */}
                {trainingStatus && (
                  <div className="mb-4">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                      trainingStatus.status === 'completed' ? 'bg-green-100 text-green-800' :
                      trainingStatus.status === 'training' ? 'bg-yellow-100 text-yellow-800' :
                      trainingStatus.status === 'error' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      Model Status: {trainingStatus.status.toUpperCase()}
                      {trainingStatus.status === 'training' && ` (${trainingStatus.progress}%)`}
                    </div>
                  </div>
                )}

                {/* Prediction Chart */}
                {chartData.length > 0 && (
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis tickFormatter={(value) => `$${value.toFixed(4)}`} />
                        <Tooltip 
                          formatter={(value: any, name: string) => [
                            formatPrice(value),
                            name === 'actual' ? 'Historical Price' :
                            name === 'prediction' ? 'AI Prediction' :
                            name === 'rf_prediction' ? 'Random Forest' :
                            name === 'lstm_prediction' ? 'LSTM' : name
                          ]}
                        />
                        <Legend />
                        
                        {/* Historical data */}
                        <Line
                          type="monotone"
                          dataKey="actual"
                          stroke="#6366f1"
                          strokeWidth={2}
                          name="Historical Price"
                          connectNulls={false}
                        />
                        
                        {/* Predictions */}
                        {forecastData && (
                          <>
                            <Line
                              type="monotone"
                              dataKey="prediction"
                              stroke="#10b981"
                              strokeWidth={3}
                              strokeDasharray="5 5"
                              name="AI Prediction"
                              connectNulls={false}
                            />
                            <Line
                              type="monotone"
                              dataKey="rf_prediction"
                              stroke="#f59e0b"
                              strokeWidth={1}
                              strokeDasharray="2 2"
                              name="Random Forest"
                              connectNulls={false}
                            />
                            {forecastData.model_info.has_lstm && (
                              <Line
                                type="monotone"
                                dataKey="lstm_prediction"
                                stroke="#8b5cf6"
                                strokeWidth={1}
                                strokeDasharray="2 2"
                                name="LSTM"
                                connectNulls={false}
                              />
                            )}
                          </>
                        )}
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>

              {/* Prediction Results */}
              {forecastData && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  
                  {/* Predictions Table */}
                  <div className="doodle-border doodle-shadow bg-white p-6 rounded-2xl">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Prediction Details</h3>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b-2 border-gray-200">
                            <th className="text-left py-3 px-2 font-bold text-gray-800">Date</th>
                            <th className="text-right py-3 px-2 font-bold text-gray-800">Price</th>
                            <th className="text-right py-3 px-2 font-bold text-gray-800">Change</th>
                            <th className="text-center py-3 px-2 font-bold text-gray-800">Confidence</th>
                          </tr>
                        </thead>
                        <tbody>
                          {forecastData.predictions.map((pred, index) => {
                            const trend = aiForecastService.getPredictionTrend(
                              currentPrice || forecastData.current_price,
                              pred.ensemble_prediction
                            );
                            return (
                              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="py-3 px-2 font-semibold">{pred.date}</td>
                                <td className="py-3 px-2 text-right font-bold">
                                  {formatPrice(pred.ensemble_prediction)}
                                </td>
                                <td className={`py-3 px-2 text-right font-bold ${trend.color}`}>
                                  {trend.trend === 'up' ? '↗' : trend.trend === 'down' ? '↘' : '→'} 
                                  {formatPercentage(trend.percentage)}
                                </td>
                                <td className="py-3 px-2 text-center">
                                  <span className={`font-bold ${aiForecastService.getConfidenceColor(pred.confidence)}`}>
                                    {(pred.confidence * 100).toFixed(0)}%
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Feature Importance */}
                  {forecastData.feature_importance && (
                    <div className="doodle-border doodle-shadow bg-white p-6 rounded-2xl">
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">Key Factors</h3>
                      
                      <div className="space-y-3">
                        {forecastData.feature_importance.slice(0, 8).map(([feature, importance], index) => (
                          <div key={index} className="flex items-center justify-between">
                            <span className="text-gray-700 font-medium">{feature.replace(/_/g, ' ')}</span>
                            <div className="flex items-center gap-2">
                              <div className="w-24 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-indigo-500 h-2 rounded-full"
                                  style={{ width: `${(importance * 100)}%` }}
                                ></div>
                              </div>
                              <span className="text-sm text-gray-600 w-12 text-right">
                                {(importance * 100).toFixed(1)}%
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Historical Data Tab */}
          {activeTab === 'historical' && (
            <div className="doodle-border doodle-shadow bg-white p-6 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Historical Price Data</h3>
              
              {isLoadingHistorical ? (
                <div className="flex items-center justify-center h-64">
                  <div className="animate-spin w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full"></div>
                </div>
              ) : historicalData.length > 0 ? (
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={historicalData.slice(-90)}>
                      <defs>
                        <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis tickFormatter={(value) => `$${value.toFixed(4)}`} />
                      <Tooltip formatter={(value: any) => [formatPrice(value), 'Price']} />
                      <Area
                        type="monotone"
                        dataKey="close"
                        stroke="#6366f1"
                        fillOpacity={1}
                        fill="url(#colorPrice)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-600">
                  No historical data available
                </div>
              )}
            </div>
          )}

          {/* Training Tab */}
          {activeTab === 'training' && (
            <div className="space-y-8">
              
              {/* Training Controls */}
              <div className="doodle-border doodle-shadow bg-white p-6 rounded-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-800">Model Training</h3>
                  
                  <button
                    onClick={handleTrainModel}
                    disabled={isLoadingTraining || isTraining}
                    className="doodle-border doodle-shadow px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-600 hover:to-blue-700 transition-all duration-300 font-bold text-white rounded-xl hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                  >
                    {isLoadingTraining || isTraining ? (
                      <span className="flex items-center gap-2">
                        <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                        {isTraining ? 'Training...' : 'Starting...'}
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        🎯 Train Model
                      </span>
                    )}
                  </button>
                </div>

                {/* Training Status */}
                {trainingStatus && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-700">Status:</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        trainingStatus.status === 'completed' ? 'bg-green-100 text-green-800' :
                        trainingStatus.status === 'training' ? 'bg-yellow-100 text-yellow-800' :
                        trainingStatus.status === 'error' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {trainingStatus.status.toUpperCase()}
                      </span>
                    </div>

                    {trainingStatus.status === 'training' && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-700">Progress:</span>
                          <span className="font-semibold">{trainingStatus.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                            style={{ width: `${trainingStatus.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {trainingStatus.status === 'completed' && trainingStatus.results && (
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="bg-green-50 p-4 rounded-xl">
                          <div className="text-sm text-gray-600">Random Forest Score</div>
                          <div className="text-2xl font-bold text-green-600">
                            {(trainingStatus.results.rf_test_score * 100).toFixed(1)}%
                          </div>
                        </div>
                        {trainingStatus.results.lstm_test_score && (
                          <div className="bg-purple-50 p-4 rounded-xl">
                            <div className="text-sm text-gray-600">LSTM Score</div>
                            <div className="text-2xl font-bold text-purple-600">
                              {(trainingStatus.results.lstm_test_score * 100).toFixed(1)}%
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {trainingStatus.status === 'error' && trainingStatus.error && (
                      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
                        <strong>Training Error:</strong> {trainingStatus.error}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIForecastTool; 
 