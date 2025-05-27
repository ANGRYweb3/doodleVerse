// WalletConnect configuration to prevent attestation errors
export const walletConnectConfig = {
  // Disable attestation verification to prevent 400 errors
  disableProviderPing: true,
  
  // Use alternative relay endpoints for better stability
  relayUrl: 'wss://relay.walletconnect.org',
  
  // Reduce connection timeout to prevent hanging
  connectionTimeout: 10000,
  
  // Retry configuration
  maxRetries: 3,
  retryDelay: 2000,
  
  // Metadata configuration
  metadata: {
    name: "Hoohles NFT",
    description: "AI Forecasting Model Access",
    url: typeof window !== 'undefined' ? window.location.origin : 'https://localhost:3000',
    icons: [typeof window !== 'undefined' ? window.location.origin + "/hoohles48.png" : '/hoohles48.png']
  }
};

// Helper function to handle attestation errors
export const handleAttestationError = (error: any) => {
  console.warn('Attestation error detected:', error);
  
  // Check if it's a 400 attestation error
  if (error?.message?.includes('attestation') || 
      error?.message?.includes('400') ||
      error?.status === 400) {
    
    console.log('Attempting to recover from attestation error...');
    
    // Clear any cached WalletConnect data
    try {
      localStorage.removeItem('walletconnect');
      localStorage.removeItem('wc@2:client:0.3//session');
      localStorage.removeItem('wc@2:core:0.3//keychain');
      localStorage.removeItem('wc@2:core:0.3//messages');
    } catch (e) {
      console.warn('Could not clear localStorage:', e);
    }
    
    return true; // Indicates this was an attestation error
  }
  
  return false; // Not an attestation error
};

// Debounce utility to prevent rapid connection attempts
export const createDebounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}; 