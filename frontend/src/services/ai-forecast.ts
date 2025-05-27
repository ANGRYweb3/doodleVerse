import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export interface CryptoSymbol {
  symbol: string;
  name: string;
  yahoo_symbol: string;
}

export interface MarketData {
  symbol: string;
  current_price: number;
  change_24h: number;
  change_24h_percent: number;
  volume_24h: number;
  high_24h: number;
  low_24h: number;
  timestamp: string;
}

export interface HistoricalDataPoint {
  date: string;
  timestamp: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  sma_7?: number;
  sma_14?: number;
  rsi?: number;
  volatility?: number;
}

export interface PredictionData {
  day: number;
  date: string;
  rf_prediction: number;
  lstm_prediction?: number;
  ensemble_prediction: number;
  confidence: number;
}

export interface ModelInfo {
  has_lstm: boolean;
  has_rf: boolean;
  sequence_length: number;
  feature_count?: number;
}

export interface TrainingStatus {
  status: 'not_started' | 'training' | 'completed' | 'error';
  progress: number;
  results?: {
    rf_train_score: number;
    rf_test_score: number;
    lstm_test_score?: number;
    training_samples: number;
    test_samples: number;
  };
  error?: string;
  trained_at?: string;
  failed_at?: string;
}

export interface ForecastResponse {
  symbol: string;
  current_price: number;
  predictions: PredictionData[];
  feature_importance?: Array<[string, number]>;
  model_info: ModelInfo;
  generated_at: string;
}

class AIForecastService {
  private api = axios.create({
    baseURL: `${API_BASE_URL}/api/tools/ai-forecast`,
    timeout: 60000, // 1 minute timeout
    headers: {
      'Content-Type': 'application/json'
    }
  });

  // Health check
  async healthCheck(): Promise<any> {
    try {
      const response = await this.api.get('/health');
      return response.data;
    } catch (error) {
      console.error('AI Forecast health check failed:', error);
      throw error;
    }
  }

  // Get supported symbols
  async getSupportedSymbols(): Promise<{ symbols: string[]; default: string }> {
    try {
      const response = await this.api.get('/symbols');
      return response.data;
    } catch (error) {
      console.error('Failed to get supported symbols:', error);
      throw error;
    }
  }

  // Get current price
  async getCurrentPrice(symbol: string): Promise<{
    symbol: string;
    current_price: number;
    market_data: MarketData;
    timestamp: string;
  }> {
    try {
      const response = await this.api.get(`/price/${symbol}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to get current price for ${symbol}:`, error);
      throw error;
    }
  }

  // Get historical data
  async getHistoricalData(
    symbol: string,
    period: string = '3mo',
    interval: string = '1d'
  ): Promise<{
    symbol: string;
    period: string;
    interval: string;
    data: HistoricalDataPoint[];
    total_records: number;
  }> {
    try {
      const response = await this.api.get(`/historical/${symbol}`, {
        params: { period, interval }
      });
      return response.data;
    } catch (error) {
      console.error(`Failed to get historical data for ${symbol}:`, error);
      throw error;
    }
  }

  // Train model
  async trainModel(symbol: string): Promise<{
    message: string;
    symbol: string;
    status: string;
  }> {
    try {
      const response = await this.api.post(`/train/${symbol}`, {}, {
        timeout: 300000 // 5 minutes for training
      });
      return response.data;
    } catch (error) {
      console.error(`Failed to train model for ${symbol}:`, error);
      throw error;
    }
  }

  // Get training status
  async getTrainingStatus(symbol: string): Promise<TrainingStatus & { symbol: string }> {
    try {
      const response = await this.api.get(`/training-status/${symbol}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to get training status for ${symbol}:`, error);
      throw error;
    }
  }

  // Make predictions
  async predict(symbol: string, daysAhead: number = 7): Promise<ForecastResponse> {
    try {
      const response = await this.api.post(`/predict/${symbol}`, {
        days_ahead: daysAhead
      }, {
        timeout: 60000 // 1 minute for predictions
      });
      return response.data;
    } catch (error) {
      console.error(`Failed to make predictions for ${symbol}:`, error);
      throw error;
    }
  }

  // Get model information
  async getModelInfo(symbol: string): Promise<{
    symbol: string;
    model_available: boolean;
    model_info?: ModelInfo;
    feature_importance?: Array<[string, number]>;
    training_status?: TrainingStatus;
    message?: string;
  }> {
    try {
      const response = await this.api.get(`/model-info/${symbol}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to get model info for ${symbol}:`, error);
      throw error;
    }
  }

  // Retrain model
  async retrainModel(symbol: string): Promise<{
    message: string;
    symbol: string;
    status: string;
  }> {
    try {
      const response = await this.api.post(`/retrain/${symbol}`, {}, {
        timeout: 300000 // 5 minutes for retraining
      });
      return response.data;
    } catch (error) {
      console.error(`Failed to retrain model for ${symbol}:`, error);
      throw error;
    }
  }

  // Batch predictions
  async batchPredict(symbols: string[], daysAhead: number = 7): Promise<{
    batch_predictions: Array<{
      symbol: string;
      success: boolean;
      data?: ForecastResponse;
      error?: string;
    }>;
    requested_symbols: string[];
    days_ahead: number;
    generated_at: string;
  }> {
    try {
      const response = await this.api.post('/batch-predict', {
        symbols,
        days_ahead: daysAhead
      }, {
        timeout: 120000 // 2 minutes for batch predictions
      });
      return response.data;
    } catch (error) {
      console.error('Failed to make batch predictions:', error);
      throw error;
    }
  }

  // Get market overview
  async getMarketOverview(): Promise<{
    market_overview: Array<{
      symbol: string;
      success: boolean;
      current_price?: number;
      market_data?: MarketData;
      model_available?: boolean;
      prediction?: PredictionData;
      error?: string;
    }>;
    timestamp: string;
  }> {
    try {
      const response = await this.api.get('/market-overview');
      return response.data;
    } catch (error) {
      console.error('Failed to get market overview:', error);
      throw error;
    }
  }

  // Utility methods
  formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 6
    }).format(price);
  }

  formatPercentage(percentage: number): string {
    const sign = percentage >= 0 ? '+' : '';
    return `${sign}${percentage.toFixed(2)}%`;
  }

  formatVolume(volume: number): string {
    if (volume >= 1e9) {
      return `${(volume / 1e9).toFixed(2)}B`;
    } else if (volume >= 1e6) {
      return `${(volume / 1e6).toFixed(2)}M`;
    } else if (volume >= 1e3) {
      return `${(volume / 1e3).toFixed(2)}K`;
    }
    return volume.toFixed(0);
  }

  getConfidenceColor(confidence: number): string {
    if (confidence >= 0.8) return 'text-green-600';
    if (confidence >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  }

  getPredictionTrend(currentPrice: number, predictedPrice: number): {
    trend: 'up' | 'down' | 'neutral';
    percentage: number;
    color: string;
  } {
    const change = ((predictedPrice - currentPrice) / currentPrice) * 100;
    
    if (Math.abs(change) < 0.1) {
      return { trend: 'neutral', percentage: change, color: 'text-gray-600' };
    }
    
    return {
      trend: change > 0 ? 'up' : 'down',
      percentage: change,
      color: change > 0 ? 'text-green-600' : 'text-red-600'
    };
  }
}

export const aiForecastService = new AIForecastService(); 
 