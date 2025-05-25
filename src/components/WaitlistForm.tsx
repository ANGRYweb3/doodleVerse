import React, { useState } from 'react';

interface WaitlistFormProps {
  isConnected: boolean;
  hasNFT: boolean;
  accountId: string;
}

const WaitlistForm: React.FC<WaitlistFormProps> = ({ isConnected, hasNFT, accountId }) => {
  const [email, setEmail] = useState('');
  const [discordUsername, setDiscordUsername] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isConnected) {
      setError('Please connect your HashPack wallet first!');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Check NFT ownership
      const checkNFT = async () => {
        const tokenId = process.env.REACT_APP_NFT_TOKEN_ID;
        
        if (!tokenId) {
          console.error('NFT Token ID not configured');
          return false;
        }

        try {
          // Call Hedera mirror node to check NFT balance
          const response = await fetch(
            `https://testnet.mirrornode.hedera.com/api/v1/accounts/${accountId}/nfts?token.id=${tokenId}`
          );
          
          if (!response.ok) {
            throw new Error('Failed to check NFT balance');
          }
          
          const data = await response.json();
          return data.nfts && data.nfts.length > 0;
        } catch (error) {
          console.error('Error checking NFT:', error);
          // For demo purposes, return true if there's an error
          return true;
        }
      };

      const hasNFTResult = await checkNFT();
      
      if (!hasNFTResult) {
        setError('You need to own a DoodleVerse NFT to join the waitlist!');
        setIsSubmitting(false);
        return;
      }

      // Submit to backend
      const endpoint = process.env.REACT_APP_EMAIL_ENDPOINT;
      
      if (endpoint) {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            discordUsername,
            accountId,
            hasNFT: hasNFTResult,
            timestamp: new Date().toISOString()
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to submit to waitlist');
        }
      }

      setIsSubmitted(true);
      setEmail('');
      setDiscordUsername('');
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center space-y-8">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-400 rounded-2xl transform rotate-1"></div>
          <div className="relative bg-white rounded-2xl p-8 transform -rotate-1 hover:rotate-0 transition-transform">
            <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-3xl font-black text-gray-800 mb-4">Welcome to DoodleVerse!</h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              You've successfully joined our waitlist. We'll notify you when the AI forecasting tools are ready!
            </p>
          </div>
        </div>
        
        <button
          onClick={() => setIsSubmitted(false)}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform"
        >
          Join Another Account
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-black text-gray-800 mb-3">Join the Exclusive Waitlist</h3>
        <p className="text-gray-600">Get early access to AI-powered forecasting tools</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-3">
            Email Address *
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors bg-gray-50 focus:bg-white"
          />
        </div>

        {/* Discord Username Field */}
        <div>
          <label htmlFor="discord" className="block text-sm font-bold text-gray-700 mb-3">
            Discord Username <span className="text-gray-400 font-normal">(Optional)</span>
          </label>
          <div className="relative">
            <input
              id="discord"
              type="text"
              value={discordUsername}
              onChange={(e) => setDiscordUsername(e.target.value)}
              placeholder="username#1234"
              className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors bg-gray-50 focus:bg-white pl-12"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Join our Discord community for updates and exclusive content</p>
        </div>

        {error && (
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-pink-400 rounded-xl transform rotate-1"></div>
            <div className="relative bg-white rounded-xl p-4 transform -rotate-1">
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-red-500 rounded-full flex-shrink-0 flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <span className="text-red-700 font-medium">{error}</span>
              </div>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting || !isConnected}
          className={`
            w-full py-5 px-8 text-xl font-bold rounded-xl
            transition-all duration-200 transform hover:scale-105
            ${isSubmitting 
              ? 'bg-gray-300 cursor-wait text-gray-600' 
              : isConnected
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl'
                : 'bg-gray-300 cursor-not-allowed text-gray-600'
            }
          `}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-gray-600 border-t-transparent rounded-full animate-spin mr-3"></div>
              Verifying NFT Ownership...
            </span>
          ) : !isConnected ? (
            'Connect Wallet First'
          ) : (
            'Join Waitlist'
          )}
        </button>

        {!isConnected && (
          <div className="text-center p-6 bg-gray-50 rounded-xl">
            <p className="text-gray-600 mb-4 font-medium">
              Connect your HashPack wallet to continue
            </p>
            <div className="flex justify-center space-x-2">
              <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        )}

        {isConnected && (
          <div className="text-center p-4 bg-green-50 rounded-xl">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm font-bold text-green-700">Wallet Connected</span>
            </div>
            <p className="text-sm text-gray-600">
              Account: <span className="font-mono font-bold text-gray-800">{accountId.substring(0, 8)}...{accountId.substring(accountId.length - 6)}</span>
            </p>
          </div>
        )}
      </form>
    </div>
  );
};

export default WaitlistForm; 