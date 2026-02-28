import React from 'react';
import { Link } from 'react-router-dom';

export default function RankDetailModal({ rank, onClose }) {
  if (!rank) return null;
  const categoryIcon = rank.category === "文官" ? "📜" : "⚔️";

  // --- 陣営ごとのスタイル定義 ---
  const campStyles = {
    "魏": { label: "魏", color: "text-blue-400", border: "border-blue-500/40", glow: "shadow-blue-500/20" },
    "蜀": { label: "蜀", color: "text-green-400", border: "border-green-500/40", glow: "shadow-green-500/20" },
    "呉": { label: "呉", color: "text-red-400", border: "border-red-500/40", glow: "shadow-red-500/20" },
    "漢": { label: "漢", color: "text-yellow-400", border: "border-yellow-500/40", glow: "shadow-yellow-500/20" }
  };

  // 配列の1番目を「代表陣営」としてスタイルを決定
  const primaryCampName = Array.isArray(rank.camp) ? rank.camp[0] : rank.camp;
  const currentCamp = campStyles[primaryCampName] || campStyles["漢"];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in" onClick={onClose}>
      {/* モーダル本体（内側クリックで閉じないように stopPropagation） */}
      <div
        className={`relative w-full max-w-lg p-8 rounded-3xl border-2 ${rank.bg} border-white/20 shadow-2xl overflow-hidden`}
        onClick={(e) => e.stopPropagation()}
      >

        {/* 背景の巨大文字（代表陣営） */}
        <div className="absolute -left-4 -bottom-4 text-[180px] font-black opacity-[0.03] select-none pointer-events-none">
          {currentCamp.label}
        </div>

        <button onClick={onClose} className="absolute top-4 right-6 text-gray-500 hover:text-white text-3xl">×</button>

        <div className="text-center mb-6">
          {/* ★ 修正：所属するすべての陣営バッジを並べて表示 */}
          <div className="flex justify-center items-center gap-1.5 mb-2">
            {(Array.isArray(rank.camp) ? rank.camp : [rank.camp]).map(c => (
              <span
                key={c}
                className={`px-1.5 py-0.5 rounded border ${campStyles[c]?.border || 'border-gray-500'} ${campStyles[c]?.color || 'text-gray-500'} text-[7px] font-black`}
              >
                {c}
              </span>
            ))}
          </div>

          <span className={`text-[10px] font-black tracking-[0.4em] uppercase opacity-50 ${rank.color}`}>
            {rank.category} • {rank.grade}
          </span>
          <h2 className={`text-3xl font-black italic mt-2 ${rank.color} tracking-tighter`}>
            {rank.title}
          </h2>
        </div>

        {/* 画像プレースホルダー（将来のAI画像用） */}
        <div className="w-full h-44 bg-slate-900/80 rounded-2xl border border-dashed border-white/10 flex flex-col items-center justify-center mb-6 relative group overflow-hidden">
          <span className="text-5xl opacity-10 group-hover:scale-110 transition-transform duration-700">{categoryIcon}</span>
          <p className="text-[9px] text-gray-600 mt-3 font-serif italic tracking-widest">
            現在、絵師が当時の装束を編纂中...
          </p>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-black/40 p-3 rounded-xl border border-white/5 text-center">
            <h5 className="text-[8px] text-gray-500 uppercase tracking-widest mb-1">俸禄（石高）</h5>
            <p className="text-sm font-bold text-yellow-600 font-serif">{rank.salary || "不明"}</p>
          </div>
          <div className="bg-black/40 p-3 rounded-xl border border-white/5 text-center">
            <h5 className="text-[8px] text-gray-500 uppercase tracking-widest mb-1">権限レベル</h5>
            <div className="flex justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-xs transition-all duration-500 ${i < (rank.authority || 0)
                      ? "text-yellow-500 drop-shadow-[0_0_5px_rgba(234,179,8,0.6)] scale-110"
                      : "text-gray-800 opacity-30"
                    }`}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <section className="bg-black/20 p-4 rounded-xl border border-white/5">
            <h4 className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-2 border-b border-white/5 pb-1">官職の由来・権限</h4>
            <p className="text-gray-300 text-xs leading-relaxed font-serif">
              {rank.description}
            </p>
          </section>

          <section>
            <h4 className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-3">歴史上の主な叙任者</h4>
            <div className="flex flex-wrap gap-2">
              {rank.famous.map(name => (
                <Link
                  key={name}
                  // 武将名鑑ページへ、名前をクエリパラメータとして渡す（将来的な検索連携のため）
                  to={`/dic/list?search=${encodeURIComponent(name)}`}
                  className="px-3 py-1.5 bg-white/5 rounded-lg border border-white/10 text-[11px] text-white font-bold 
                             hover:bg-yellow-900/40 hover:border-yellow-500/50 hover:text-yellow-400 transition-all 
                             flex items-center gap-1 group/name"
                  onClick={(e) => e.stopPropagation()} // モーダルが閉じるのを防ぎつつ遷移
                >
                  {name}
                  <span className="text-[8px] opacity-0 group-hover/name:opacity-100 transition-opacity">➔</span>
                </Link>
              ))}
            </div>
          </section>
        </div>

        <button
          onClick={onClose}
          className={`w-full mt-8 py-4 rounded-xl font-black transition-all border-b-4 active:border-b-0 active:translate-y-1 ${rank.bg} border-white/10 text-white text-sm tracking-widest`}
        >
          閉じる
        </button>
      </div>
    </div>
  );
}