import React, { useMemo } from 'react';

const GoldParticles = ({ count = 30 }) => {
  // 粒子の配列をメモ化（再レンダリングで動きが変わらないように）
  const particles = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100, // 横位置 (0-100%)
      size: Math.random() * 4 + 2, // サイズ (2px-6px)
      duration: Math.random() * 3 + 2, // 上昇時間 (2s-5s)
      delay: Math.random() * 5, // 開始ディレイ
      opacity: Math.random() * 0.5 + 0.3, // 透明度
    }));
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute bottom-0 bg-yellow-400 rounded-full animate-gold-float shadow-[0_0_8px_rgba(250,204,21,0.8)]"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default GoldParticles;