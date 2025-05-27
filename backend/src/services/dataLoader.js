const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

class DataLoader {
  constructor() {
    this.dataPath = path.join(__dirname, '../../../frontend/data/hbardata.csv');
  }

  // อ่านข้อมูล CSV
  async loadHBARData() {
    return new Promise((resolve, reject) => {
      const results = [];
      
      if (!fs.existsSync(this.dataPath)) {
        reject(new Error(`ไม่พบไฟล์ข้อมูล: ${this.dataPath}`));
        return;
      }

      fs.createReadStream(this.dataPath)
        .pipe(csv({ separator: ';' })) // ใช้ semicolon เป็น separator
        .on('data', (data) => {
          try {
            // แปลงข้อมูลให้อยู่ในรูปแบบที่ใช้งานได้
            const processedData = {
              timestamp: data.timestamp,
              timeOpen: data.timeOpen,
              timeClose: data.timeClose,
              timeHigh: data.timeHigh,
              timeLow: data.timeLow,
              name: data.name,
              open: parseFloat(data.open),
              high: parseFloat(data.high),
              low: parseFloat(data.low),
              close: parseFloat(data.close),
              volume: parseFloat(data.volume),
              marketCap: parseFloat(data.marketCap),
              date: new Date(data.timestamp)
            };
            
            // ตรวจสอบว่าข้อมูลถูกต้อง
            if (!isNaN(processedData.close) && !isNaN(processedData.high) && 
                !isNaN(processedData.low) && !isNaN(processedData.open)) {
              results.push(processedData);
            }
          } catch (error) {
            console.error('Error processing row:', error);
          }
        })
        .on('end', () => {
          // เรียงข้อมูลตามวันที่ (เก่าสุดก่อน)
          results.sort((a, b) => a.date - b.date);
          resolve(results);
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  }

  // กรองข้อมูลตามช่วงวันที่
  filterDataByDateRange(data, startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    return data.filter(item => {
      const itemDate = new Date(item.timestamp);
      return itemDate >= start && itemDate <= end;
    });
  }

  // กรองข้อมูลตามจำนวนวันล่าสุด
  getRecentData(data, days = 365) {
    if (data.length <= days) {
      return data;
    }
    
    return data.slice(-days);
  }

  // คำนวณสถิติพื้นฐาน
  calculateBasicStats(data) {
    const closes = data.map(d => d.close);
    const volumes = data.map(d => d.volume);
    const marketCaps = data.map(d => d.marketCap);
    
    const calculateStats = (arr) => {
      const sorted = [...arr].sort((a, b) => a - b);
      const sum = arr.reduce((a, b) => a + b, 0);
      const mean = sum / arr.length;
      const variance = arr.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / arr.length;
      
      return {
        min: Math.min(...arr),
        max: Math.max(...arr),
        mean: mean,
        median: sorted[Math.floor(sorted.length / 2)],
        std: Math.sqrt(variance),
        count: arr.length
      };
    };

    return {
      price: calculateStats(closes),
      volume: calculateStats(volumes),
      marketCap: calculateStats(marketCaps),
      dateRange: {
        start: data[0]?.timestamp,
        end: data[data.length - 1]?.timestamp,
        totalDays: data.length
      }
    };
  }

  // เตรียมข้อมูลสำหรับการวิเคราะห์
  prepareAnalysisData(data, options = {}) {
    const {
      days = null,
      startDate = null,
      endDate = null,
      includeVolume = true,
      includeMarketCap = true
    } = options;

    let filteredData = [...data];

    // กรองตามวันที่ถ้าระบุ
    if (startDate && endDate) {
      filteredData = this.filterDataByDateRange(filteredData, startDate, endDate);
    } else if (days) {
      filteredData = this.getRecentData(filteredData, days);
    }

    // เตรียมข้อมูลในรูปแบบที่ใช้งานง่าย
    const analysisData = filteredData.map(item => {
      const result = {
        timestamp: item.timestamp,
        date: item.date,
        open: item.open,
        high: item.high,
        low: item.low,
        close: item.close
      };

      if (includeVolume) {
        result.volume = item.volume;
      }

      if (includeMarketCap) {
        result.marketCap = item.marketCap;
      }

      return result;
    });

    return {
      data: analysisData,
      stats: this.calculateBasicStats(filteredData),
      metadata: {
        totalRecords: analysisData.length,
        dateRange: {
          start: analysisData[0]?.timestamp,
          end: analysisData[analysisData.length - 1]?.timestamp
        },
        currentPrice: analysisData[analysisData.length - 1]?.close
      }
    };
  }

  // ตรวจสอบคุณภาพข้อมูล
  validateData(data) {
    const issues = [];
    
    if (!data || data.length === 0) {
      issues.push('ไม่มีข้อมูล');
      return { isValid: false, issues };
    }

    // ตรวจสอบข้อมูลที่ขาดหาย
    const missingData = data.filter(item => 
      isNaN(item.close) || isNaN(item.high) || isNaN(item.low) || isNaN(item.open)
    );
    
    if (missingData.length > 0) {
      issues.push(`ข้อมูลราคาขาดหาย ${missingData.length} รายการ`);
    }

    // ตรวจสอบข้อมูลที่ผิดปกติ
    const invalidPrices = data.filter(item => 
      item.high < item.low || 
      item.close < 0 || 
      item.open < 0 ||
      item.high < item.close ||
      item.low > item.close
    );

    if (invalidPrices.length > 0) {
      issues.push(`ข้อมูลราคาผิดปกติ ${invalidPrices.length} รายการ`);
    }

    // ตรวจสอบความต่อเนื่องของวันที่
    const dates = data.map(d => new Date(d.timestamp).getTime()).sort();
    const gaps = [];
    
    for (let i = 1; i < dates.length; i++) {
      const dayDiff = (dates[i] - dates[i-1]) / (1000 * 60 * 60 * 24);
      if (dayDiff > 2) { // ช่วงห่างมากกว่า 2 วัน
        gaps.push(dayDiff);
      }
    }

    if (gaps.length > 0) {
      issues.push(`พบช่วงข้อมูลขาดหาย ${gaps.length} ช่วง`);
    }

    return {
      isValid: issues.length === 0,
      issues: issues,
      stats: {
        totalRecords: data.length,
        missingPrices: missingData.length,
        invalidPrices: invalidPrices.length,
        dateGaps: gaps.length
      }
    };
  }
}

// Create instance for convenience function
const dataLoaderInstance = new DataLoader();

// Export both class and convenience function
module.exports = {
  DataLoader,
  loadHBARData: () => dataLoaderInstance.loadHBARData()
}; 