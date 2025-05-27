import { useState, useEffect } from 'react';
import { portfolioTrackerService } from '../services/tools/portfolio-tracker';

interface CryptoHolding {
  symbol: string;
  amount: number;
  avgBuyPrice: number;
}

interface PortfolioData {
  holdings: CryptoHolding[];
  totalValue: number;
  totalPnL: number;
  totalPnLPercentage: number;
}

export const usePortfolioTracker = (accountId?: string) => {
  const [portfolio, setPortfolio] = useState<CryptoHolding[]>([]);
  const [prices, setPrices] = useState<any>({});
  const [analytics, setAnalytics] = useState<any>(null);
  const [marketOverview, setMarketOverview] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ดึงราคา crypto
  const fetchPrices = async (symbols?: string[]) => {
    setLoading(true);
    setError(null);
    try {
      const result = await portfolioTrackerService.getPrices(symbols);
      setPrices(result.data);
      return result.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch prices');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // บันทึก portfolio
  const savePortfolio = async (portfolioData: CryptoHolding[]) => {
    if (!accountId) {
      setError('Account ID is required to save portfolio');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const result = await portfolioTrackerService.savePortfolio(accountId, portfolioData);
      setPortfolio(portfolioData);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save portfolio');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // โหลด portfolio
  const loadPortfolio = async () => {
    if (!accountId) {
      setError('Account ID is required to load portfolio');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const result = await portfolioTrackerService.loadPortfolio(accountId);
      setPortfolio(result.data);
      return result.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load portfolio');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ดึงข้อมูล analytics
  const fetchAnalytics = async () => {
    if (!accountId) {
      setError('Account ID is required to fetch analytics');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const result = await portfolioTrackerService.getAnalytics(accountId);
      setAnalytics(result.data);
      return result.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch analytics');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ดึงข้อมูล market overview
  const fetchMarketOverview = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await portfolioTrackerService.getMarketOverview();
      setMarketOverview(result.data);
      return result.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch market overview');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // คำนวณ portfolio stats
  const calculatePortfolioStats = (holdings: CryptoHolding[], currentPrices: any) => {
    let totalValue = 0;
    let totalInvested = 0;

    holdings.forEach(holding => {
      const currentPrice = currentPrices[holding.symbol]?.price || 0;
      const value = holding.amount * currentPrice;
      const invested = holding.amount * holding.avgBuyPrice;
      
      totalValue += value;
      totalInvested += invested;
    });

    const totalPnL = totalValue - totalInvested;
    const totalPnLPercentage = totalInvested > 0 ? (totalPnL / totalInvested) * 100 : 0;

    return {
      totalValue,
      totalInvested,
      totalPnL,
      totalPnLPercentage
    };
  };

  // Auto-load data on mount
  useEffect(() => {
    fetchPrices();
    fetchMarketOverview();
    if (accountId) {
      loadPortfolio();
      fetchAnalytics();
    }
  }, [accountId]);

  return {
    portfolio,
    prices,
    analytics,
    marketOverview,
    loading,
    error,
    fetchPrices,
    savePortfolio,
    loadPortfolio,
    fetchAnalytics,
    fetchMarketOverview,
    calculatePortfolioStats
  };
};
