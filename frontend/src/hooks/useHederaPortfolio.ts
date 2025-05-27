import { useState, useEffect, useCallback } from 'react';
import { 
  hederaMirrorNode, 
  HederaAccount, 
  TokenBalance, 
  TokenInfo, 
  NFTInfo, 
  Transaction 
} from '../services/hedera/mirrorNode';
import { mockHederaData } from '../services/hedera/mockData';

export interface EnrichedTokenBalance extends TokenBalance {
  tokenInfo?: TokenInfo;
  usdValue?: number;
  formattedBalance?: string;
}

export interface PortfolioSummary {
  totalHbarBalance: number;
  totalUsdValue: number;
  tokenCount: number;
  nftCount: number;
  hbarPrice: number;
  totalProfitLoss?: number;
  totalProfitLossPercentage?: number;
  initialInvestment?: number;
}

export interface UseHederaPortfolioReturn {
  // Data
  account: HederaAccount | null;
  tokenBalances: EnrichedTokenBalance[];
  nfts: NFTInfo[];
  transactions: Transaction[];
  portfolioSummary: PortfolioSummary;
  
  // Loading states
  isLoading: boolean;
  isLoadingTokens: boolean;
  isLoadingNFTs: boolean;
  isLoadingTransactions: boolean;
  
  // Error states
  error: string | null;
  
  // Actions
  refreshPortfolio: () => Promise<void>;
  refreshTokens: () => Promise<void>;
  refreshNFTs: () => Promise<void>;
  refreshTransactions: () => Promise<void>;
}

