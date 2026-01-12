import React, { useState, useEffect } from 'react';

const ThankYouToast = ({ isMonetized }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isMonetized) {
      setIsVisible(true);
      // 5秒後に自動で消える
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isMonetized]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-20 right-4 z-50 animate-bounce-in">
      <div className="relative bg-gradient-to-r from-yellow-900 to-yellow-700 p-1 rounded-xl shadow-[0_0_20px_rgba(234,179,8,0.5)] border border-yellow-500">
        <div className="bg-gray-900 px-6 py-3 rounded-lg flex items-center gap-4">
          {/* 武将アイコン風の装飾（諸葛亮など） */}
          <div className="text-3xl">📜</div>
          <div>
            <p className="text-yellow-500 text-xs font-bold tracking-widest uppercase">Support Detected</p>
            <p className="text-white font-bold">軍師殿、ご支援感謝いたしますぞ！</p>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="text-yellow-500/50 hover:text-yellow-500 ml-2"
          >
            ✕
          </button>
        </div>
        {/* 下部のゲージが減っていく演出（タイマー視覚化） */}
        <div className="absolute bottom-0 left-0 h-1 bg-yellow-500 animate-shrink-width" />
      </div>
    </div>
  );
};

export default ThankYouToast;