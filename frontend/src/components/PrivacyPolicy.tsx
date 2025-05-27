import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-16 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl doodle-border">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 font-doodle">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Privacy Policy
            </span>
          </h1>
          
          <div className="space-y-8 text-gray-700 font-doodle-body">
            <div>
              <p className="text-sm text-gray-500 mb-6">Last updated: January 2025</p>
            </div>

            <section>
              <h2 className="text-2xl font-bold mb-4 font-doodle text-gray-800">1. Introduction</h2>
              <p className="mb-4 leading-relaxed">
                Welcome to DoodleVerse! This Privacy Policy explains how we collect, use, and protect your information when you use our AI-powered crypto tools platform. We are committed to protecting your privacy and ensuring transparency about our data practices.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 font-doodle text-gray-800">2. Information We Collect</h2>
              
              <h3 className="text-lg font-semibold mb-3 font-doodle-fun text-gray-700">2.1 Wallet Information</h3>
              <p className="mb-4 leading-relaxed">
                When you connect your Hedera wallet (such as HashPack), we may collect:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
                <li>Your Hedera account ID (e.g., 0.0.123456)</li>
                <li>NFT holdings for verification purposes</li>
                <li>Token balances (when using portfolio tools)</li>
                <li>Transaction history (when using analysis tools)</li>
              </ul>

              <h3 className="text-lg font-semibold mb-3 font-doodle-fun text-gray-700">2.2 Usage Data</h3>
              <p className="mb-4 leading-relaxed">
                We automatically collect information about how you interact with our platform:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
                <li>Pages visited and features used</li>
                <li>Time spent on the platform</li>
                <li>Device information (browser type, operating system)</li>
                <li>IP address (for security and analytics)</li>
              </ul>

              <h3 className="text-lg font-semibold mb-3 font-doodle-fun text-gray-700">2.3 AI Tool Data</h3>
              <p className="mb-4 leading-relaxed">
                When you use our AI-powered tools:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
                <li>Cryptocurrency symbols you analyze</li>
                <li>Forecasting parameters you select</li>
                <li>Tool usage patterns (to improve our models)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 font-doodle text-gray-800">Contact Us</h2>
              <p className="mb-4 leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us through our Discord community or support channels.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy; 