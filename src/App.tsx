import React, { useState, useEffect } from 'react';
import HashConnectComponent from './components/HashConnectComponent';
import WaitlistForm from './components/WaitlistForm';
import Hero from './components/Hero';
import Features from './components/Features';
import WalletConnectErrorBoundary from './components/WalletConnectErrorBoundary';
import { clearWalletConnectCache } from './utils/walletConnectUtils';

function App() {
  const [accountId, setAccountId] = useState<string>('');
  const [isConnected, setIsConnected] = useState(false);
  const [hasNFT, setHasNFT] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Clear cache on app start if there were previous issues
  useEffect(() => {
    const hasAttestationIssues = localStorage.getItem('walletconnect_attestation_issues');
    if (hasAttestationIssues) {
      console.log('Previous attestation issues detected, clearing cache...');
      clearWalletConnectCache();
      localStorage.removeItem('walletconnect_attestation_issues');
    }
  }, []);

  return (
    <WalletConnectErrorBoundary>
      <div className="min-h-screen relative overflow-hidden">
        
        {/* Modern Header */}
        <header className="relative z-50 p-4 md:p-6 lg:p-8">
          <nav className="max-w-7xl mx-auto flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center space-x-3 md:space-x-4">
              <div className="relative">
                <div className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 doodle-border bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 p-2 md:p-3 transform -rotate-3 hover:rotate-0 transition-all duration-300 hover:scale-105">
                  <div className="w-full h-full bg-white/80 rounded-lg flex items-center justify-center text-gray-600 text-xs font-bold">
                    LOGO
                  </div>
                </div>
                <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-4 h-4 md:w-6 md:h-6 bg-yellow-400 rounded-full animate-bounce"></div>
              </div>
              <div>
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 font-doodle">
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    DoodleVerse
                  </span>
                </h1>
                <p className="text-xs md:text-sm text-gray-600 font-semibold font-doodle-fun">AI-Powered Tools</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <a href="#collection" className="text-gray-700 hover:text-purple-600 font-semibold transition-colors relative group font-doodle-fun">
                Collection
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all group-hover:w-full"></span>
              </a>
              <a href="#forecast" className="text-gray-700 hover:text-blue-600 font-semibold transition-colors relative group font-doodle-fun">
                Forecast
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
              </a>
              <a href="#community" className="text-gray-700 hover:text-green-600 font-semibold transition-colors relative group font-doodle-fun">
                Community
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all group-hover:w-full"></span>
              </a>
            </div>

            {/* Desktop Wallet Connect & Mobile Menu Button */}
            <div className="flex items-center space-x-3">
              {/* Desktop Wallet Connect */}
              <div className="hidden lg:block">
                <HashConnectComponent
                  onConnect={(id: string) => {
                    setAccountId(id);
                    setIsConnected(true);
                  }}
                  onDisconnect={() => {
                    setAccountId('');
                    setIsConnected(false);
                    setHasNFT(false);
                  }}
                  accountId={accountId}
                />
              </div>

              {/* Mobile Menu Button */}
              <button 
                className="lg:hidden p-2 text-gray-700 hover:text-purple-600 transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </nav>

          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-40">
              <div className="px-4 py-6 space-y-4">
                <a 
                  href="#collection" 
                  className="block text-gray-700 hover:text-purple-600 font-semibold transition-colors py-2 font-doodle-fun"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Collection
                </a>
                <a 
                  href="#forecast" 
                  className="block text-gray-700 hover:text-blue-600 font-semibold transition-colors py-2 font-doodle-fun"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Forecast
                </a>
                <a 
                  href="#community" 
                  className="block text-gray-700 hover:text-green-600 font-semibold transition-colors py-2 font-doodle-fun"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Community
                </a>
                
                {/* Mobile Wallet Connect */}
                <div className="pt-4 border-t border-gray-200">
                  <HashConnectComponent
                    onConnect={(id: string) => {
                      setAccountId(id);
                      setIsConnected(true);
                      setMobileMenuOpen(false);
                    }}
                    onDisconnect={() => {
                      setAccountId('');
                      setIsConnected(false);
                      setHasNFT(false);
                      setMobileMenuOpen(false);
                    }}
                    accountId={accountId}
                  />
                </div>
              </div>
            </div>
          )}
        </header>

        {/* Main Content */}
        <main className="relative z-10">
          <Hero />
          <Features />
          
          {/* Waitlist Section */}
          <section id="community" className="py-16 md:py-20 lg:py-32 px-4 md:px-6 relative">
            <div className="max-w-4xl mx-auto text-center relative z-10">
              <div className="mb-12 md:mb-16">
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4 md:mb-6 font-doodle">
                  <span className="inline-block doodle-border px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 transform -rotate-1 hover:rotate-0 transition-transform">
                    Join the Waitlist
                  </span>
                </h2>
                <p className="text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-doodle-body">
                  Get early access to revolutionary AI crypto tools. Join our waitlist and be among the first 50 supporters 
                  to experience the future of crypto forecasting on Hedera.
                </p>
              </div>
              
              {/* Waitlist Card */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl md:rounded-3xl transform rotate-1"></div>
                <div className="relative bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 transform -rotate-1 hover:rotate-0 transition-transform duration-300 shadow-2xl">
                  <WaitlistForm 
                    isConnected={isConnected}
                    hasNFT={hasNFT}
                    accountId={accountId}
                  />
                </div>
              </div>

              {/* Requirements */}
              <div className="mt-8 md:mt-12 p-4 md:p-6 doodle-border bg-gradient-to-r from-blue-100 to-purple-100 transform rotate-1 hover:rotate-0 transition-transform">
                <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-3 font-doodle-fun">Requirements to Join:</h3>
                <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-8 text-gray-700 font-doodle-body">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm md:text-base font-medium">Valid Email Address</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 md:w-3 md:h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm md:text-base font-medium">Connect HashPack Wallet</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 md:w-3 md:h-3 bg-purple-500 rounded-full"></div>
                    <span className="text-sm md:text-base font-medium">Early Supporter Interest</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="relative z-10 py-12 md:py-16 px-4 md:px-6 bg-gradient-to-t from-gray-900 to-gray-800 text-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 md:mb-12">
              {/* Brand */}
              <div className="md:col-span-2 lg:col-span-2">
                <div className="flex items-center space-x-3 md:space-x-4 mb-4 md:mb-6">
                  <div className="w-10 h-10 md:w-12 md:h-12 doodle-border bg-gradient-to-br from-purple-400 to-pink-400 p-2 transform rotate-12">
                    <div className="w-full h-full bg-white/90 rounded"></div>
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-doodle">
                      DoodleVerse
                    </h3>
                    <p className="text-gray-400 text-xs md:text-sm font-doodle-body">AI-Powered Crypto Tools</p>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed max-w-md text-sm md:text-base font-doodle-body">
                  Revolutionary AI tools for crypto forecasting and market analysis built on the Hedera network. 
                  Join our community of early supporters and unlock the future of trading.
                </p>
              </div>

              {/* Links */}
              <div>
                <h4 className="text-base md:text-lg font-bold mb-3 md:mb-4 font-doodle-fun">Collection</h4>
                <ul className="space-y-2 text-gray-300">
                  <li><a href="#" className="hover:text-purple-400 transition-colors text-sm md:text-base font-doodle-body">Explore NFTs</a></li>
                  <li><a href="#" className="hover:text-purple-400 transition-colors text-sm md:text-base font-doodle-body">Rarity Guide</a></li>
                  <li><a href="#" className="hover:text-purple-400 transition-colors text-sm md:text-base font-doodle-body">Marketplace</a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-base md:text-lg font-bold mb-3 md:mb-4 font-doodle-fun">Community</h4>
                <ul className="space-y-2 text-gray-300">
                  <li><a href="#" className="hover:text-purple-400 transition-colors text-sm md:text-base font-doodle-body">Discord</a></li>
                  <li><a href="#" className="hover:text-purple-400 transition-colors text-sm md:text-base font-doodle-body">Twitter</a></li>
                  <li><a href="#" className="hover:text-purple-400 transition-colors text-sm md:text-base font-doodle-body">Support</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-700 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-xs md:text-sm font-doodle-body">© 2024 DoodleVerse. All rights reserved.</p>
              <div className="flex space-x-4 md:space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-xs md:text-sm font-doodle-body">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-xs md:text-sm font-doodle-body">Terms of Service</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </WalletConnectErrorBoundary>
  );
}

export default App; 