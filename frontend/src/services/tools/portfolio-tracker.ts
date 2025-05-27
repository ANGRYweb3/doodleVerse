const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export const portfolioTrackerService = {
  // ดึงราคา crypto ปัจจุบัน
  async getPrices(symbols?: string[]) {
    const url = symbols 
      ? `${API_BASE}/api/tools/portfolio-tracker/prices?symbols=${symbols.join(',')}`
      : `${API_BASE}/api/tools/portfolio-tracker/prices`;
      
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch crypto prices');
    return response.json();
  },

  // บันทึก portfolio
  async savePortfolio(accountId: string, portfolio: any[]) {
    const response = await fetch(`${API_BASE}/api/tools/portfolio-tracker/save`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accountId, portfolio })
    });
    if (!response.ok) throw new Error('Failed to save portfolio');
    return response.json();
  },

  // โหลด portfolio
  async loadPortfolio(accountId: string) {
    const response = await fetch(`${API_BASE}/api/tools/portfolio-tracker/load/${accountId}`);
    if (!response.ok) throw new Error('Failed to load portfolio');
    return response.json();
  },

  // ดึงข้อมูล analytics
  async getAnalytics(accountId: string) {
    const response = await fetch(`${API_BASE}/api/tools/portfolio-tracker/analytics/${accountId}`);
    if (!response.ok) throw new Error('Failed to fetch analytics');
    return response.json();
  },

  // ดึงข้อมูล market overview
  async getMarketOverview() {
    const response = await fetch(`${API_BASE}/api/tools/portfolio-tracker/market-overview`);
    if (!response.ok) throw new Error('Failed to fetch market overview');
    return response.json();
  }
};
