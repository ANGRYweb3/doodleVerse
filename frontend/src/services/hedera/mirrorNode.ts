// Hedera Mirror Node API Service
const MIRROR_NODE_BASE_URL = process.env.REACT_APP_HEDERA_NETWORK === 'mainnet' 
  ? 'https://mainnet-public.mirrornode.hedera.com'
  : 'https://testnet.mirrornode.hedera.com';

export interface HederaAccount {
  account: string;
  balance: {
    balance: number;
    timestamp: string;
  };
  auto_renew_period: number;
  created_timestamp: string;
  decline_reward: boolean;
  deleted: boolean;
  ethereum_nonce: number;
  evm_address: string;
  expiry_timestamp: string;
  key: {
    _type: string;
    key: string;
  };
  max_automatic_token_associations: number;
  memo: string;
  pending_reward: number;
  receiver_sig_required: boolean;
  staked_account_id: string;
  staked_node_id: number;
  stake_period_start: string;
}

export interface TokenBalance {
  account: string;
  balance: number;
  decimals: number;
  token_id: string;
  freeze_status?: string;
  kyc_status?: string;
}

export interface TokenInfo {
  admin_key: any;
  auto_renew_account: string;
  auto_renew_period: number;
  created_timestamp: string;
  custom_fees: any;
  decimals: number;
  deleted: boolean;
  expiry_timestamp: string;
  fee_schedule_key: any;
  freeze_default: boolean;
  freeze_key: any;
  initial_supply: string;
  kyc_key: any;
  max_supply: string;
  memo: string;
  modified_timestamp: string;
  name: string;
  pause_key: any;
  pause_status: string;
  supply_key: any;
  supply_type: string;
  symbol: string;
  token_id: string;
  total_supply: string;
  treasury_account_id: string;
  type: string;
  wipe_key: any;
}

export interface NFTInfo {
  account_id: string;
  created_timestamp: string;
  delegating_spender: string;
  deleted: boolean;
  metadata: string;
  modified_timestamp: string;
  serial_number: number;
  spender: string;
  token_id: string;
}

export interface Transaction {
  bytes: string;
  charged_tx_fee: number;
  consensus_timestamp: string;
  entity_id: string;
  max_fee: string;
  memo_base64: string;
  name: string;
  nft_transfers: any[];
  node: string;
  nonce: number;
  parent_consensus_timestamp: string;
  result: string;
  scheduled: boolean;
  staking_reward_transfers: any[];
  token_transfers: any[];
  transaction_hash: string;
  transaction_id: string;
  transfers: any[];
  valid_duration_seconds: string;
  valid_start_timestamp: string;
}

class HederaMirrorNodeService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = MIRROR_NODE_BASE_URL;
  }

  // Get account information
  async getAccountInfo(accountId: string): Promise<HederaAccount> {
    try {
      console.log('Fetching account info for:', accountId);
      const response = await fetch(`${this.baseUrl}/api/v1/accounts/${accountId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch account info: ${response.statusText}`);
      }
      const data = await response.json();
      console.log('Account info received:', data);
      return data;
    } catch (error) {
      console.error('Error fetching account info:', error);
      throw error;
    }
  }

  // Get token balances for an account
  async getTokenBalances(accountId: string): Promise<TokenBalance[]> {
    try {
      const response = await fetch(`${this.baseUrl}/api/v1/accounts/${accountId}/tokens`);
      if (!response.ok) {
        throw new Error(`Failed to fetch token balances: ${response.statusText}`);
      }
      const data = await response.json();
      return data.tokens || [];
    } catch (error) {
      console.error('Error fetching token balances:', error);
      throw error;
    }
  }

  // Get token information
  async getTokenInfo(tokenId: string): Promise<TokenInfo> {
    try {
      const response = await fetch(`${this.baseUrl}/api/v1/tokens/${tokenId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch token info: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching token info:', error);
      throw error;
    }
  }

  // Get NFTs owned by an account
  async getNFTs(accountId: string): Promise<NFTInfo[]> {
    try {
      const response = await fetch(`${this.baseUrl}/api/v1/accounts/${accountId}/nfts`);
      if (!response.ok) {
        throw new Error(`Failed to fetch NFTs: ${response.statusText}`);
      }
      const data = await response.json();
      return data.nfts || [];
    } catch (error) {
      console.error('Error fetching NFTs:', error);
      throw error;
    }
  }

  // Get recent transactions for an account
  async getTransactions(accountId: string, limit: number = 25): Promise<Transaction[]> {
    try {
      const response = await fetch(`${this.baseUrl}/api/v1/transactions?account.id=${accountId}&limit=${limit}&order=desc`);
      if (!response.ok) {
        throw new Error(`Failed to fetch transactions: ${response.statusText}`);
      }
      const data = await response.json();
      return data.transactions || [];
    } catch (error) {
      console.error('Error fetching transactions:', error);
      throw error;
    }
  }

  // Get HBAR price from external API (CoinGecko)
  async getHBARPrice(): Promise<number> {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=hedera-hashgraph&vs_currencies=usd');
      if (!response.ok) {
        throw new Error(`Failed to fetch HBAR price: ${response.statusText}`);
      }
      const data = await response.json();
      return data['hedera-hashgraph']?.usd || 0;
    } catch (error) {
      console.error('Error fetching HBAR price:', error);
      return 0;
    }
  }

  // Convert tinybars to HBAR
  tinybarToHbar(tinybars: number): number {
    return tinybars / 100000000; // 1 HBAR = 100,000,000 tinybars
  }

  // Format account ID
  formatAccountId(accountId: string): string {
    return accountId.replace(/^0\.0\./, '');
  }

  // Decode base64 metadata for NFTs
  decodeMetadata(base64Metadata: string): any {
    try {
      const decoded = atob(base64Metadata);
      return JSON.parse(decoded);
    } catch (error) {
      console.error('Error decoding metadata:', error);
      return null;
    }
  }
}

export const hederaMirrorNode = new HederaMirrorNodeService(); 
 