export const useHederaPortfolio = (accountId: string | null): UseHederaPortfolioReturn => {
  // Mock mode for demo purposes
  const useMockData = true; // Set to false to use real API
  
  // State
  const [account, setAccount] = useState<HederaAccount | null>(null);
  const [tokenBalances, setTokenBalances] = useState<EnrichedTokenBalance[]>([]);
  const [nfts, setNfts] = useState<NFTInfo[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [hbarPrice, setHbarPrice] = useState<number>(0);
  
  // Loading states
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingTokens, setIsLoadingTokens] = useState(false);
  const [isLoadingNFTs, setIsLoadingNFTs] = useState(false);
  const [isLoadingTransactions, setIsLoadingTransactions] = useState(false);
  
  // Error state
  const [error, setError] = useState<string | null>(null);

  // Mock data loading functions
  const loadMockData = useCallback(async () => {
    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setAccount(mockHederaData.account as HederaAccount);
    setTokenBalances(mockHederaData.tokenBalances as EnrichedTokenBalance[]);
    setNfts(mockHederaData.nfts as NFTInfo[]);
    setTransactions(mockHederaData.transactions as Transaction[]);
    setHbarPrice(mockHederaData.portfolioSummary.hbarPrice);
  }, []);

  // Fetch account information
  const fetchAccountInfo = useCallback(async (accId: string) => {
    if (useMockData) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setAccount(mockHederaData.account as HederaAccount);
      return mockHederaData.account as HederaAccount;
    }
    
    try {
      const accountInfo = await hederaMirrorNode.getAccountInfo(accId);
      setAccount(accountInfo);
      return accountInfo;
    } catch (err) {
      console.error('Error fetching account info:', err);
      throw err;
    }
  }, [useMockData]);

  // Fetch token balances with enriched data
  const fetchTokenBalances = useCallback(async (accId: string) => {
    setIsLoadingTokens(true);
    try {
      if (useMockData) {
        await new Promise(resolve => setTimeout(resolve, 800));
        setTokenBalances(mockHederaData.tokenBalances as EnrichedTokenBalance[]);
        return mockHederaData.tokenBalances as EnrichedTokenBalance[];
      }
      
      const balances = await hederaMirrorNode.getTokenBalances(accId);
      
      // Enrich token balances with token info
      const enrichedBalances = await Promise.all(
        balances.map(async (balance) => {
          try {
            const tokenInfo = await hederaMirrorNode.getTokenInfo(balance.token_id);
            const formattedBalance = (balance.balance / Math.pow(10, balance.decimals)).toFixed(balance.decimals);
            
            return {
              ...balance,
              tokenInfo,
              formattedBalance,
              usdValue: 0 // TODO: Add token price lookup
            } as EnrichedTokenBalance;
          } catch (err) {
            console.error(`Error fetching token info for ${balance.token_id}:`, err);
            return {
              ...balance,
              formattedBalance: (balance.balance / Math.pow(10, balance.decimals)).toFixed(balance.decimals),
              usdValue: 0
            } as EnrichedTokenBalance;
          }
        })
      );
      
      setTokenBalances(enrichedBalances);
      return enrichedBalances;
    } catch (err) {
      console.error('Error fetching token balances:', err);
      throw err;
    } finally {
      setIsLoadingTokens(false);
    }
  }, [useMockData]);

  // Fetch NFTs
  const fetchNFTs = useCallback(async (accId: string) => {
    setIsLoadingNFTs(true);
    try {
      if (useMockData) {
        await new Promise(resolve => setTimeout(resolve, 600));
        setNfts(mockHederaData.nfts as NFTInfo[]);
        return mockHederaData.nfts as NFTInfo[];
      }
      
      const nftData = await hederaMirrorNode.getNFTs(accId);
      setNfts(nftData);
      return nftData;
    } catch (err) {
      console.error('Error fetching NFTs:', err);
      throw err;
    } finally {
      setIsLoadingNFTs(false);
    }
  }, [useMockData]);

  // Fetch transactions
  const fetchTransactions = useCallback(async (accId: string) => {
    setIsLoadingTransactions(true);
    try {
      if (useMockData) {
        await new Promise(resolve => setTimeout(resolve, 700));
        setTransactions(mockHederaData.transactions as Transaction[]);
        return mockHederaData.transactions as Transaction[];
      }
      
      const txData = await hederaMirrorNode.getTransactions(accId, 50);
      setTransactions(txData);
      return txData;
    } catch (err) {
      console.error('Error fetching transactions:', err);
      throw err;
    } finally {
      setIsLoadingTransactions(false);
    }
  }, [useMockData]);

  // Fetch HBAR price
  const fetchHbarPrice = useCallback(async () => {
    try {
      if (useMockData) {
        await new Promise(resolve => setTimeout(resolve, 300));
        setHbarPrice(mockHederaData.portfolioSummary.hbarPrice);
        return mockHederaData.portfolioSummary.hbarPrice;
      }
      
      const price = await hederaMirrorNode.getHBARPrice();
      setHbarPrice(price);
      return price;
    } catch (err) {
      console.error('Error fetching HBAR price:', err);
      return 0;
    }
  }, [useMockData]);

  // Refresh all portfolio data
  const refreshPortfolio = useCallback(async () => {
    if (!accountId) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      if (useMockData) {
        await loadMockData();
      } else {
        await Promise.all([
          fetchAccountInfo(accountId),
          fetchTokenBalances(accountId),
          fetchNFTs(accountId),
          fetchTransactions(accountId),
          fetchHbarPrice()
        ]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch portfolio data');
    } finally {
      setIsLoading(false);
    }
  }, [accountId, useMockData, loadMockData, fetchAccountInfo, fetchTokenBalances, fetchNFTs, fetchTransactions, fetchHbarPrice]);

  // Individual refresh functions
  const refreshTokens = useCallback(async () => {
    if (!accountId) return;
    try {
      if (useMockData) {
        await fetchTokenBalances('mock');
      } else {
        await fetchTokenBalances(accountId);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch tokens');
    }
  }, [accountId, useMockData, fetchTokenBalances]);

  const refreshNFTs = useCallback(async () => {
    if (!accountId) return;
    try {
      if (useMockData) {
        await fetchNFTs('mock');
      } else {
        await fetchNFTs(accountId);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch NFTs');
    }
  }, [accountId, useMockData, fetchNFTs]);

  const refreshTransactions = useCallback(async () => {
    if (!accountId) return;
    try {
      if (useMockData) {
        await fetchTransactions('mock');
      } else {
        await fetchTransactions(accountId);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch transactions');
    }
  }, [accountId, useMockData, fetchTransactions]);

  // Calculate portfolio summary
  const portfolioSummary: PortfolioSummary = useMockData ? mockHederaData.portfolioSummary : {
    totalHbarBalance: account ? hederaMirrorNode.tinybarToHbar(account.balance.balance) : 0,
    totalUsdValue: account ? hederaMirrorNode.tinybarToHbar(account.balance.balance) * hbarPrice : 0,
    tokenCount: tokenBalances.length,
    nftCount: nfts.length,
    hbarPrice
  };

  // Auto-fetch data when accountId changes
  useEffect(() => {
    if (accountId) {
      refreshPortfolio();
    } else {
      // Reset state when no account
      setAccount(null);
      setTokenBalances([]);
      setNfts([]);
      setTransactions([]);
      setError(null);
    }
  }, [accountId, refreshPortfolio]);

  // Fetch HBAR price periodically
  useEffect(() => {
    fetchHbarPrice();
    const interval = setInterval(fetchHbarPrice, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [fetchHbarPrice]);

  return {
    // Data
    account,
    tokenBalances,
    nfts,
    transactions,
    portfolioSummary,
    
    // Loading states
    isLoading,
    isLoadingTokens,
    isLoadingNFTs,
    isLoadingTransactions,
    
    // Error state
    error,
    
    // Actions
    refreshPortfolio,
    refreshTokens,
    refreshNFTs,
    refreshTransactions
  };
}; 
 