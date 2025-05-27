// Mock data for Hedera Portfolio Dashboard
export const mockHederaData = {
  account: {
    account: '0.0.123456',
    balance: {
      balance: 23450000000, // 234.5 HBAR in tinybars
      timestamp: '2024-01-15T10:30:00Z'
    },
    auto_renew_period: 7776000, // 90 days in seconds
    created_timestamp: '1640995200', // 2022-01-01
    decline_reward: false,
    deleted: false,
    ethereum_nonce: 0,
    evm_address: '0x1234567890abcdef1234567890abcdef12345678',
    expiry_timestamp: '1735689600', // 2025-01-01
    key: {
      _type: 'ED25519',
      key: 'abcd1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
    },
    max_automatic_token_associations: 1000,
    memo: 'Hedera Portfolio Demo Account',
    pending_reward: 0,
    receiver_sig_required: false,
    staked_account_id: '',
    staked_node_id: 3,
    stake_period_start: '2024-01-01T00:00:00Z'
  },

  tokenBalances: [
    {
      account: '0.0.123456',
      balance: 1000000000000, // 10,000 tokens with 8 decimals
      decimals: 8,
      token_id: '0.0.456789',
      freeze_status: 'NOT_APPLICABLE',
      kyc_status: 'GRANTED',
      tokenInfo: {
        name: 'USDC on Hedera',
        symbol: 'USDC',
        type: 'FUNGIBLE_COMMON',
        decimals: 8,
        total_supply: '1000000000000000',
        treasury_account_id: '0.0.456789'
      },
      formattedBalance: '10,000.00000000'
    },
    {
      account: '0.0.123456',
      balance: 500000000, // 5 tokens with 6 decimals
      decimals: 6,
      token_id: '0.0.789012',
      freeze_status: 'NOT_APPLICABLE',
      kyc_status: 'GRANTED',
      tokenInfo: {
        name: 'Hedera Token Service Demo',
        symbol: 'HTS',
        type: 'FUNGIBLE_COMMON',
        decimals: 6,
        total_supply: '100000000000',
        treasury_account_id: '0.0.789012'
      },
      formattedBalance: '5.000000'
    },
    {
      account: '0.0.123456',
      balance: 25000000000000000000, // 25 tokens with 18 decimals
      decimals: 18,
      token_id: '0.0.345678',
      freeze_status: 'NOT_APPLICABLE',
      kyc_status: 'GRANTED',
      tokenInfo: {
        name: 'Wrapped HBAR',
        symbol: 'WHBAR',
        type: 'FUNGIBLE_COMMON',
        decimals: 18,
        total_supply: '50000000000000000000000000',
        treasury_account_id: '0.0.345678'
      },
      formattedBalance: '25.000000000000000000'
    },
    {
      account: '0.0.123456',
      balance: 1500000, // 1.5 tokens with 6 decimals
      decimals: 6,
      token_id: '0.0.567890',
      freeze_status: 'NOT_APPLICABLE',
      kyc_status: 'GRANTED',
      tokenInfo: {
        name: 'SaucerSwap Token',
        symbol: 'SAUCE',
        type: 'FUNGIBLE_COMMON',
        decimals: 6,
        total_supply: '1000000000000',
        treasury_account_id: '0.0.567890'
      },
      formattedBalance: '1.500000'
    },
    {
      account: '0.0.123456',
      balance: 750000000, // 7.5 tokens with 8 decimals
      decimals: 8,
      token_id: '0.0.234567',
      freeze_status: 'NOT_APPLICABLE',
      kyc_status: 'GRANTED',
      tokenInfo: {
        name: 'Hedera Staking Coin',
        symbol: 'HSC',
        type: 'FUNGIBLE_COMMON',
        decimals: 8,
        total_supply: '21000000000000000',
        treasury_account_id: '0.0.234567'
      },
      formattedBalance: '7.50000000'
    }
  ],

  nfts: [
    {
      account_id: '0.0.123456',
      created_timestamp: '1704067200', // 2024-01-01
      delegating_spender: '',
      deleted: false,
      metadata: 'eyJuYW1lIjoiSGVkZXJhIE5GVCAjMSIsImRlc2NyaXB0aW9uIjoiQSBiZWF1dGlmdWwgSGVkZXJhIE5GVCIsImltYWdlIjoiaHR0cHM6Ly9leGFtcGxlLmNvbS9uZnQxLnBuZyJ9',
      modified_timestamp: '1704067200',
      serial_number: 1,
      spender: '',
      token_id: '0.0.111111'
    },
    {
      account_id: '0.0.123456',
      created_timestamp: '1704153600', // 2024-01-02
      delegating_spender: '',
      deleted: false,
      metadata: 'eyJuYW1lIjoiSGVkZXJhIE5GVCAjMiIsImRlc2NyaXB0aW9uIjoiQW5vdGhlciBhbWF6aW5nIEhlZGVyYSBORlQiLCJpbWFnZSI6Imh0dHBzOi8vZXhhbXBsZS5jb20vbmZ0Mi5wbmcifQ==',
      modified_timestamp: '1704153600',
      serial_number: 2,
      spender: '',
      token_id: '0.0.111111'
    },
    {
      account_id: '0.0.123456',
      created_timestamp: '1704240000', // 2024-01-03
      delegating_spender: '',
      deleted: false,
      metadata: 'eyJuYW1lIjoiQ3J5cHRvIEFydCAjNSIsImRlc2NyaXB0aW9uIjoiRGlnaXRhbCBhcnQgb24gSGVkZXJhIiwiaW1hZ2UiOiJodHRwczovL2V4YW1wbGUuY29tL2FydDUucG5nIn0=',
      modified_timestamp: '1704240000',
      serial_number: 5,
      spender: '',
      token_id: '0.0.222222'
    },
    {
      account_id: '0.0.123456',
      created_timestamp: '1704326400', // 2024-01-04
      delegating_spender: '',
      deleted: false,
      metadata: 'eyJuYW1lIjoiR2FtaW5nIE5GVCAjMTAiLCJkZXNjcmlwdGlvbiI6IlJhcmUgZ2FtaW5nIGl0ZW0iLCJpbWFnZSI6Imh0dHBzOi8vZXhhbXBsZS5jb20vZ2FtZTEwLnBuZyJ9',
      modified_timestamp: '1704326400',
      serial_number: 10,
      spender: '',
      token_id: '0.0.333333'
    },
    {
      account_id: '0.0.123456',
      created_timestamp: '1704412800', // 2024-01-05
      delegating_spender: '',
      deleted: false,
      metadata: 'eyJuYW1lIjoiTXVzaWMgTkZUICMzIiwiZGVzY3JpcHRpb24iOiJFeGNsdXNpdmUgbXVzaWMgdHJhY2siLCJpbWFnZSI6Imh0dHBzOi8vZXhhbXBsZS5jb20vbXVzaWMzLnBuZyJ9',
      modified_timestamp: '1704412800',
      serial_number: 3,
      spender: '',
      token_id: '0.0.444444'
    },
    {
      account_id: '0.0.123456',
      created_timestamp: '1704499200', // 2024-01-06
      delegating_spender: '',
      deleted: false,
      metadata: 'eyJuYW1lIjoiU3BvcnRzIENhcmQgIzc3IiwiZGVzY3JpcHRpb24iOiJMZWdlbmRhcnkgcGxheWVyIGNhcmQiLCJpbWFnZSI6Imh0dHBzOi8vZXhhbXBsZS5jb20vc3BvcnQ3Ny5wbmcifQ==',
      modified_timestamp: '1704499200',
      serial_number: 77,
      spender: '',
      token_id: '0.0.555555'
    }
  ],

  transactions: [
    {
      bytes: '',
      charged_tx_fee: 5000000, // 0.05 HBAR
      consensus_timestamp: '1704585600.123456789', // 2024-01-07
      entity_id: '0.0.123456',
      max_fee: '10000000',
      memo_base64: '',
      name: 'CRYPTOTRANSFER',
      nft_transfers: [],
      node: '0.0.3',
      nonce: 0,
      parent_consensus_timestamp: '',
      result: 'SUCCESS',
      scheduled: false,
      staking_reward_transfers: [],
      token_transfers: [],
      transaction_hash: 'abcd1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
      transaction_id: '0.0.123456-1704585600-123456789',
      transfers: [
        {
          account: '0.0.123456',
          amount: -100000000 // -1 HBAR
        },
        {
          account: '0.0.654321',
          amount: 100000000 // +1 HBAR
        }
      ],
      valid_duration_seconds: '120',
      valid_start_timestamp: '1704585600.123456789'
    },
    {
      bytes: '',
      charged_tx_fee: 3000000, // 0.03 HBAR
      consensus_timestamp: '1704499200.987654321', // 2024-01-06
      entity_id: '0.0.123456',
      max_fee: '5000000',
      memo_base64: '',
      name: 'TOKENMINT',
      nft_transfers: [],
      node: '0.0.4',
      nonce: 0,
      parent_consensus_timestamp: '',
      result: 'SUCCESS',
      scheduled: false,
      staking_reward_transfers: [],
      token_transfers: [
        {
          account: '0.0.123456',
          amount: 1000000000,
          token_id: '0.0.456789'
        }
      ],
      transaction_hash: 'efgh5678901234567890efgh5678901234567890efgh5678901234567890efgh',
      transaction_id: '0.0.123456-1704499200-987654321',
      transfers: [],
      valid_duration_seconds: '120',
      valid_start_timestamp: '1704499200.987654321'
    },
    {
      bytes: '',
      charged_tx_fee: 7500000, // 0.075 HBAR
      consensus_timestamp: '1704412800.555666777', // 2024-01-05
      entity_id: '0.0.123456',
      max_fee: '15000000',
      memo_base64: '',
      name: 'TOKENASSOCIATE',
      nft_transfers: [],
      node: '0.0.5',
      nonce: 0,
      parent_consensus_timestamp: '',
      result: 'SUCCESS',
      scheduled: false,
      staking_reward_transfers: [],
      token_transfers: [],
      transaction_hash: 'ijkl9012345678901234ijkl9012345678901234ijkl9012345678901234ijkl',
      transaction_id: '0.0.123456-1704412800-555666777',
      transfers: [
        {
          account: '0.0.123456',
          amount: -7500000
        }
      ],
      valid_duration_seconds: '120',
      valid_start_timestamp: '1704412800.555666777'
    },
    {
      bytes: '',
      charged_tx_fee: 2000000, // 0.02 HBAR
      consensus_timestamp: '1704326400.111222333', // 2024-01-04
      entity_id: '0.0.123456',
      max_fee: '4000000',
      memo_base64: '',
      name: 'CRYPTOTRANSFER',
      nft_transfers: [],
      node: '0.0.3',
      nonce: 0,
      parent_consensus_timestamp: '',
      result: 'SUCCESS',
      scheduled: false,
      staking_reward_transfers: [],
      token_transfers: [],
      transaction_hash: 'mnop3456789012345678mnop3456789012345678mnop3456789012345678mnop',
      transaction_id: '0.0.123456-1704326400-111222333',
      transfers: [
        {
          account: '0.0.123456',
          amount: 50000000 // +0.5 HBAR
        },
        {
          account: '0.0.987654',
          amount: -50000000 // -0.5 HBAR
        }
      ],
      valid_duration_seconds: '120',
      valid_start_timestamp: '1704326400.111222333'
    },
    {
      bytes: '',
      charged_tx_fee: 12000000, // 0.12 HBAR
      consensus_timestamp: '1704240000.444555666', // 2024-01-03
      entity_id: '0.0.123456',
      max_fee: '20000000',
      memo_base64: '',
      name: 'TOKENCREATION',
      nft_transfers: [],
      node: '0.0.6',
      nonce: 0,
      parent_consensus_timestamp: '',
      result: 'SUCCESS',
      scheduled: false,
      staking_reward_transfers: [],
      token_transfers: [],
      transaction_hash: 'qrst7890123456789012qrst7890123456789012qrst7890123456789012qrst',
      transaction_id: '0.0.123456-1704240000-444555666',
      transfers: [
        {
          account: '0.0.123456',
          amount: -12000000
        }
      ],
      valid_duration_seconds: '120',
      valid_start_timestamp: '1704240000.444555666'
    }
  ],

  portfolioSummary: {
    totalHbarBalance: 234.5,
    totalUsdValue: 23.45, // Assuming HBAR = $0.10
    tokenCount: 5,
    nftCount: 6,
    hbarPrice: 0.10,
    totalProfitLoss: 4.71, // 24% profit
    totalProfitLossPercentage: 24.0,
    initialInvestment: 19.64
  },

  // Portfolio Performance Data for Charts
  portfolioPerformance: {
    daily: [
      { date: '2024-01-01', value: 19.64, hbarPrice: 0.08 },
      { date: '2024-01-02', value: 19.85, hbarPrice: 0.081 },
      { date: '2024-01-03', value: 20.12, hbarPrice: 0.082 },
      { date: '2024-01-04', value: 19.98, hbarPrice: 0.081 },
      { date: '2024-01-05', value: 20.45, hbarPrice: 0.083 },
      { date: '2024-01-06', value: 21.02, hbarPrice: 0.085 },
      { date: '2024-01-07', value: 21.78, hbarPrice: 0.088 },
      { date: '2024-01-08', value: 22.15, hbarPrice: 0.089 },
      { date: '2024-01-09', value: 21.89, hbarPrice: 0.087 },
      { date: '2024-01-10', value: 22.56, hbarPrice: 0.091 },
      { date: '2024-01-11', value: 23.12, hbarPrice: 0.093 },
      { date: '2024-01-12', value: 22.98, hbarPrice: 0.092 },
      { date: '2024-01-13', value: 23.67, hbarPrice: 0.095 },
      { date: '2024-01-14', value: 23.89, hbarPrice: 0.096 },
      { date: '2024-01-15', value: 23.45, hbarPrice: 0.10 }
    ],
    weekly: [
      { date: '2024-W01', value: 19.64, change: 0 },
      { date: '2024-W02', value: 21.78, change: 10.9 },
      { date: '2024-W03', value: 23.45, change: 19.4 }
    ],
    monthly: [
      { date: '2024-01', value: 23.45, change: 19.4 }
    ]
  },

  // Token Performance Data
  tokenPerformance: [
    {
      symbol: 'HBAR',
      currentValue: 23.45,
      initialValue: 18.72,
      profitLoss: 4.73,
      profitLossPercentage: 25.3,
      allocation: 85.2
    },
    {
      symbol: 'USDC',
      currentValue: 1000.0,
      initialValue: 1000.0,
      profitLoss: 0,
      profitLossPercentage: 0,
      allocation: 8.5
    },
    {
      symbol: 'WHBAR',
      currentValue: 2.5,
      initialValue: 2.0,
      profitLoss: 0.5,
      profitLossPercentage: 25.0,
      allocation: 3.2
    },
    {
      symbol: 'SAUCE',
      currentValue: 0.15,
      initialValue: 0.12,
      profitLoss: 0.03,
      profitLossPercentage: 25.0,
      allocation: 2.1
    },
    {
      symbol: 'HSC',
      currentValue: 0.75,
      initialValue: 0.60,
      profitLoss: 0.15,
      profitLossPercentage: 25.0,
      allocation: 1.0
    }
  ],

  // Asset Allocation Data
  assetAllocation: [
    { name: 'HBAR', value: 85.2, color: '#6366f1' },
    { name: 'Stablecoins', value: 8.5, color: '#10b981' },
    { name: 'DeFi Tokens', value: 4.3, color: '#f59e0b' },
    { name: 'Other', value: 2.0, color: '#8b5cf6' }
  ]
};

// Mock HBAR price
export const mockHbarPrice = 0.10; 
 