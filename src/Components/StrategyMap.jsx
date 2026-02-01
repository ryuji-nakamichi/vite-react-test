import React from 'react';
import { useNavigate } from 'react-router-dom'; // ★ 追加

const StrategyMap = ({ visitedBranches = [] }) => {
  const navigate = useNavigate(); // ★ 追加

  const isFanchengCleared = visitedBranches.includes('win-fancheng');
  const isYilingCleared = visitedBranches.includes('win-yiling');

  // ★ 拠点クリック時の遷移ハンドラ
  const handlePointClick = (battleId) => {
    navigate(`/battle/${battleId}`);
  };

  return (
    <div className="w-full aspect-video bg-slate-950 rounded-3xl border-2 border-gray-800 relative overflow-hidden shadow-2xl group">
      {/* ここからがSVGの本体です。
        viewBoxで 800 x 600 の仮想座標を定義しています。
      */}
      <svg
        viewBox="0 0 800 600"
        className="w-full h-full select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 1. 背景（海） */}
        <rect width="800" height="600" fill="#0f172a" />

        {/* 2. 大陸のシルエット */}
        <path
          d="M 100 150 L 650 100 Q 780 250 720 450 L 580 550 L 250 520 Q 50 350 100 150 Z"
          fill="#1e293b"
          stroke="#334155"
          strokeWidth="3"
        />

        {/* 3. 黄河（北） */}
        <path
          d="M 120 200 Q 250 120 400 180 T 700 150"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="3"
          opacity="0.4"
          strokeLinecap="round"
        />

        {/* 4. 長江（南） */}
        <path
          d="M 100 420 Q 300 380 450 450 T 750 420"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="5"
          opacity="0.6"
          strokeLinecap="round"
        />

        {/* --- 拠点レイヤー --- */}

        {/* 樊城 (Fancheng) */}
        <g
          onClick={() => handlePointClick('fancheng_shu')}
          className="cursor-pointer pointer-events-auto hover:opacity-80 transition-opacity"
        >
          <circle
            cx="420" cy="300" r="20"
            className={isFanchengCleared ? "fill-blue-500/30 animate-ping" : "fill-transparent"}
          />
          <circle
            cx="420" cy="300" r="10"
            className={isFanchengCleared ? "fill-blue-500 animate-pulse" : "fill-gray-700"}
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="2"
          />
          <text x="420" y="275" textAnchor="middle" fill="#9ca3af" fontSize="10" fontWeight="black" className="uppercase italic">
            Fancheng {isFanchengCleared ? '⚔️' : ''}
          </text>
        </g>

        {/* 夷陵 (Yiling) */}
        <g
          onClick={() => handlePointClick('yiling_shu')}
          className="cursor-pointer pointer-events-auto hover:opacity-80 transition-opacity"
        >
          <circle
            cx="300" cy="430" r="20"
            className={isYilingCleared ? "fill-red-500/30 animate-ping" : "fill-transparent"}
          />
          <circle
            cx="300" cy="430" r="10"
            className={isYilingCleared ? "fill-red-500 animate-pulse" : "fill-gray-700"}
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="2"
          />
          <text x="300" y="460" textAnchor="middle" fill="#9ca3af" fontSize="10" fontWeight="black" className="uppercase italic">
            Yiling {isYilingCleared ? '🔥' : ''}
          </text>
        </g>

        {/* 成都（蜀の首都） */}
        <circle cx="200" cy="380" r="6" fill="#0f172a" stroke="#334155" strokeWidth="2" />
        <text x="200" y="370" textAnchor="middle" fill="#4b5563" fontSize="8" fontWeight="bold">CHENGDU</text>
      </svg>

      {/* 戦略レポートのオーバーレイ */}
      <div className="absolute top-4 left-4 pointer-events-none">
        <div className="bg-black/50 backdrop-blur-sm border-l-2 border-blue-500 p-3 rounded-r-xl">
          <h3 className="text-blue-400 text-[10px] font-black tracking-[0.3em] uppercase mb-1">Strategic Overview</h3>
          <p className="text-gray-200 text-xs font-serif italic">
            {isFanchengCleared && isYilingCleared
              ? "荊州・峡江の要衝を確保。蜀の威信は盤石なり。"
              : "天下は未だ混迷の中。軍師の采配が待たれる。"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StrategyMap;