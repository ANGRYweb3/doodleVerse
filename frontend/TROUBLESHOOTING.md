# Troubleshooting Guide - Hoohles NFT Website

## WalletConnect และ Attestation Errors

### ปัญหาที่พบบ่อย

#### 1. Attestation Error 400 (ปัญหาหลัก)
```
attestation:1 Failed to load resource: the server responded with a status of 400 ()
```

**สาเหตุ:**
- WalletConnect attestation service มีปัญหา
- Cache ของ WalletConnect เสียหาย
- Network connectivity issues
- Project ID ไม่ถูกต้อง

**วิธีแก้ไข:**

1. **Clear WalletConnect Cache (วิธีที่ 1)**
   ```javascript
   // ใน browser console
   localStorage.clear();
   // หรือ
   Object.keys(localStorage).forEach(key => {
     if (key.startsWith('wc@2:') || key.startsWith('walletconnect')) {
       localStorage.removeItem(key);
     }
   });
   ```

2. **ใช้ Debug Button (วิธีที่ 2)**
   - ใน development mode จะมีปุ่ม "Clear WalletConnect Cache" ที่ footer
   - คลิกปุ่มนี้เพื่อ clear cache

3. **Refresh Page (วิธีที่ 3)**
   - กด F5 หรือ Ctrl+R เพื่อ refresh หน้าเว็บ
   - ระบบจะ auto-clear cache หากตรวจพบปัญหา

#### 2. การเชื่อมต่อ Wallet เด้งถี่เกินไป

**สาเหตุ:**
- Multiple connection attempts
- Network instability
- HashConnect initialization issues

**วิธีแก้ไข:**
- ระบบมี debounce mechanism แล้ว
- รอ 1-2 วินาทีระหว่างการคลิก
- ตรวจสอบ network connection

#### 3. Project ID ไม่ถูกต้อง

**วิธีตรวจสอบ:**
1. สร้างไฟล์ `.env` ใน root directory
2. เพิ่ม:
   ```
   REACT_APP_WALLETCONNECT_PROJECT_ID=your_actual_project_id
   ```
3. ไปที่ https://cloud.walletconnect.com เพื่อสร้าง Project ID

### การตั้งค่า Environment Variables

สร้างไฟล์ `.env` ใน root directory:

```env
# Disable source map warnings
GENERATE_SOURCEMAP=false

# WalletConnect Project ID (จำเป็น!)
REACT_APP_WALLETCONNECT_PROJECT_ID=your_project_id_here

# NFT Token ID
REACT_APP_NFT_TOKEN_ID=0.0.123456

# Network
REACT_APP_HEDERA_NETWORK=testnet

# Email endpoint (optional)
REACT_APP_EMAIL_ENDPOINT=https://your-backend.com/api/waitlist
```

### วิธีการ Debug

#### 1. เปิด Browser Developer Tools
- กด F12
- ไปที่ Console tab
- ดู error messages

#### 2. ตรวจสอบ Network Tab
- ดู requests ที่ fail
- ตรวจสอบ status codes

#### 3. ตรวจสอบ Application Tab
- ไปที่ Local Storage
- ดู WalletConnect data

### Error Handling Features

เว็บไซต์มี error handling ดังนี้:

1. **Error Boundary**: จับ errors และแสดง UI ที่เป็นมิตร
2. **Auto Cache Clear**: ล้าง cache อัตโนมัติเมื่อเจอ attestation errors
3. **Retry Mechanism**: ลองเชื่อมต่อใหม่อัตโนมัติ
4. **Debug Information**: แสดงข้อมูล debug ใน development mode

### วิธีการรีเซ็ตระบบ

หากปัญหายังไม่หาย ให้ทำตามขั้นตอนนี้:

1. **Clear All Data**
   ```javascript
   // ใน browser console
   localStorage.clear();
   sessionStorage.clear();
   ```

2. **Hard Refresh**
   - กด Ctrl+Shift+R (Windows/Linux)
   - กด Cmd+Shift+R (Mac)

3. **Restart Browser**
   - ปิดและเปิด browser ใหม่

4. **Check Network**
   - ตรวจสอบ internet connection
   - ลอง VPN หากจำเป็น

### การติดต่อขอความช่วยเหลือ

หากปัญหายังไม่หาย:

1. เปิด browser console (F12)
2. Copy error messages
3. Screenshot หน้าจอ
4. ระบุ:
   - Browser และ version
   - Operating system
   - Wallet ที่ใช้ (HashPack, MetaMask, etc.)
   - ขั้นตอนที่ทำก่อนเจอปัญหา

### Tips สำหรับการใช้งาน

1. **ใช้ Browser ที่รองรับ**
   - Chrome (แนะนำ)
   - Firefox
   - Safari
   - Edge

2. **ตรวจสอบ Extensions**
   - Disable ad blockers ชั่วคราว
   - ตรวจสอบ wallet extensions

3. **Network Stability**
   - ใช้ connection ที่เสถียร
   - หลีกเลี่ยง public WiFi

### Known Issues

1. **Attestation Service Downtime**
   - WalletConnect attestation service อาจมีปัญหาเป็นครั้งคราว
   - รอ 5-10 นาทีแล้วลองใหม่

2. **Rate Limiting**
   - หลีกเลี่ยงการคลิกปุ่มเชื่อมต่อหลายครั้งติดต่อกัน
   - รอให้ connection timeout ก่อนลองใหม่

3. **Browser Cache**
   - Clear browser cache เป็นประจำ
   - ใช้ incognito/private mode เพื่อทดสอบ 