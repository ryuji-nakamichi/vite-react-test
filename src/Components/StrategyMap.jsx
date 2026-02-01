// src/Components/StrategyMap.jsx
import { useNavigate } from 'react-router-dom';
import { BATTLES } from '../data/battles'; // ★ 合戦データをインポート

const StrategyMap = ({ visitedBranches = [] }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full aspect-video bg-slate-950 rounded-3xl border-2 border-gray-800 relative overflow-hidden shadow-2xl group">
      <svg
        viewBox="0 0 800 600"
        className="w-full h-full select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="800" height="600" fill="#0f172a" />

        {/* 大陸と河川の描画（ここは共通） */}
        <path d="M 100 150 L 650 100 Q 780 250 720 450 L 580 550 L 250 520 Q 50 350 100 150 Z" fill="#1e293b" stroke="#334155" strokeWidth="3" />
        <path d="M 120 200 Q 250 120 400 180 T 700 150" fill="none" stroke="#3b82f6" strokeWidth="3" opacity="0.4" />
        <path d="M 100 420 Q 300 380 450 450 T 750 420" fill="none" stroke="#3b82f6" strokeWidth="5" opacity="0.6" />

        {/* ★ ここから：合戦データを配列化（Object.entries）してループ描画 */}
        {Object.entries(BATTLES).map(([id, battle]) => {
          const isCleared = visitedBranches.includes(battle.branchId);

          // 色指定の動的生成 (Tailwindのクラス名は文字列連結だと効かない場合があるため、styleまたは固定色を使用)
          const dotColor = isCleared ? (
            battle.mapColor === 'blue' ? '#3b82f6' :
              battle.mapColor === 'red' ? '#ef4444' :
                battle.mapColor === 'indigo' ? '#6366f1' :
                  battle.mapColor === 'emerald' ? '#10b981' :
                    battle.mapColor === 'amber' ? '#f59e0b' :
                      battle.mapColor === 'purple' ? '#a855f7' : '#3b82f6'
          ) : '#374151'; // 未踏はグレー

          return (
            <g
              key={id}
              onClick={() => navigate(`/battle/${id}`)}
              className="cursor-pointer pointer-events-auto hover:opacity-80 transition-opacity"
            >
              {/* 波紋エフェクト */}
              <circle
                cx={battle.mapX} cy={battle.mapY} r="20"
                fill={dotColor}
                className={isCleared ? "opacity-20 animate-ping" : "opacity-0"}
              />
              {/* 拠点本体 */}
              <circle
                cx={battle.mapX} cy={battle.mapY} r="10"
                fill={dotColor}
                className={isCleared ? "animate-pulse" : ""}
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="2"
              />
              {/* ラベル */}
              <text
                x={battle.mapX} y={battle.mapY - 25}
                textAnchor="middle" fill="#9ca3af" fontSize="10" fontWeight="black"
                className="uppercase italic"
              >
                {battle.title.split(' - ')[0]} {isCleared ? battle.icon : ''}
              </text>
            </g>
          );
        })}

        {/* 装飾用の固定地点（首都など） */}
        <circle cx="200" cy="380" r="6" fill="#0f172a" stroke="#334155" strokeWidth="2" />
        <text x="200" y="370" textAnchor="middle" fill="#4b5563" fontSize="8" fontWeight="bold">CHENGDU</text>
      </svg>

      {/* オーバーレイ（共通） */}
      <div className="absolute top-4 left-4 pointer-events-none">
        <div className="bg-black/50 backdrop-blur-sm border-l-2 border-blue-500 p-3 rounded-r-xl">
          <h3 className="text-blue-400 text-[10px] font-black tracking-[0.3em] uppercase mb-1">Strategic Overview</h3>
          <p className="text-gray-200 text-xs font-serif italic">
            現在の支配地域を確認し、次なる戦場を選択せよ。
          </p>
        </div>
      </div>
    </div>
  );
};

export default StrategyMap;