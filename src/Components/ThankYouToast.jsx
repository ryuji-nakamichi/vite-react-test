import React, { useState, useEffect } from 'react';

const ThankYouToast = ({ isMonetized }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenShown, setHasBeenShown] = useState(false);

  // 1. 表示のトリガー：isMonetizedがtrueになった瞬間、一度だけ発動
  useEffect(() => {
    if (isMonetized && !hasBeenShown) {
      setIsVisible(true);
      setHasBeenShown(true);
    }
  }, [isMonetized, hasBeenShown]);

  // 2. 消去のカウントダウン：isVisibleがtrueになった瞬間、5秒タイマーをセット
  useEffect(() => {
    let timer;
    if (isVisible) {
      timer = setTimeout(() => {
        setIsVisible(false);
      }, 5000);
    }
    // ここでクリーンアップ。isVisibleが変わらない限り、
    // 親の再レンダリングでこのタイマーが消されることはありません。
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-28 right-4 z-[100] animate-bounce-in">
      <div className="relative bg-gradient-to-r from-yellow-900 to-yellow-700 p-0.5 rounded-xl shadow-[0_0_20px_rgba(234,179,8,0.5)] border border-yellow-500">
        <div className="bg-gray-900 px-6 py-3 rounded-lg flex items-center gap-4">
          <div className="text-2xl animate-pulse">📜</div>
          <div>
            <p className="text-yellow-500 text-[10px] font-black tracking-widest uppercase opacity-70">Support Detected</p>
            <p className="text-white font-bold text-sm">軍師殿、ご支援感謝いたしますぞ！</p>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="text-yellow-500/50 hover:text-yellow-500 ml-2"
          >
            ✕
          </button>
        </div>
        {/* プログレスバー（5秒かけて右から左へ消える視覚演出） */}
        <div
          className="absolute bottom-0 left-0 h-0.5 bg-yellow-500 origin-left"
          style={{
            animation: 'shrink-width 5s linear forwards'
          }}
        />
      </div>
    </div>
  );
};

export default ThankYouToast;