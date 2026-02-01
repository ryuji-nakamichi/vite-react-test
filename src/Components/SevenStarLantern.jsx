// src/Components/SevenStarLantern.jsx
import React from 'react';

const SevenStarLantern = ({ morale }) => {
  const isWeak = morale < 40; // 40以下で弱体化
  const isBlessed = morale > 120; // 延命成功

  return (
    <div className="flex flex-col items-center justify-center py-6 transition-all duration-1000">
      <div className="relative">
        {/* メインの灯火 */}
        <div className={`
          w-5 h-14 rounded-full blur-md transition-all duration-1000
          ${isBlessed ? 'bg-yellow-200 shadow-[0_0_30px_#fde047] scale-125' :
            isWeak ? 'bg-orange-900 opacity-30 scale-75 animate-pulse' :
              'bg-gradient-to-t from-orange-600 to-yellow-300 animate-flicker'}
        `} />

        {/* 周囲の7つの小さな灯り（七星） */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 rounded-full transition-all duration-1000
                ${isBlessed ? 'bg-yellow-400 shadow-[0_0_10px_white]' : 'bg-orange-500 opacity-60'}
                ${!isWeak && 'animate-flicker'}`}
              style={{
                top: `${50 + 40 * Math.sin((i * 2 * Math.PI) / 7)}%`,
                left: `${50 + 40 * Math.cos((i * 2 * Math.PI) / 7)}%`,
                animationDelay: `${i * 0.3}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* キャプション */}
      <p className={`mt-10 text-[10px] tracking-[0.4em] font-black uppercase transition-colors duration-1000 ${isWeak ? 'text-red-900' : isBlessed ? 'text-yellow-500' : 'text-gray-600'
        }`}>
        {isBlessed ? 'Heavenly Blessing' : isWeak ? 'Life in Danger' : 'Life Force Lanterns'}
      </p>
    </div>
  );
};

export default SevenStarLantern;