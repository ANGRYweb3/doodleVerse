# Hoohles NFT - AI Forecasting Access

เว็บไซต์สไตล์ Doodle สำหรับ Hoohles NFT Collection ที่ให้สิทธิ์เข้าถึง AI Forecasting Model

## Features

- 🎨 Doodle-style UI ด้วย Tailwind CSS
- 🔗 เชื่อมต่อกับ HashPack wallet ผ่าน HashConnect v3
- 🎭 ตรวจสอบการถือครอง NFT
- 📧 ระบบ Waitlist สำหรับผู้ที่ถือ NFT
- 🌈 Animated background และ floating elements

## การติดตั้ง

1. Clone repository:
```bash
git clone <your-repo>
cd website
```

2. ติดตั้ง dependencies:
```bash
npm install
```

3. สร้างไฟล์ `.env` และใส่ค่าต่อไปนี้:
```env
# WalletConnect Project ID - รับได้จาก https://cloud.walletconnect.com
REACT_APP_WALLETCONNECT_PROJECT_ID=your_project_id_here

# NFT Collection Token ID
REACT_APP_NFT_TOKEN_ID=0.0.xxxxxx

# Email receiver endpoint
REACT_APP_EMAIL_ENDPOINT=https://your-backend.com/api/waitlist

# Network (testnet หรือ mainnet)
REACT_APP_HEDERA_NETWORK=testnet
```

4. รันโปรเจค:
```bash
npm start
```

## การปรับแต่ง

### เปลี่ยน NFT Collection ID
แก้ไขในไฟล์ `src/components/WaitlistForm.tsx` ที่ TODO comment

### เปลี่ยน Email Endpoint
แก้ไขในไฟล์ `src/components/WaitlistForm.tsx` ที่ TODO comment

### เพิ่มรูป NFT
วางไฟล์รูปใน folder `public/`

## Tech Stack

- React + TypeScript
- Tailwind CSS
- HashConnect v3
- Hedera SDK

## การ Deploy

```bash
npm run build
```

ไฟล์ที่ build จะอยู่ใน folder `build/` # doodleVerse
