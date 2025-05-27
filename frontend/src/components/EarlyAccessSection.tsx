import React from 'react';

const EarlyAccessSection: React.FC = () => {
  return (
    <section className="py-16 md:py-20 lg:py-32 px-4 md:px-6 relative overflow-hidden bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 md:left-20 w-32 h-32 md:w-48 md:h-48 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full opacity-20 animate-float"></div>
        <div className="absolute bottom-10 right-10 md:right-20 w-24 h-24 md:w-36 md:h-36 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full opacity-20 animate-bounce-slow"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center space-x-2 md:space-x-3 bg-gradient-to-r from-yellow-100 to-orange-100 px-4 md:px-6 py-2 md:py-3 rounded-full mb-6 md:mb-8 doodle-border">
            <div className="w-2 h-2 md:w-3 md:h-3 bg-yellow-500 rounded-full animate-pulse"></div>
            <span className="text-xs md:text-sm font-semibold text-yellow-700 font-doodle-fun">Limited Edition</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-800 mb-6 md:mb-8 font-doodle">
            <span className="bg-gradient-to-r from-yellow-600 via-orange-600 to-pink-600 bg-clip-text text-transparent">
              Early Supporters Edition
            </span>
          </h2>
          
          <p className="text-lg md:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-doodle-body">
            Only <span className="font-bold text-orange-600">50 NFTs</span> in this exclusive early access collection. 
            <span className="font-semibold text-purple-600"> DoodleVerse #1-50 grants unlimited access to everything on our platform.</span>
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16 md:mb-20">
          
          {/* Left Content - NFT Showcase */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-2xl md:rounded-3xl transform -rotate-3 opacity-20"></div>
            <div className="relative bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500 doodle-border">
              <div className="aspect-square rounded-xl md:rounded-2xl overflow-hidden bg-gray-100 flex items-center justify-center">
                <img src="/DoodleVerse.gif" alt="Featured DoodleVerse Early Supporters NFT GIF" className="w-full h-full object-contain" />
              </div>
              
              {/* NFT Info */}
              <div className="mt-4 md:mt-6">
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 font-doodle">Featured Early Supporters NFT</h3>
                <p className="text-sm md:text-base text-gray-600 mb-4 font-doodle-body">Animated GIF showcasing an Early Supporters NFT</p>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-yellow-50 rounded-lg doodle-border border-yellow-200">
                    <div className="text-lg font-bold text-yellow-600 font-doodle">50</div>
                    <div className="text-xs text-gray-600 font-doodle-body">Total Supply</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg doodle-border border-orange-200">
                    <div className="text-lg font-bold text-orange-600 font-doodle">∞</div>
                    <div className="text-xs text-gray-600 font-doodle-body">Tool Access</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs md:text-sm font-medium text-gray-500 font-doodle-fun">Early Supporters Edition</span>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 md:w-3 md:h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 md:w-3 md:h-3 bg-orange-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 md:w-3 md:h-3 bg-pink-400 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Benefits */}
          <div>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-6 md:mb-8 font-doodle">
              Why Early Supporters is <span className="text-orange-600">Special</span>
            </h3>
            
            <div className="space-y-6">
              {/* Benefit 1 */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0 doodle-border">
                  <span className="text-white font-bold text-xl font-doodle">1</span>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-800 mb-2 font-doodle">Unlimited Access Forever</h4>
                  <p className="text-gray-600 font-doodle-body">Get access to all current and future AI tools on our platform. No restrictions, no limits.</p>
                </div>
              </div>

              {/* Benefit 2 */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0 doodle-border">
                  <span className="text-white font-bold text-xl font-doodle">2</span>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-800 mb-2 font-doodle">Exclusive Early Access</h4>
                  <p className="text-gray-600 font-doodle-body">Be the first to try new AI tools before they're released to other collections.</p>
                </div>
              </div>

              {/* Benefit 3 */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0 doodle-border">
                  <span className="text-white font-bold text-xl font-doodle">3</span>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-800 mb-2 font-doodle">Future Collections Won't Have This</h4>
                  <p className="text-gray-600 font-doodle-body">Later NFT collections will have limited access. Only #1-50 gets everything forever.</p>
                </div>
              </div>

              {/* Benefit 4 */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0 doodle-border">
                  <span className="text-white font-bold text-xl font-doodle">4</span>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-800 mb-2 font-doodle">Treated as Team Members</h4>
                  <p className="text-gray-600 font-doodle-body">Early Supporters will be prioritized for future revenue sharing from subscriptions/NFTs and any token airdrops as valued team members.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl md:rounded-3xl transform rotate-2 opacity-20"></div>
            <div className="relative bg-white rounded-2xl md:rounded-3xl p-8 md:p-12 shadow-2xl transform -rotate-1 hover:rotate-0 transition-transform doodle-border">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 md:mb-6 font-doodle">
                Don't Miss Out on <span className="text-orange-600">Early Access</span>
              </h3>
              <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8 max-w-2xl mx-auto font-doodle-body">
                Only 50 NFTs available. Once they're gone, you'll have to wait for future collections with limited access.
              </p>
              
              {/* Mint Button */}
              <button className="group relative overflow-hidden bg-gradient-to-r from-yellow-500 via-orange-500 to-pink-500 text-white px-10 md:px-12 py-4 md:py-5 rounded-xl md:rounded-2xl font-bold text-lg md:text-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl font-doodle-fun doodle-border border-white">
                <span className="relative z-10">Mint Early Supporters NFT Now</span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
              
              {/* Urgency Text */}
              <div className="mt-6 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl doodle-border border-red-200">
                <p className="text-sm md:text-base text-red-700 font-semibold font-doodle-fun">
                  ⚡ Limited Time: Early Supporters Edition Only
                </p>
                <p className="text-xs md:text-sm text-red-600 mt-1 font-doodle-body">
                  Future collections will not include unlimited access to all tools
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EarlyAccessSection; 