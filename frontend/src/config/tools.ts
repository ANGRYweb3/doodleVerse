import React from 'react';
import { Tool, ToolCategory } from '../types/tools';

// Lazy load components
const HederaPortfolioDashboard = React.lazy(() => import('../components/tools/HederaPortfolioDashboard'));
const AIForecastTool = React.lazy(() => import('../components/tools/AIForecastTool'));
const HBARPriceForecast = React.lazy(() => import('../components/tools/HBARPriceForecast'));

// Tool Categories
export const TOOL_CATEGORIES: ToolCategory[] = [
  {
    id: 'hedera',
    name: 'Hedera Tools',
    description: 'Hedera Hashgraph ecosystem tools and portfolio management',
    icon: 'ℏ',
    color: 'from-indigo-400 to-purple-500'
  },
  {
    id: 'coming-soon',
    name: 'Coming Next',
    description: 'Tools currently in development',
    icon: '',
    color: 'from-blue-400 to-purple-500'
  },
  {
    id: 'ideas',
    name: 'Ideas / Community Request',
    description: 'Tool ideas and community suggestions',
    icon: '',
    color: 'from-gray-400 to-gray-600'
  }
];

// Placeholder component for coming soon tools
const ComingSoonTool = React.lazy(() => Promise.resolve({
  default: () => React.createElement('div', { 
    className: 'min-h-screen flex items-center justify-center' 
  }, React.createElement('div', { 
    className: 'text-center' 
  }, [
    React.createElement('div', { key: 'icon', className: 'text-6xl mb-4' }, ''),
    React.createElement('h2', { key: 'title', className: 'text-2xl font-bold text-gray-800 mb-2 font-doodle' }, 'Tool กำลังพัฒนา'),
    React.createElement('p', { key: 'desc', className: 'text-gray-600 font-doodle-fun' }, 'เร็วๆ นี้!')
  ]))
}));

// Tools Registry
export const TOOLS: Tool[] = [
  {
    id: 'hbar-forecast',
    name: 'HBAR Price Forecasting',
    description: 'HBAR Price Prediction Tool with SARIMAX Model and Technical Analysis, featuring Backtesting and Performance Metrics.',
    icon: '',
    component: HBARPriceForecast,
    requiredNFT: false,
    category: 'hedera',
    isActive: true,
    comingSoon: false,
    likes: 12,
    userLiked: false
  },
  {
    id: 'yield-farming',
    name: 'Yield Farming Calculator',
    description: 'Calculate optimal yield farming strategies. (Maybe coming soon)',
    icon: '',
    component: ComingSoonTool,
    requiredNFT: true,
    category: 'ideas',
    isActive: false,
    comingSoon: false,
    likes: 8,
    userLiked: false
  },
  {
    id: 'market-sentiment',
    name: 'Market Sentiment',
    description: 'Analyze market sentiment using social media and news data',
    icon: '',
    component: ComingSoonTool,
    requiredNFT: true,
    category: 'coming-soon',
    isActive: false,
    comingSoon: true,
    likes: 15,
    userLiked: false
  },
  {
    id: 'nft-analyzer',
    name: 'NFT Collection Analyzer',
    description: 'Analyze NFT collections, floor prices, and market trends',
    icon: '',
    component: ComingSoonTool,
    requiredNFT: true,
    category: 'coming-soon',
    isActive: false,
    comingSoon: true,
    likes: 23,
    userLiked: false
  },
  {
    id: 'ai-trading-bot',
    name: 'AI Trading Bot',
    description: 'Automated trading bot powered by machine learning algorithms',
    icon: '',
    component: ComingSoonTool,
    requiredNFT: true,
    category: 'coming-soon',
    isActive: false,
    comingSoon: true,
    likes: 31,
    userLiked: false
  }
];

// Helper functions
export const getToolById = (id: string): Tool | undefined => {
  return TOOLS.find(tool => tool.id === id);
};

export const getToolsByCategory = (category: string): Tool[] => {
  return TOOLS.filter(tool => tool.category === category);
};

export const getActiveTools = (): Tool[] => {
  return TOOLS.filter(tool => tool.isActive);
};

export const getCategoryById = (id: string): ToolCategory | undefined => {
  return TOOL_CATEGORIES.find(category => category.id === id);
}; 
 