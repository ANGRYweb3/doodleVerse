import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import HashConnectComponent from './components/HashConnectComponent';
import Hero from './components/Hero';
import EarlyAccessSection from './components/EarlyAccessSection';
import ToolsDashboard from './components/ToolsDashboard';
import ToolLoader from './components/common/ToolLoader';
import TestHederaPortfolio from './components/TestHederaPortfolio';
import WalletConnectErrorBoundary from './components/WalletConnectErrorBoundary';
import { clearWalletConnectCache } from './utils/walletConnectUtils';
import { AppView } from './types/tools';

// Lazy load Privacy and Terms components
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./components/TermsOfService'));

function App() {
  const [accountId, setAccountId] = useState<string>('');
  const [isConnected, setIsConnected] = useState(false);
  const [hasNFT, setHasNFT] = useState(false);
  const [nftCount, setNftCount] = useState(0);
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [currentToolId, setCurrentToolId] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showTest, setShowTest] = useState(false);
  const connectWalletRef = useRef<(() => void) | null>(null);

  // Clear cache on app start if there were previous issues
  useEffect(() => {
    const hasAttestationIssues = localStorage.getItem('walletconnect_attestation_issues');
    if (hasAttestationIssues) {
      console.log('Previous attestation issues detected, clearing cache...');
      clearWalletConnectCache();
      localStorage.removeItem('walletconnect_attestation_issues');
    }
  }, []);

  // NFT verification with backend API
  useEffect(() => {
    const verifyNFT = async () => {
      if (isConnected && accountId) {
        try {
          const response = await fetch(`http://localhost:3001/api/verify-nft/${accountId}`);
          if (response.ok) {
            const data = await response.json();
            setHasNFT(data.hasNFT);
            setNftCount(data.nftCount);
            console.log(`🎨 NFT Verification: ${data.hasNFT ? '✅ Verified' : '❌ Not Found'}`);
          } else {
            setHasNFT(false);
            setNftCount(0);
          }
        } catch (error) {
          console.error('NFT verification failed:', error);
          setHasNFT(false);
          setNftCount(0);
        }
      } else {
        setHasNFT(false);
        setNftCount(0);
      }
    };

    verifyNFT();
  }, [isConnected, accountId]);

  const handleLaunchApp = () => {
    if (isConnected) {
      setCurrentView('dashboard');
    }
  };

  const handleSelectTool = (toolId: string) => {
    setCurrentToolId(toolId);
    setCurrentView('tool');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
  };

  const handleConnectWallet = () => {
    if (connectWalletRef.current) {
      connectWalletRef.current();
    }
  };

  const handlePrivacyPolicy = () => {
    setCurrentView('privacy');
  };

  const handleTermsOfService = () => {
    setCurrentView('terms');
  };

  const renderCurrentView = () => {
    if (showTest) {
      return <TestHederaPortfolio />;
    }
    
    return (
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-xl font-doodle">Loading...</div>}>
        {(() => {
          switch (currentView) {
            case 'dashboard':
              return (
                <ToolsDashboard 
                  onSelectTool={handleSelectTool}
                  accountId={accountId}
                  hasNFT={hasNFT}
                  nftCount={nftCount}
                />
              );
            case 'tool':
              return (
                <ToolLoader 
                  toolId={currentToolId}
                  onBack={handleBackToDashboard}
                  accountId={accountId}
                />
              );
            case 'privacy':
              return <PrivacyPolicy />;
            case 'terms':
              return <TermsOfService />;
            default:
              return (
                <>
                  <Hero 
                    onLaunchApp={handleLaunchApp}
                    onConnectWallet={handleConnectWallet}
                    isConnected={isConnected}
                    hasNFT={hasNFT}
                  />
                  <EarlyAccessSection />
                </>
              );
          }
        })()}
      </Suspense>
    );
  };

  return (
    <WalletConnectErrorBoundary>
      <div className="min-h-screen relative overflow-hidden">
      
        {/* Modern Header */}
        <header className="relative z-50 p-4 md:p-6 lg:p-8">
          <nav className="max-w-7xl mx-auto flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center space-x-3 md:space-x-4">
              <button onClick={handleBackToHome} className="flex items-center space-x-3 md:space-x-4 hover:scale-105 transition-transform">
                <div className="relative">
                  <div className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 doodle-border bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 p-2 md:p-3 transform -rotate-3 hover:rotate-0 transition-all duration-300">
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
                  <p className="text-xs md:text-sm text-gray-600 font-semibold font-doodle-fun">AI Crypto Tools</p>
                </div>
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {currentView !== 'home' && (
                <>
                  <button 
                    onClick={handleBackToHome}
                    className="text-gray-700 hover:text-purple-600 font-semibold transition-colors relative group font-doodle-fun"
                  >
                    Home
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all group-hover:w-full"></span>
                  </button>
                  <button 
                    onClick={handleBackToDashboard}
                    className="text-gray-700 hover:text-blue-600 font-semibold transition-colors relative group font-doodle-fun"
                  >
                    Dashboard
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
                  </button>
                </>
              )}
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
            setNftCount(0);
            setCurrentView('home');
          }}
          accountId={accountId}
          onConnectWalletRef={(connectFn) => {
            connectWalletRef.current = connectFn;
          }}
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
                {currentView !== 'home' && (
                  <>
                    <button 
                      onClick={() => {
                        handleBackToHome();
                        setMobileMenuOpen(false);
                      }}
                      className="block w-full text-left text-gray-700 hover:text-purple-600 font-semibold transition-colors py-2 font-doodle-fun"
                    >
                      Home
                    </button>
                    <button 
                      onClick={() => {
                        handleBackToDashboard();
                        setMobileMenuOpen(false);
                      }}
                      className="block w-full text-left text-gray-700 hover:text-blue-600 font-semibold transition-colors py-2 font-doodle-fun"
                    >
                      Dashboard
                    </button>
                  </>
                )}
                
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
                      setNftCount(0);
                      setCurrentView('home');
                      setMobileMenuOpen(false);
                    }}
                    accountId={accountId}
                    onConnectWalletRef={(connectFn) => {
                      connectWalletRef.current = connectFn;
                    }}
                  />
                </div>
              </div>
            </div>
          )}
      </header>

      {/* Main Content */}
        <main className="relative z-10">
          {renderCurrentView()}
      </main>

      {/* Footer - Only show on home page */}
        {currentView === 'home' && (
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
                      <p className="text-gray-400 text-xs md:text-sm font-doodle-body">AI Crypto Tools</p>
                    </div>
                  </div>
                  <p className="text-gray-300 leading-relaxed max-w-md text-sm md:text-base font-doodle-body">
                    AI web3 tools for crypto ecosystem & more. 
                    Hold our NFT to unlock unlimited access.
                  </p>
                </div>

                {/* Links */}
                <div>
                  <h4 className="text-base md:text-lg font-bold mb-3 md:mb-4 font-doodle-fun">Tools</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li><button className="hover:text-purple-400 transition-colors text-sm md:text-base font-doodle-body text-left focus:outline-none focus:ring-0">Price Forecasting</button></li>
                    <li><button className="hover:text-purple-400 transition-colors text-sm md:text-base font-doodle-body text-left focus:outline-none focus:ring-0">Portfolio Optimizer</button></li>
                    <li><button className="hover:text-purple-400 transition-colors text-sm md:text-base font-doodle-body text-left focus:outline-none focus:ring-0">Risk Analyzer</button></li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-base md:text-lg font-bold mb-3 md:mb-4 font-doodle-fun">Community</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li><button className="hover:text-purple-400 transition-colors text-sm md:text-base font-doodle-body text-left focus:outline-none focus:ring-0">Discord</button></li>
                    <li><button className="hover:text-purple-400 transition-colors text-sm md:text-base font-doodle-body text-left focus:outline-none focus:ring-0">Twitter</button></li>
                    <li><button className="hover:text-purple-400 transition-colors text-sm md:text-base font-doodle-body text-left focus:outline-none focus:ring-0">Support</button></li>
                  </ul>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center">
                <p className="text-gray-400 text-xs md:text-sm font-doodle-body">© 2025 DoodleVerse. All rights reserved.</p>
                {/* <div className="flex space-x-4 md:space-x-6 mt-4 md:mt-0">
                  <button onClick={handlePrivacyPolicy} className="text-gray-400 hover:text-white transition-colors text-xs md:text-sm font-doodle-body">Privacy Policy</button>
                  <button onClick={handleTermsOfService} className="text-gray-400 hover:text-white transition-colors text-xs md:text-sm font-doodle-body">Terms of Service</button>
                </div> */}
              </div>
            </div>
          </footer>
        )}

      </div>
    </WalletConnectErrorBoundary>
  );
}

export default App; 