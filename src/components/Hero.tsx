import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 md:px-6 py-16 md:py-20 overflow-hidden">

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-pink-100 px-4 md:px-6 py-2 md:py-3 rounded-full mb-6 md:mb-8 transform -rotate-1 hover:rotate-0 transition-transform doodle-border">
              <div className="w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs md:text-sm font-semibold text-gray-700 font-doodle-fun">Building on Hedera</span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-gray-800 mb-6 md:mb-8 leading-tight font-doodle">
              <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                DoodleVerse
              </span>
              <span className="block text-2xl md:text-4xl lg:text-5xl xl:text-6xl mt-2 md:mt-4 text-gray-700 font-semibold font-doodle-fun">
                AI-Powered Tools
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl lg:text-2xl text-gray-600 mb-8 md:mb-12 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-doodle-body">
              Revolutionary AI tools for crypto forecasting and market analysis. 
              <span className="font-semibold text-purple-600 font-doodle-fun"> Hold our NFT to unlock exclusive access.</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center lg:justify-start">
              <button className="group relative overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 md:px-10 py-4 md:py-5 rounded-xl md:rounded-2xl font-semibold text-base md:text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl font-doodle-fun doodle-border border-white">
                <span className="relative z-10">Mint NFT</span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
              
              <button className="group relative overflow-hidden bg-white border-3 border-gray-800 text-gray-800 px-8 md:px-10 py-4 md:py-5 rounded-xl md:rounded-2xl font-semibold text-base md:text-lg transition-all duration-300 hover:scale-105 hover:bg-gray-800 hover:text-white font-doodle-fun doodle-border">
                <span className="relative z-10">Join Waitlist</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 md:gap-8 mt-12 md:mt-16 pt-6 md:pt-8 border-t-4 border-gray-200 border-dashed">
              <div className="text-center">
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-purple-600 mb-1 md:mb-2 font-doodle">50</div>
                <div className="text-xs md:text-sm text-gray-600 font-medium font-doodle-body">Early Access NFTs</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-pink-600 mb-1 md:mb-2 font-doodle">95%</div>
                <div className="text-xs md:text-sm text-gray-600 font-medium font-doodle-body">AI Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-blue-600 mb-1 md:mb-2 font-doodle">24/7</div>
                <div className="text-xs md:text-sm text-gray-600 font-medium font-doodle-body">Market Analysis</div>
              </div>
            </div>
          </div>

          {/* Right Content - NFT Showcase */}
          <div className="relative mt-12 lg:mt-0">
            {/* Main NFT Display */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl md:rounded-3xl transform rotate-3 opacity-20"></div>
              <div className="relative bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl transform -rotate-1 hover:rotate-0 transition-transform duration-500 doodle-border">
                <div className="aspect-square rounded-xl md:rounded-2xl overflow-hidden">
                  <img src="/hoohles87.png" alt="Featured DoodleVerse NFT" className="w-full h-full object-cover" />
                </div>
                
                {/* NFT Info */}
                <div className="mt-4 md:mt-6">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 font-doodle">DoodleVerse #87</h3>
                  <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4 font-doodle-body">AI Forecasting Accuracy: 98.5%</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs md:text-sm font-medium text-gray-500 font-doodle-fun">Rarity: Legendary</span>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 md:w-3 md:h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-2 h-2 md:w-3 md:h-3 bg-purple-400 rounded-full"></div>
                      <div className="w-2 h-2 md:w-3 md:h-3 bg-pink-400 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-5 h-8 md:w-6 md:h-10 border-3 border-gray-400 rounded-full flex justify-center doodle-border">
          <div className="w-1 h-2 md:h-3 bg-gray-400 rounded-full mt-1 md:mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 