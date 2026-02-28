import React, { useState } from 'react';
import { MILITARY_RANKS } from '../constants/militaryRanks';
import RankDetailModal from './RankDetailModal';

export default function MilitaryRankGallery() {
  const [filter, setFilter] = useState('すべて');
  const [selectedRank, setSelectedRank] = useState(null); // モーダル用

  // フィルタリング処理
  const filteredRanks = MILITARY_RANKS.filter(rank =>
    filter === 'すべて' || rank.category === filter
  );

  return (
    <div className="space-y-6">
      {/* --- フィルタリングタブ --- */}
      <div className="flex justify-center gap-2 mb-6">
        {['すべて', '文官', '武官'].map(cat => (
          <button
            key={cat}
            onClick={(e) => {
              e.stopPropagation();
              setFilter(cat);
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${filter === cat
                ? 'bg-purple-600 border-purple-400 text-white shadow-[0_0_15px_rgba(147,51,234,0.4)]'
                : 'bg-slate-900 border-slate-700 text-gray-500 hover:border-gray-500'
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* --- リスト表示エリア --- */}
      <div className="max-h-[500px] overflow-y-auto pr-2 space-y-4 custom-scrollbar">
        {filteredRanks.map((rank, index) => {
          const categoryIcon = rank.category === "文官" ? "📜" : "⚔️";
          return (
            <div
              key={index}
              onClick={() => setSelectedRank(rank)}
              className={`p-4 rounded-xl border border-white/10 ${rank.bg} cursor-pointer transition-all hover:scale-[1.02] hover:border-white/30 active:scale-95 group`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex gap-2 items-center">
                  <span className={`px-2 py-0.5 rounded text-[8px] font-bold border ${rank.color} border-current opacity-80`}>
                    {rank.category}
                  </span>
                  <span className={`text-[10px] font-black uppercase tracking-widest opacity-60 ${rank.color}`}>
                    {rank.grade}
                  </span>
                </div>
                <span className="text-[9px] text-gray-600 font-mono">DETAIL ➔</span>
              </div>

              <h3 className={`text-xl font-black mb-2 italic ${rank.color} flex items-center gap-2`}>
                <span className="text-base">{categoryIcon}</span>
                {rank.title}
              </h3>

              <div className="flex flex-wrap gap-2 mt-3">
                {rank.famous.map(name => (
                  <span key={name} className="px-2 py-1 bg-black/60 rounded text-[10px] text-gray-400 border border-white/5 inline-block">
                    {name}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* --- 2. 詳細表示モーダル --- */}
      {selectedRank && (
        <RankDetailModal
          rank={selectedRank}
          onClose={() => setSelectedRank(null)}
        />
      )}
    </div>
  );
}