import React, { useState, useEffect, useCallback, useRef } from 'react';
import { HashConnect, HashConnectConnectionState, SessionData } from 'hashconnect';
import { LedgerId } from '@hashgraph/sdk';
import { walletConnectConfig, handleAttestationError, createDebounce } from '../config/walletConnect';

interface HashConnectComponentProps {
  onConnect: (accountId: string) => void;
  onDisconnect: () => void;
  accountId: string;
}

const HashConnectComponent: React.FC<HashConnectComponentProps> = ({ 
  onConnect, 
  onDisconnect, 
  accountId 
}) => {
  const [hashConnect, setHashConnect] = useState<HashConnect | null>(null);
  const [connectionState, setConnectionState] = useState<HashConnectConnectionState>(
    HashConnectConnectionState.Disconnected
  );
  const [isInitialized, setIsInitialized] = useState(false);
  const [pairingData, setPairingData] = useState<SessionData | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const initializationRef = useRef(false);

  useEffect(() => {
    // Prevent multiple initializations
    if (initializationRef.current) return;
    initializationRef.current = true;

    const init = async () => {
      try {
        // Get network from environment variable
        const network = process.env.REACT_APP_HEDERA_NETWORK === 'mainnet' 
          ? LedgerId.MAINNET 
          : LedgerId.TESTNET;

        // Get project ID from environment variable
        const projectId = process.env.REACT_APP_WALLETCONNECT_PROJECT_ID || '';

        if (!projectId) {
          console.error('Please set REACT_APP_WALLETCONNECT_PROJECT_ID in your .env file');
          return;
        }

        // Create HashConnect instance with improved configuration
        const hc = new HashConnect(
          network, 
          projectId,
          walletConnectConfig.metadata,
          true // debug mode
        );

        // Set up event listeners with error handling
        hc.pairingEvent.on((newPairing: SessionData) => {
          console.log('Pairing event received:', newPairing);
          setPairingData(newPairing);
          if (newPairing.accountIds && newPairing.accountIds.length > 0) {
            onConnect(newPairing.accountIds[0]);
          }
          setIsConnecting(false);
          setRetryCount(0); // Reset retry count on successful connection
        });

        hc.disconnectionEvent.on(() => {
          console.log('Disconnection event received');
          setPairingData(null);
          onDisconnect();
          setIsConnecting(false);
        });

        hc.connectionStatusChangeEvent.on((status: HashConnectConnectionState) => {
          console.log('Connection status changed:', status);
          setConnectionState(status);
          
          // Reset connecting state if connection fails
          if (status === HashConnectConnectionState.Disconnected) {
            setIsConnecting(false);
          }
        });

        await hc.init();
        setHashConnect(hc);
        setIsInitialized(true);
        console.log('HashConnect initialized successfully');
      } catch (error) {
        console.error('Error initializing HashConnect:', error);
        
        // Handle attestation errors
        if (handleAttestationError(error)) {
          // If it's an attestation error and we haven't exceeded retry limit
          if (retryCount < walletConnectConfig.maxRetries) {
            console.log(`Retrying initialization (${retryCount + 1}/${walletConnectConfig.maxRetries})...`);
            setRetryCount(prev => prev + 1);
            initializationRef.current = false;
            
            setTimeout(() => {
              init();
            }, walletConnectConfig.retryDelay);
            return;
          }
        }
        
        setIsInitialized(false);
        setIsConnecting(false);
        initializationRef.current = false; // Allow retry
      }
    };

    init();

    // Cleanup function
    return () => {
      if (hashConnect) {
        try {
          hashConnect.disconnect();
        } catch (error) {
          console.error('Error during cleanup:', error);
        }
      }
    };
  }, [onConnect, onDisconnect, retryCount]);

  const connectWallet = useCallback(createDebounce(async () => {
    if (!hashConnect || !isInitialized || isConnecting) {
      console.log('Cannot connect: hashConnect not ready or already connecting');
      return;
    }

    setIsConnecting(true);
    
    try {
      console.log('Attempting to open pairing modal...');
      await hashConnect.openPairingModal();
    } catch (error) {
      console.error('Error connecting wallet:', error);
      setIsConnecting(false);
      
      // Handle attestation errors during connection
      if (handleAttestationError(error)) {
        console.log('Attestation error during connection, clearing cache and retrying...');
        
        // Reset initialization to trigger retry
        initializationRef.current = false;
        setIsInitialized(false);
        setRetryCount(0);
        
        // Retry after a delay
        setTimeout(() => {
          window.location.reload(); // Simple solution for persistent attestation issues
        }, 2000);
      }
    }
  }, 1000), [hashConnect, isInitialized, isConnecting]);

  const disconnectWallet = useCallback(() => {
    if (!hashConnect) return;
    
    try {
      hashConnect.disconnect();
      setPairingData(null);
      onDisconnect();
      setIsConnecting(false);
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
    }
  }, [hashConnect, onDisconnect]);

  return (
    <div className="flex flex-col items-end space-y-2">
      {connectionState === HashConnectConnectionState.Paired && accountId ? (
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <div className="text-sm text-gray-600">Connected</div>
            <div className="text-xs text-gray-500 font-mono">
              {accountId.substring(0, 8)}...{accountId.substring(accountId.length - 6)}
            </div>
          </div>
          <button
            onClick={disconnectWallet}
            className="doodle-border doodle-shadow px-4 py-2 bg-gradient-to-r from-red-300 to-pink-300 hover:from-pink-300 hover:to-red-400 transition-colors font-bold text-gray-800 hover:animate-wiggle"
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button
          onClick={connectWallet}
          disabled={!isInitialized || isConnecting}
          className="doodle-border doodle-shadow px-8 py-3 bg-gradient-to-r from-purple-300 to-blue-300 hover:from-blue-300 hover:to-green-300 transition-colors font-bold text-gray-800 hover:animate-wiggle disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {!isInitialized ? 'Initializing...' : 
           isConnecting ? 'Connecting...' : 
           'Connect HashPack'}
        </button>
      )}
    </div>
  );
};

export default HashConnectComponent; 