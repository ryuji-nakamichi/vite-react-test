// src/Components/BattleGauge.jsx

import React from 'react';

const BattleGauge = ({ label, value, maxValue, type }) => {
  // パーセンテージ計算（0〜100に収める）
  const percentage = Math.max(0, Math.min(100, (value / maxValue) * 100));

  // ゲージの色設定
  // troops（兵数）は赤〜オレンジ系、morale（士気）は青〜紫系
  const config = {
    troops: {
      barColor: 'bg-gradient-to-r from-red-600 to-orange-500',
      shadow: 'shadow-red-500/40',
      icon: '⚔️'
    },
    morale: {
      barColor: 'bg-gradient-to-r from-blue-600 to-indigo-500',
      shadow: 'shadow-blue-500/40',
      icon: '🔥'
    }
  };

  const currentTheme = config[type] || config.troops;

  return (
    <div className="w-full mb-4 group">
      {/* ラベルと数値の表示 */}
      <div className="flex justify-between items-end mb-1.5 px-1">
        <div className="flex items-center gap-1.5">
          <span className="text-sm">{currentTheme.icon}</span>
          <span className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-tighter">
            {label}
          </span>
        </div>
        <div className="font-mono text-[10px] sm:text-sm">
          <span className="text-white font-bold">{value.toLocaleString()}</span>
          <span className="text-gray-600 mx-1">/</span>
          <span className="text-gray-500">{maxValue.toLocaleString()}</span>
        </div>
      </div>

      {/* ゲージ本体 */}
      <div className="w-full bg-gray-950 rounded-full h-3 sm:h-4 border border-gray-800 overflow-hidden shadow-inner p-[1px]">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${currentTheme.barColor} ${currentTheme.shadow} shadow-sm 
            ${percentage <= 20 ? 'animate-pulse' : ''} // 20%以下で点滅
          `}
          style={{ width: `${percentage}%` }}
        >
          {/* 光沢エフェクト */}
          <div className="w-full h-1/2 bg-white/10 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default BattleGauge;