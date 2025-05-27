import React from 'react';
import HederaPortfolioDashboard from './tools/HederaPortfolioDashboard';

const TestHederaPortfolio: React.FC = () => {
  // Test with a known testnet account
  const testAccountId = '0.0.123456'; // Account ที่มีข้อมูลใน testnet

  return (
    <div>
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
        <strong>Test Mode:</strong> Testing Hedera Portfolio Dashboard with account {testAccountId}
      </div>
      <HederaPortfolioDashboard accountId={testAccountId} />
    </div>
  );
};

export default TestHederaPortfolio; 
 