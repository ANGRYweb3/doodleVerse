import React, { Component, ErrorInfo, ReactNode } from 'react';
import { clearWalletConnectCache, isAttestationError } from '../utils/walletConnectUtils';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  isAttestationError: boolean;
}

class WalletConnectErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      isAttestationError: false
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
      isAttestationError: isAttestationError(error)
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('WalletConnect Error Boundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo,
      isAttestationError: isAttestationError(error)
    });

    // If it's an attestation error, clear cache automatically
    if (isAttestationError(error)) {
      console.log('Attestation error detected in Error Boundary, clearing cache...');
      clearWalletConnectCache();
    }
  }

  handleRetry = () => {
    // Clear cache before retry
    clearWalletConnectCache();
    
    // Reset error state
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      isAttestationError: false
    });

    // Reload the page to ensure clean state
    window.location.reload();
  };

  handleClearCache = () => {
    clearWalletConnectCache();
    alert('WalletConnect cache cleared. Please try connecting again.');
    
    // Reset error state
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      isAttestationError: false
    });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pastel-blue to-pastel-purple p-6">
          <div className="doodle-border bg-white p-8 max-w-md w-full text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {this.state.isAttestationError ? '🔗 Connection Issue' : '⚠️ Something went wrong'}
            </h2>
            
            {this.state.isAttestationError ? (
              <div className="space-y-4">
                <p className="text-gray-600">
                  We're experiencing connection issues with WalletConnect. This is usually temporary and can be fixed by clearing the cache.
                </p>
                <div className="space-y-2">
                  <button
                    onClick={this.handleClearCache}
                    className="w-full doodle-border doodle-shadow px-6 py-3 bg-pastel-yellow hover:bg-pastel-orange transition-colors font-bold text-gray-800"
                  >
                    Clear Cache & Try Again
                  </button>
                  <button
                    onClick={this.handleRetry}
                    className="w-full doodle-border doodle-shadow px-6 py-3 bg-pastel-green hover:bg-pastel-blue transition-colors font-bold text-gray-800"
                  >
                    Reload Page
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-gray-600">
                  An unexpected error occurred. Please try refreshing the page.
                </p>
                <button
                  onClick={this.handleRetry}
                  className="w-full doodle-border doodle-shadow px-6 py-3 bg-pastel-purple hover:bg-pastel-blue transition-colors font-bold text-gray-800"
                >
                  Refresh Page
                </button>
              </div>
            )}

            {/* Debug information in development */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                  Debug Information
                </summary>
                <div className="mt-2 p-3 bg-gray-100 rounded text-xs font-mono">
                  <div className="mb-2">
                    <strong>Error:</strong> {this.state.error.message}
                  </div>
                  <div className="mb-2">
                    <strong>Stack:</strong>
                    <pre className="whitespace-pre-wrap">{this.state.error.stack}</pre>
                  </div>
                  {this.state.errorInfo && (
                    <div>
                      <strong>Component Stack:</strong>
                      <pre className="whitespace-pre-wrap">{this.state.errorInfo.componentStack}</pre>
                    </div>
                  )}
                </div>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default WalletConnectErrorBoundary; 