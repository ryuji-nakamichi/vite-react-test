import { useState, useEffect } from 'react';

export function useMonetization() {

  const [isMonetized, setIsMonetized] = useState(false); // 実際は false から開始
  // const [isMonetized, setIsMonetized] = useState(true); // テスト用
 
  useEffect(() => {
    // 定期的にチェックするタイマーを回す（遅延読み込み対策）
    const timer = setInterval(() => {
      if (document.monetization && document.monetization.state === 'started') {
        setIsMonetized(true);
        clearInterval(timer);
      }
    }, 500); // 0.5秒ごとにチェック

    // 通常のイベント監視も継続
    const handleStart = () => {
      setIsMonetized(true);
      clearInterval(timer);
    };

    document.monetization?.addEventListener('monetizationstart', handleStart);

    return () => {
      clearInterval(timer);
      document.monetization?.removeEventListener('monetizationstart', handleStart);
    };
  }, []);

  return isMonetized;
}