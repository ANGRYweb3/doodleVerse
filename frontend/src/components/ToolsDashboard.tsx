import React, { useState } from 'react';
import { TOOLS, TOOL_CATEGORIES, getToolsByCategory } from '../config/tools';
import { Tool } from '../types/tools';

interface ToolsDashboardProps {
  onSelectTool: (toolId: string) => void;
  accountId: string;
  hasNFT?: boolean;
  nftCount?: number;
}

const ToolsDashboard: React.FC<ToolsDashboardProps> = ({ onSelectTool, accountId, hasNFT = false, nftCount = 0 }) => {
  const [tools, setTools] = useState(TOOLS);
  const categories = TOOL_CATEGORIES;

  // Debug logging
  console.log('ToolsDashboard Debug:', {
    toolsCount: tools.length,
    categoriesCount: categories.length,
    tools: tools.map(t => ({ id: t.id, name: t.name, category: t.category, isActive: t.isActive })),
    categories: categories.map(c => ({ id: c.id, name: c.name })),
    accountId,
    hasNFT
  });

  // Handle like functionality
  const handleLike = (toolId: string) => {
    if (!accountId) {
      alert('Please connect your wallet to like tools');
      return;
    }

    setTools(prevTools => 
      prevTools.map(tool => {
        if (tool.id === toolId) {
          const newUserLiked = !tool.userLiked;
          const newLikes = newUserLiked 
            ? (tool.likes || 0) + 1 
            : Math.max((tool.likes || 0) - 1, 0);
          
          return {
            ...tool,
            likes: newLikes,
            userLiked: newUserLiked
          };
        }
        return tool;
      })
    );

    // TODO: Send to backend API when implemented
    const actionType = tools.find(t => t.id === toolId)?.userLiked ? 'removed vote from' : 'voted for';
    const voteType = tools.find(t => t.id === toolId)?.category === 'ideas' ? 'upvote' : 'star rating';
    console.log(`User ${accountId} ${actionType} tool: ${toolId} (${voteType})`);
  };

  const getStatusColor = (tool: Tool) => {
    if (tool.isActive) return 'bg-green-100 text-green-700 border-green-200';
    if (tool.comingSoon) return 'bg-gray-100 text-gray-600 border-gray-200';
    return 'bg-yellow-100 text-yellow-700 border-yellow-200';
  };

  const getStatusText = (tool: Tool) => {
    if (tool.isActive) return 'Available';
    if (tool.comingSoon) return 'Coming Soon';
    return 'Beta';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 font-doodle">
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  AI Tools Dashboard
                </span>
              </h1>
              <p className="text-gray-600 font-doodle-body mt-2">
                Complete suite of AI-powered tools for Hedera & crypto ecosystem
              </p>
            </div>
            
            {/* User Info */}
            <div className="bg-white rounded-xl p-4 shadow-lg doodle-border">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  hasNFT ? 'bg-gradient-to-r from-green-400 to-blue-500' : 'bg-gradient-to-r from-gray-400 to-gray-500'
                }`}>
                  <span className="text-white font-bold text-sm">{hasNFT ? '✓' : '👤'}</span>
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-800 font-doodle">
                    {hasNFT ? 'NFT Verified' : 'Wallet Connected'}
                  </div>
                  <div className="text-xs text-gray-600">
                    {hasNFT ? `You hold ${nftCount} NFT${nftCount !== 1 ? 's' : ''}` : 'No NFTs found'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl p-4 shadow-lg doodle-border">
              <div className="text-2xl font-bold text-purple-600 font-doodle">
                {tools.filter(t => t.isActive).length}
              </div>
              <div className="text-sm text-gray-600 font-doodle-body">Available Tools</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-lg doodle-border">
              <div className="text-2xl font-bold text-yellow-600 font-doodle">
                {tools.filter(t => t.comingSoon).length}
              </div>
              <div className="text-sm text-gray-600 font-doodle-body">Coming Soon</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-lg doodle-border">
              <div className="text-2xl font-bold text-blue-600 font-doodle">
                {categories.length}
              </div>
              <div className="text-sm text-gray-600 font-doodle-body">Categories</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-lg doodle-border">
              <div className="text-2xl font-bold text-green-600 font-doodle">∞</div>
              <div className="text-sm text-gray-600 font-doodle-body">Usage Limit</div>
            </div>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="space-y-8">
          {tools.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-4xl font-bold mx-auto mb-6">
                🚀
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4 font-doodle">
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Tools Coming Soon!
                </span>
              </h2>
              <p className="text-gray-600 text-lg font-doodle-body max-w-2xl mx-auto">
                We're working hard to bring you amazing AI-powered trading tools. 
                Stay tuned for updates and be the first to try our new features!
              </p>
            </div>
          ) : (
            categories.map((category) => (
              <div key={category.id}>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 font-doodle">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {category.icon} {category.name}
                  </span>
                </h2>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tools.filter(tool => tool.category === category.id).map((tool) => (
                      <div key={tool.id} className="relative group">
                        <div className="relative bg-white rounded-2xl p-6 shadow-xl transform -rotate-1 group-hover:rotate-0 transition-all duration-300 hover:scale-105 doodle-border">
                          
                          {/* Floating Vote Button - Doodle Style */}
                          {tool.category !== 'coming-soon' && (
                            <button
                              onClick={() => handleLike(tool.id)}
                              className={`absolute -top-2 -right-2 z-10 transform transition-all duration-200 hover:scale-110 focus:outline-none active:outline-none focus:ring-0 active:ring-0 ${
                                tool.userLiked ? 'rotate-12' : '-rotate-6'
                              }`}
                            >
                              <div className={`relative p-2 doodle-border transform transition-all duration-200 focus:outline-none active:outline-none focus:ring-0 active:ring-0 ${
                                tool.userLiked 
                                  ? 'bg-gradient-to-br from-yellow-100 to-orange-100 border-yellow-300' 
                                  : 'bg-gradient-to-br from-white to-gray-50 border-gray-300'
                              }`}>
                                <span className="text-2xl block transform hover:scale-125 transition-transform focus:outline-none active:outline-none">
                                  {tool.category === 'ideas' 
                                    ? (tool.userLiked ? '👍' : '👍🏻') 
                                    : (tool.userLiked ? '⭐' : '☆')
                                  }
                                </span>
                                
                                {/* Doodle-style counter */}
                                {(tool.likes || 0) > 0 && (
                                  <div className="absolute -bottom-1 -right-1 transform rotate-12 focus:outline-none active:outline-none">
                                    <div className="bg-blue-300 border-2 border-blue-600 rounded-full w-6 h-6 flex items-center justify-center doodle-border focus:outline-none active:outline-none">
                                      <span className="text-xs font-bold text-blue-800 font-doodle focus:outline-none active:outline-none">
                                        {tool.likes || 0}
                                      </span>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </button>
                          )}

                          {/* Tool Header */}
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold font-doodle">
                                {tool.icon}
                              </div>
                              <div>
                                <h3 className="text-lg font-bold text-gray-800 font-doodle">{tool.name}</h3>
                              </div>
                            </div>
                            
                            {/* Status Badge */}
                            <div className={`px-3 py-1 rounded-full text-xs font-semibold border-2 ${getStatusColor(tool)} font-doodle-fun`}>
                              {getStatusText(tool)}
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-gray-600 text-sm leading-relaxed mb-6 font-doodle-body">
                            {tool.description}
                          </p>

                          {/* Action Button */}
                          <button
                            onClick={() => {
                              if (tool.isActive) {
                                // Check if tool requires NFT
                                if (tool.requiredNFT && !hasNFT) {
                                  alert('This tool requires NFT verification. Please ensure you hold the required NFT.');
                                  return;
                                }
                                onSelectTool(tool.id);
                              }
                            }}
                            disabled={!tool.isActive}
                            className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 font-doodle-fun doodle-border focus:outline-none ${
                              tool.isActive
                                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-105 hover:shadow-lg border-white'
                                : tool.comingSoon
                                ? 'bg-gray-200 text-gray-500 cursor-not-allowed border-gray-300'
                                : 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white hover:scale-105 hover:shadow-lg border-white'
                            }`}
                          >
                            {tool.isActive ? (tool.requiredNFT && !hasNFT ? 'Requires NFT' : 'Launch Tool') : 
                             tool.comingSoon ? 'Coming Soon' : 
                             'Try Beta'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>

        {/* Footer Info */}
        <div className="mt-12 bg-white rounded-2xl p-6 shadow-lg doodle-border">
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-3 font-doodle">Need More Tools?</h3>
            <p className="text-gray-600 mb-4 font-doodle-body">
              We're constantly adding new AI tools to help you trade smarter. 
              Join our community to get early access and suggest new features.
            </p>
            <div className="flex justify-center space-x-4">
              <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-xl font-semibold hover:scale-105 transition-transform font-doodle-fun doodle-border border-white">
                Join Discord
              </button>
              <button className="bg-white border-2 border-gray-300 text-gray-700 px-6 py-2 rounded-xl font-semibold hover:scale-105 transition-transform font-doodle-fun doodle-border">
                Request Feature
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolsDashboard; 