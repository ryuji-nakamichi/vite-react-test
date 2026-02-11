import { useState, useEffect } from 'react';

export function useMonetization() {
  // 1. 起動時に localStorage からセーブデータを読み込む（なければ 0）
  const [totalReceived, setTotalReceived] = useState(() => {
    const saved = localStorage.getItem('war_funds_total');
    return saved ? parseFloat(saved) : 0;
  });

  const [isMonetized, setIsMonetized] = useState(true); // テスト用
  const [currency, setCurrency] = useState('EUR');

  // 2. totalReceived が変化するたびに自動でセーブ
  useEffect(() => {
    localStorage.setItem('war_funds_total', totalReceived.toString());
  }, [totalReceived]);

  useEffect(() => {
    // テスト用タイマー（1秒ごとに加算）
    const testTimer = setInterval(() => {
      setTotalReceived(prev => prev + 0.000000001);
    }, 1000);

    if (document.monetization) {
      const handleProgress = (e) => {
        const { amount, assetScale, assetCode } = e.detail;
        setIsMonetized(true);
        setCurrency(assetCode);
        const increment = parseFloat(amount) / Math.pow(10, assetScale);
        setTotalReceived(prev => prev + increment);
      };

      document.monetization.addEventListener('monetizationprogress', handleProgress);
      return () => {
        clearInterval(testTimer);
        document.monetization.removeEventListener('monetizationprogress', handleProgress);
      };
    }

    return () => clearInterval(testTimer);
  }, []);

  return { isMonetized, totalReceived, currency };
}