// src/Components/MilitaryRankGallery.jsx
import React from 'react';
import { MILITARY_RANKS } from '../constants/militaryRanks';

export default function MilitaryRankGallery() {
  return (
    <div className="max-h-[500px] overflow-y-auto pr-2 space-y-4 custom-scrollbar">
      {MILITARY_RANKS.map((rank, index) => {
        // --- カテゴリに応じたアイコンを定義 ---
        const categoryIcon = rank.category === "文官" ? "📜" : "⚔️";

        return (
          <div
            key={index}
            className={`p-4 rounded-xl border border-white/10 ${rank.bg} transition-all hover:border-white/30`}
          >
            <div className="flex justify-between items-center mb-2">
              <div className="flex gap-2 items-center">
                <span className={`px-2 py-0.5 rounded text-[8px] font-bold border ${rank.color} border-current opacity-80`}>
                  {rank.category}
                </span>
                <span className={`text-[10px] font-black uppercase tracking-widest opacity-60 ${rank.color}`}>
                  {rank.grade}
                </span>
              </div>
              <span className="text-[10px] text-gray-500 font-mono">Rank ID: 00{index + 1}</span>
            </div>

            {/* ★ アイコンを表示するように修正 */}
            <h3 className={`text-xl font-black mb-2 italic ${rank.color} flex items-center gap-2`}>
              <span className="text-base filter saturate-50">{categoryIcon}</span>
              {rank.title}
            </h3>

            <p className="text-gray-300 text-[11px] leading-relaxed mb-3">
              {rank.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {rank.famous.map(name => (
                <span
                  key={name}
                  className="px-2 py-1 bg-black/60 rounded text-[10px] text-gray-400 border border-white/5 inline-block"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}