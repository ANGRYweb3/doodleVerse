# DoodleVerse - Multi-Tools AI Crypto Platform

A scalable, modern web application for AI-powered cryptocurrency tools with NFT-gated access. Built with a modular architecture to easily add new tools and features.

## 🏗️ Project Structure

```
website/
├── src/
│   ├── components/
│   │   ├── common/          # Shared components
│   │   ├── tools/           # Tool-specific components
│   │   └── dashboard/       # Dashboard components
│   ├── config/              # Tool registry and configuration
│   ├── types/               # TypeScript type definitions
│   ├── services/            # API service functions
│   ├── hooks/               # Custom React hooks
│   └── utils/               # Utility functions
├── backend/                 # Node.js backend
├── docs/                    # Documentation
└── scripts/                 # Build and utility scripts
```

## ✨ Features

- 🎨 **Doodle-style UI** ด้วย Tailwind CSS
- 🔗 **Wallet Integration** เชื่อมต่อกับ HashPack wallet ผ่าน HashConnect v3
- 🎭 **NFT Verification** ตรวจสอบการถือครอง NFT
- 🛠️ **Modular Tools** สถาปัตยกรรมแบบ modular สำหรับเพิ่ม tools ใหม่
- 📊 **AI-Powered Analytics** เครื่องมือวิเคราะห์ด้วย AI
- 🚀 **Lazy Loading** โหลด tools แบบ dynamic
- 📱 **Responsive Design** รองรับทุกขนาดหน้าจอ

## 🚀 Quick Start

### 1. การติดตั้ง

```bash
# Clone repository
git clone <your-repo>
cd website

# ติดตั้ง frontend dependencies
npm install

# ติดตั้ง backend dependencies
cd backend
npm install
cd ..
```

### 2. Environment Setup

สร้างไฟล์ `.env` ใน root directory:

```env
# WalletConnect Project ID - รับได้จาก https://cloud.walletconnect.com
REACT_APP_WALLETCONNECT_PROJECT_ID=your_project_id_here

# NFT Collection Token ID
REACT_APP_NFT_TOKEN_ID=0.0.xxxxxx

# API Base URL
REACT_APP_API_URL=http://localhost:3001

# Network (testnet หรือ mainnet)
REACT_APP_HEDERA_NETWORK=testnet
```

### 3. รันโปรเจค

```bash
# รัน backend (terminal 1)
cd backend
npm start

# รัน frontend (terminal 2)
npm start
```

## 🛠️ การเพิ่ม Tools ใหม่

### วิธีที่ 1: ใช้ Script (แนะนำ)

```bash
# สร้าง tool ใหม่อัตโนมัติ
./scripts/create-tool.sh PortfolioTracker portfolio-tracker trading "Track your crypto portfolio"
```

### วิธีที่ 2: สร้างด้วยตนเอง

1. **สร้าง Component**
```bash
mkdir src/components/tools/YourTool
```

2. **เพิ่มใน Tool Registry**
แก้ไขไฟล์ `src/config/tools.ts`

3. **สร้าง API Endpoints**
สร้างไฟล์ใน `backend/src/routes/tools/`

ดูรายละเอียดเพิ่มเติมใน [docs/ADDING_NEW_TOOLS.md](docs/ADDING_NEW_TOOLS.md)

## 📚 Available Tools

### 💼 Portfolio Tracker (Coming Soon)
- Track และ analyze portfolio performance
- Real-time price updates
- P&L calculations

### 📰 Market Sentiment (Coming Soon)
- Analyze market sentiment จาก social media
- News sentiment analysis
- Market mood indicators

### 🌾 Yield Farming Calculator (Coming Soon)
- Calculate optimal yield farming strategies
- Cross-protocol comparisons
- APY calculations

### 🔍 NFT Collection Analyzer (Coming Soon)
- Analyze NFT collections และ floor prices
- Market trend analysis
- Rarity rankings

### 🤖 AI Trading Bot (Coming Soon)
- Automated trading ด้วย machine learning
- Strategy backtesting
- Risk management

## 🏗️ Architecture

### Frontend (React + TypeScript)
- **Tool Registry Pattern**: จัดการ tools แบบ centralized
- **Dynamic Loading**: Lazy load tools เพื่อ performance
- **Modular Components**: แยก components ตาม function
- **Custom Hooks**: Reusable logic สำหรับ tools

### Backend (Node.js + Express)
- **Modular Routes**: แยก API routes ตาม tools
- **Service Layer**: Business logic แยกจาก controllers
- **Middleware**: Authentication และ validation
- **Database Models**: Structured data models

## 🔧 Development

### Project Structure Migration

```bash
# Migrate existing structure
./scripts/migrate-structure.sh
```

### Adding New Categories

แก้ไขไฟล์ `src/config/tools.ts`:

```typescript
export const TOOL_CATEGORIES: ToolCategory[] = [
  // ... existing categories
  {
    id: 'new-category',
    name: 'New Category',
    description: 'Description of new category',
    icon: '🆕',
    color: 'from-green-400 to-blue-500'
  }
];
```

### Testing

```bash
# Test frontend
npm test

# Test backend
cd backend
npm test

# E2E testing
npm run test:e2e
```

## 📦 Deployment

### Build

```bash
# Build frontend
npm run build

# Build backend
cd backend
npm run build
```

### Environment Variables (Production)

```env
NODE_ENV=production
REACT_APP_API_URL=https://your-api-domain.com
REACT_APP_WALLETCONNECT_PROJECT_ID=your_production_project_id
REACT_APP_NFT_TOKEN_ID=0.0.production_token_id
REACT_APP_HEDERA_NETWORK=mainnet
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/new-tool`
3. Follow the tool creation guidelines
4. Submit a pull request

## 📖 Documentation

- [Project Structure](PROJECT_STRUCTURE.md)
- [Adding New Tools](docs/ADDING_NEW_TOOLS.md)
- [API Documentation](docs/API.md)
- [Deployment Guide](docs/DEPLOYMENT.md)

## 🛠️ Tech Stack

### Frontend
- React 18 + TypeScript
- Tailwind CSS
- HashConnect v3
- Recharts (สำหรับ charts)

### Backend
- Node.js + Express
- Hedera SDK
- CORS middleware

### Tools & Scripts
- Bash scripts สำหรับ automation
- ESLint + Prettier
- Git hooks

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

## 🆘 Troubleshooting

ดู [TROUBLESHOOTING.md](TROUBLESHOOTING.md) สำหรับปัญหาที่พบบ่อย

## 🔮 Roadmap

- [ ] เพิ่ม tools ใหม่ตาม roadmap
- [ ] Database integration
- [ ] User authentication system
- [ ] Advanced analytics dashboard
- [ ] Mobile app
- [ ] API rate limiting
- [ ] Caching system
