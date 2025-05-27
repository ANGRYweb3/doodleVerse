import React from 'react';

interface HeroProps {
  onLaunchApp: () => void;
  onConnectWallet: () => void;
  isConnected: boolean;
  hasNFT: boolean;
}

const Hero: React.FC<HeroProps> = ({ onLaunchApp, onConnectWallet, isConnected, hasNFT }) => {
  return (
    <div>
      {/* Main Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 md:px-6 py-16 md:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-pink-100 px-4 md:px-6 py-2 md:py-3 rounded-full mb-6 md:mb-8 transform -rotate-1 hover:rotate-0 transition-transform doodle-border">
                <div className="w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs md:text-sm font-semibold text-gray-700 font-doodle-fun">Live on Hedera</span>
              </div>

              {/* Main Title */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-gray-800 mb-6 md:mb-8 leading-tight font-doodle">
                <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                  DoodleVerse
                </span>
                <span className="block text-2xl md:text-4xl lg:text-5xl xl:text-6xl mt-2 md:mt-4 text-gray-700 font-semibold font-doodle-fun">
                  AI Trading Toolkit
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-lg md:text-xl lg:text-2xl text-gray-600 mb-8 md:mb-12 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-doodle-body">
                AI web3 tools for crypto ecosystem & more. 
                <span className="font-semibold text-purple-600 font-doodle-fun"> Hold our NFT to unlock unlimited access.</span>
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center lg:justify-start">
                <button className="group relative overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 md:px-10 py-4 md:py-5 rounded-xl md:rounded-2xl font-semibold text-base md:text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl font-doodle-fun doodle-border border-white">
                  <span className="relative z-10">
                    {hasNFT ? 'Get More NFT' : 'Mint Early Supporters NFT'}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
                
                <button 
                  onClick={!isConnected ? onConnectWallet : onLaunchApp}
                  disabled={isConnected && !hasNFT}
                  className={`group relative overflow-hidden px-8 md:px-10 py-4 md:py-5 rounded-xl md:rounded-2xl font-semibold text-base md:text-lg transition-all duration-300 hover:scale-105 font-doodle-fun doodle-border ${
                    !isConnected 
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:shadow-2xl border-white'
                      : isConnected && hasNFT 
                      ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white hover:shadow-2xl border-white' 
                      : 'bg-gray-300 text-gray-600 cursor-not-allowed border-gray-400'
                  }`}
                >
                  <span className="relative z-10">
                    {!isConnected ? 'Connect to Launch' : !hasNFT ? 'NFT Required' : 'Launch App'}
                  </span>
                  {!isConnected && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  )}
                  {isConnected && hasNFT && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  )}
                </button>
              </div>

              {/* Access Status */}
              <div className="mt-8 md:mt-12 p-4 md:p-6 doodle-border bg-gradient-to-r from-blue-100 to-purple-100 transform rotate-1 hover:rotate-0 transition-transform">
                <div className="flex items-center justify-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                    <span className="text-sm font-medium text-gray-700 font-doodle-body">
                      {isConnected ? 'Wallet Connected' : 'Wallet Disconnected'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${hasNFT ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                    <span className="text-sm font-medium text-gray-700 font-doodle-body">
                      {hasNFT ? 'NFT Verified' : 'NFT Required'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 md:gap-8 mt-12 md:mt-16 pt-6 md:pt-8 border-t-4 border-gray-200 border-dashed">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-purple-600 mb-1 md:mb-2 font-doodle">50</div>
                  <div className="text-xs md:text-sm text-gray-600 font-medium font-doodle-body">Early Supporters NFTs</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-pink-600 mb-1 md:mb-2 font-doodle">∞</div>
                  <div className="text-xs md:text-sm text-gray-600 font-medium font-doodle-body">Usage</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-blue-600 mb-1 md:mb-2 font-doodle">24/7</div>
                  <div className="text-xs md:text-sm text-gray-600 font-medium font-doodle-body">Access</div>
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
                    <img src="/DoodleVerse_ES_22.webp" alt="Featured DoodleVerse NFT" className="w-full h-full object-cover" />
                  </div>
                  
                  {/* NFT Info */}
                  <div className="mt-4 md:mt-6">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 font-doodle">DoodleVerse ES #44</h3>
                    
                    {/* Access Badges */}
                    <div className="flex flex-wrap gap-2 mb-3 md:mb-4">
                      {/* Unlimited Access Badge */}
                      <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-100 to-blue-100 px-3 py-1 rounded-full doodle-border border-green-200">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs font-semibold text-green-700 font-doodle-fun">Unlimited Access</span>
                      </div>
                      
                      {/* First Priority Badge */}
                      <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-blue-100 px-3 py-1 rounded-full doodle-border border-purple-200">
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                        <span className="text-xs font-semibold text-purple-700 font-doodle-fun">First Priority</span>
                      </div>
                      
                      {/* Early Access Badge */}
                      <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-100 to-yellow-100 px-3 py-1 rounded-full doodle-border border-orange-200">
                        <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                        <span className="text-xs font-semibold text-orange-700 font-doodle-fun">Early Access</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs md:text-sm font-medium text-gray-500 font-doodle-fun">Early Supporters Edition</span>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 md:w-3 md:h-3 bg-green-400 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 md:w-3 md:h-3 bg-blue-400 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 md:w-3 md:h-3 bg-purple-400 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                    
                    {/* Explore Button */}
                    <div className="mt-4 text-center">
                      <button 
                        onClick={() => {
                          // หา element ที่มีข้อความ "Early Supporters Edition" ใน h2
                          const headings = document.querySelectorAll('h2');
                          let targetElement: Element | null = null;
                          
                          headings.forEach(heading => {
                            if (heading.textContent?.includes('Early Supporters Edition')) {
                              targetElement = heading;
                            }
                          });
                          
                          if (targetElement) {
                            (targetElement as HTMLElement).scrollIntoView({ 
                              behavior: 'smooth',
                              block: 'start'
                            });
                          }
                        }}
                        className="group inline-flex items-center space-x-2 text-purple-600 hover:text-purple-700 transition-colors font-doodle-fun font-semibold text-sm"
                      >
                        <span>Explore</span>
                        <svg 
                          className="w-4 h-4 transform group-hover:translate-y-1 transition-transform animate-bounce" 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
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

      {/* About Section */}
      <section id="about" className="relative py-16 px-4 md:px-6 mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl doodle-border transform -rotate-1 hover:rotate-0 transition-transform duration-300">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 font-doodle">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                About DoodleVerse
              </span>
            </h2>
            
            <div className="space-y-6 text-gray-700 font-doodle-body">
              <p className="text-lg leading-relaxed">
                DoodleVerse is a suite of AI-powered tools crafted by a team passionate about making advanced technology accessible to everyone in the crypto space.
              </p>
              
              <p className="text-lg leading-relaxed">
                With backgrounds in freelance development and experience building automation solutions and machine learning models for credit unions, consulting firms, and various businesses, we not only create these tools—we also use and improve them daily to meet our own needs.
              </p>
              
              <p className="text-lg leading-relaxed">
                Now, we're excited to bring these tools to the Hedera and wider crypto ecosystem. As HBAR investors ourselves, we care deeply about helping the community grow and thrive. We believe these tools can bring real value to everyone involved.
              </p>
              
              <p className="text-lg leading-relaxed">
                Every tool you see here is something we actively use day-to-day. Initially, releasing them through NFTs wasn't part of our plan—but as we began integrating real-time crypto data, the costs of APIs and infrastructure for large-scale data processing quickly added up. As you may know, the more data we have, the more accurate our models become.
              </p>
              
              <p className="text-lg leading-relaxed">
                The DoodleVerse NFT collection helps us cover these ongoing expenses and allows us to keep building toward our vision of a thriving, supportive community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section id="roadmap" className="relative py-16 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-doodle">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Roadmap
            </span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Phase 1 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg doodle-border transform rotate-1 hover:rotate-0 transition-transform">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold font-doodle">
                  1
                </div>
                <h3 className="text-xl font-bold ml-4 font-doodle">Launch Phase</h3>
              </div>
              <ul className="space-y-2 text-gray-700 font-doodle-body">
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">✓</span>
                  <span className="line-through text-gray-500">Release NFT Collection : Early Supporters (50 NFTs)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">✓</span>
                  <span className="line-through text-gray-500">Build MVP Platform</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Deploy Core Trading Tools
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-yellow-500">✨</span>
                  Sneak in & use tools for Early Supporters
                </li>
              </ul>
            </div>

            {/* Phase 2 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg doodle-border transform -rotate-1 hover:rotate-0 transition-transform opacity-80">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center text-white font-bold font-doodle">
                  2
                </div>
                <h3 className="text-xl font-bold ml-4 font-doodle text-gray-600">Community Building</h3>
              </div>
              <ul className="space-y-2 text-gray-600 font-doodle-body">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Launch Discord Server
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Establish X (Twitter) Presence
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Create Brand Identity
                </li>
              </ul>
            </div>

            {/* Phase 3 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg doodle-border transform rotate-1 hover:rotate-0 transition-transform opacity-80">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center text-white font-bold font-doodle">
                  3
                </div>
                <h3 className="text-xl font-bold ml-4 font-doodle text-gray-600">Expansion</h3>
              </div>
              <ul className="space-y-2 text-gray-600 font-doodle-body">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Add Advanced Trading Tools
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Grow Community
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Implement User Feedback
                </li>
              </ul>
            </div>

            {/* Phase 4 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg doodle-border transform -rotate-1 hover:rotate-0 transition-transform opacity-80">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center text-white font-bold font-doodle">
                  4
                </div>
                <h3 className="text-xl font-bold ml-4 font-doodle text-gray-600">Public Launch</h3>
              </div>
              <ul className="space-y-2 text-gray-600 font-doodle-body">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Open Platform to Public
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Monthly NFT Subscriptions
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Launch Our Own Token
                </li>
              </ul>
              <p className="text-xs text-gray-500 mt-3 italic font-doodle-body">
                *Subject to further evaluation and community feedback
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero; 