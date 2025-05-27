const { SMA, EMA, MACD, RSI, BollingerBands, ATR } = require('technicalindicators');

class TechnicalIndicators {
  static calculateSMA(prices, period = 14) {
    return SMA.calculate({
      period: period,
      values: prices
    });
  }

  static calculateEMA(prices, period = 14) {
    return EMA.calculate({
      period: period,
      values: prices
    });
  }

  static calculateMACD(prices, fastPeriod = 12, slowPeriod = 26, signalPeriod = 9) {
    const macdData = MACD.calculate({
      values: prices,
      fastPeriod: fastPeriod,
      slowPeriod: slowPeriod,
      signalPeriod: signalPeriod,
      SimpleMAOscillator: false,
      SimpleMASignal: false
    });

    return {
      macd: macdData.map(d => d.MACD),
      signal: macdData.map(d => d.signal),
      histogram: macdData.map(d => d.histogram)
    };
  }

  static calculateRSI(prices, period = 14) {
    return RSI.calculate({
      values: prices,
      period: period
    });
  }

  static calculateBollingerBands(prices, period = 20, stdDev = 2) {
    const bbData = BollingerBands.calculate({
      period: period,
      values: prices,
      stdDev: stdDev
    });

    return {
      upper: bbData.map(d => d.upper),
      middle: bbData.map(d => d.middle),
      lower: bbData.map(d => d.lower)
    };
  }

  static calculateATR(high, low, close, period = 14) {
    const input = high.map((h, i) => ({
      high: h,
      low: low[i],
      close: close[i]
    }));

    return ATR.calculate({
      period: period,
      high: high,
      low: low,
      close: close
    });
  }

  static calculateAllIndicators(data) {
    const closes = data.map(d => d.close);
    const highs = data.map(d => d.high);
    const lows = data.map(d => d.low);

    // คำนวณ indicators ทั้งหมด
    const sma14 = this.calculateSMA(closes, 14);
    const ema14 = this.calculateEMA(closes, 14);
    const macd = this.calculateMACD(closes);
    const rsi14 = this.calculateRSI(closes, 14);
    const bb = this.calculateBollingerBands(closes, 20, 2);
    const atr14 = this.calculateATR(highs, lows, closes, 14);

    // จัดรูปแบบข้อมูลให้ตรงกับ index
    const result = data.map((item, index) => {
      const indicators = {
        timestamp: item.timestamp,
        close: item.close,
        high: item.high,
        low: item.low,
        open: item.open,
        volume: item.volume
      };

      // เพิ่ม indicators ที่คำนวณได้
      if (index >= 13) { // SMA และ EMA เริ่มที่ index 13 (period 14)
        indicators.sma14 = sma14[index - 13];
        indicators.ema14 = ema14[index - 13];
      }

      if (index >= 25) { // MACD เริ่มที่ index 25 (slow period 26)
        const macdIndex = index - 25;
        if (macd.macd[macdIndex] !== undefined) {
          indicators.macd = macd.macd[macdIndex];
          indicators.macdSignal = macd.signal[macdIndex];
          indicators.macdHistogram = macd.histogram[macdIndex];
        }
      }

      if (index >= 13) { // RSI เริ่มที่ index 13 (period 14)
        indicators.rsi14 = rsi14[index - 13];
      }

      if (index >= 19) { // Bollinger Bands เริ่มที่ index 19 (period 20)
        const bbIndex = index - 19;
        if (bb.upper[bbIndex] !== undefined) {
          indicators.bbUpper = bb.upper[bbIndex];
          indicators.bbMiddle = bb.middle[bbIndex];
          indicators.bbLower = bb.lower[bbIndex];
        }
      }

      if (index >= 13) { // ATR เริ่มที่ index 13 (period 14)
        indicators.atr14 = atr14[index - 13];
      }

      return indicators;
    });

    return result;
  }
}

module.exports = TechnicalIndicators; 