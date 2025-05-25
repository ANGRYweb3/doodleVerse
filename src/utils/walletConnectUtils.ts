// Utility functions for managing WalletConnect cache and attestation issues

/**
 * Clear all WalletConnect related data from localStorage
 * This helps resolve attestation errors and connection issues
 */
export const clearWalletConnectCache = (): void => {
  try {
    const keysToRemove = [
      'walletconnect',
      'wc@2:client:0.3//session',
      'wc@2:core:0.3//keychain', 
      'wc@2:core:0.3//messages',
      'wc@2:core:0.3//subscription',
      'wc@2:core:0.3//history',
      'wc@2:core:0.3//expirer',
      'wc@2:universal_provider:/optionalNamespaces',
      'wc@2:universal_provider:/namespaces',
      'wc@2:ethereum_provider:/chainId',
      'wc@2:ethereum_provider:/accounts'
    ];

    keysToRemove.forEach(key => {
      localStorage.removeItem(key);
    });

    // Also clear any keys that start with 'wc@2:'
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('wc@2:') || key.startsWith('walletconnect')) {
        localStorage.removeItem(key);
      }
    });

    console.log('WalletConnect cache cleared successfully');
  } catch (error) {
    console.warn('Error clearing WalletConnect cache:', error);
  }
};

/**
 * Check if the current error is related to attestation
 */
export const isAttestationError = (error: any): boolean => {
  if (!error) return false;

  const errorMessage = error.message || error.toString() || '';
  const errorStatus = error.status || error.code;

  return (
    errorMessage.toLowerCase().includes('attestation') ||
    errorMessage.toLowerCase().includes('verify') ||
    errorStatus === 400 ||
    errorMessage.includes('400') ||
    errorMessage.toLowerCase().includes('failed to load resource')
  );
};

/**
 * Handle attestation errors with automatic recovery
 */
export const handleAttestationErrorWithRecovery = (error: any, onRecovery?: () => void): boolean => {
  if (!isAttestationError(error)) {
    return false;
  }

  console.warn('Attestation error detected, attempting recovery...', error);
  
  // Clear cache
  clearWalletConnectCache();
  
  // Call recovery callback if provided
  if (onRecovery) {
    setTimeout(onRecovery, 1000);
  }

  return true;
};

/**
 * Initialize WalletConnect with error handling
 */
export const initializeWithRetry = async (
  initFunction: () => Promise<void>,
  maxRetries: number = 3,
  retryDelay: number = 2000
): Promise<boolean> => {
  let retryCount = 0;

  while (retryCount < maxRetries) {
    try {
      await initFunction();
      return true;
    } catch (error) {
      console.error(`Initialization attempt ${retryCount + 1} failed:`, error);
      
      if (isAttestationError(error)) {
        console.log('Attestation error detected, clearing cache and retrying...');
        clearWalletConnectCache();
      }

      retryCount++;
      
      if (retryCount < maxRetries) {
        console.log(`Retrying in ${retryDelay}ms... (${retryCount}/${maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, retryDelay));
      }
    }
  }

  console.error(`Failed to initialize after ${maxRetries} attempts`);
  return false;
};

/**
 * Create a debounced function to prevent rapid successive calls
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Check if we're in development mode
 */
export const isDevelopment = (): boolean => {
  return process.env.NODE_ENV === 'development';
};

/**
 * Log debug information only in development
 */
export const debugLog = (message: string, ...args: any[]): void => {
  if (isDevelopment()) {
    console.log(`[WalletConnect Debug] ${message}`, ...args);
  }
};

/**
 * Get a safe project ID from environment variables
 */
export const getProjectId = (): string => {
  const projectId = process.env.REACT_APP_WALLETCONNECT_PROJECT_ID;
  
  if (!projectId || projectId === 'your_project_id_here') {
    console.warn('WalletConnect Project ID not properly configured. Please set REACT_APP_WALLETCONNECT_PROJECT_ID in your .env file');
    return '';
  }
  
  return projectId;
}; 