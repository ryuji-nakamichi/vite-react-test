import React, { useState } from 'react';
import { MAJOR_LOCATIONS, TERRAIN_MULTIPLIER } from '../constants/mapData';
import { useMonetization } from '../hooks/useMonetization';

const SPEED = { INFANTRY: 30, CAVALRY: 50, LOGISTICS: 15 };

const BOOST_COST = 0.00000005; // 急行軍のコスト

export default function MarchingSimulator() {
  const { totalReceived } = useMonetization();
  const [isExpress, setIsExpress] = useState(false); // 急行軍モードの状態

  const [startCity, setStartCity] = useState(null);
  const [endCity, setEndCity] = useState(null);

  // モーダル側と共通の localStorage キーを使用
  const [totalSpent, setTotalSpent] = useState(() =>
    Number(localStorage.getItem('marchingApp_totalSpent') || '0')
  );

  const currentBalance = totalReceived - totalSpent;

  // 急行軍の発動
  const handleBoost = () => {
    if (currentBalance >= BOOST_COST && !isExpress) {
      const nextSpent = totalSpent + BOOST_COST;
      setTotalSpent(nextSpent);
      localStorage.setItem('marchingApp_totalSpent', nextSpent.toString());
      setIsExpress(true);

      // 一定時間（例：5秒）で急行軍の効果が切れる演出
      setTimeout(() => setIsExpress(false), 5000);
    }
  };
  

  // 行軍日数を計算する内部関数
  const getTravelDays = (start, end) => {
    if (!start || !end || start.id === end.id) return null;

    // 直接の距離データがあるかチェック
    const distance = start.distances[end.id] || end.distances[start.id];
    if (!distance) return "不明（直通路なし）";

    const terrain = end.terrain; // 目的地側の地形で補正（簡易化）
    const multiplier = TERRAIN_MULTIPLIER[terrain] || 1.0;

    return {
      infantry: Math.ceil((distance * multiplier) / SPEED.INFANTRY),
      logistics: Math.ceil((distance * multiplier) / SPEED.LOGISTICS)
    };
  };

  const travelInfo = getTravelDays(startCity, endCity);

  // --- アニメーション用のパス生成 ---
  const pathD = startCity && endCity ? `M ${startCity.x} ${startCity.y} L ${endCity.x} ${endCity.y}` : "";

  // アニメーション速度の計算（急行軍時は半分にする）
  const baseDuration = travelInfo && typeof travelInfo === 'object'
    ? Math.max(2, Math.min(10, travelInfo.infantry / 10))
    : 3;
  const animationDuration = `${isExpress ? baseDuration / 2 : baseDuration}s`;

  return (
    <div className="p-4 bg-slate-900 text-white rounded-lg shadow-xl border border-yellow-700/50">

      {/* CSSアニメーションの注入 */}
      <style>{`
        @keyframes marchingAnts {
          from { stroke-dashoffset: 20; }
          to { stroke-dashoffset: 0; }
        }
        .marching-path {
          animation: marchingAnts 1s linear infinite;
        }
      `}</style>

      <h2 className="text-xl font-bold text-yellow-500 mb-4">🗺️ 大陸行軍シミュレーター</h2>

      {/* SVG Map Area */}
      <div className="relative bg-slate-800 rounded border border-slate-700 h-64 mb-4 overflow-hidden">
        <svg viewBox="0 0 900 600" className="w-full h-full">
          {/* 背景の薄いグリッドや装飾（任意） */}

          {startCity && endCity && (
            <g>
              {/* 1. 動く破線（兵站ライン） */}
              <path
                d={pathD}
                stroke="#eab308"
                strokeWidth="3"
                strokeDasharray="10, 10"
                fill="none"
                className="marching-path"
                opacity="0.6"
              />

              {/* 2. 動く軍勢ユニット（駒） */}
              <circle r="8" fill={isExpress ? "#f97316" : "#ef4444"} className={isExpress ? "animate-pulse shadow-[0_0_15px_rgba(249,115,22,0.8)]" : "shadow-lg"}>
                <animateMotion dur={animationDuration} repeatCount="indefinite" path={pathD} />
              </circle>
            </g>
          )}

          {Object.values(MAJOR_LOCATIONS).map(city => (
            <g
              key={city.id}
              className="cursor-pointer group"
              onClick={() => {
                if (!startCity || (startCity && endCity)) {
                  setStartCity(city);
                  setEndCity(null);
                } else {
                  setEndCity(city);
                }
              }}
            >
              <circle
                cx={city.x} cy={city.y} r="14"
                className={`transition-all duration-300 ${startCity?.id === city.id ? 'fill-blue-500 ring-4 ring-blue-500/50' :
                    endCity?.id === city.id ? 'fill-red-500 ring-4 ring-red-500/50' :
                      'fill-yellow-600 hover:fill-yellow-500'
                  }`}
              />
              <text x={city.x} y={city.y - 25} textAnchor="middle" className="fill-white text-[16px] font-black pointer-events-none drop-shadow-md">
                {city.name}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* 結果表示パネル */}
      <div className="bg-slate-950 p-4 rounded-md border border-slate-800 mt-4">
        {/* 結果表示パネル */}
        {travelInfo && typeof travelInfo === 'object' && (
          <div className="mt-4 flex flex-col gap-3">
            <div className="flex justify-between items-center text-[10px] text-gray-500">
              <span>軍資金残高: {currentBalance.toFixed(9)}</span>
              <span>急行軍コスト: {BOOST_COST.toFixed(8)}</span>
            </div>

            <button
              onClick={handleBoost}
              disabled={isExpress || currentBalance < BOOST_COST}
              className={`w-full py-2 rounded-lg font-black transition-all ${isExpress ? 'bg-orange-600 animate-pulse' :
                  currentBalance >= BOOST_COST ? 'bg-amber-700 hover:bg-amber-600' : 'bg-gray-800 opacity-50 cursor-not-allowed'
                }`}
            >
              {isExpress ? "🐎 急行軍発動中！" : "⚔️ 兵糧を消費して急行軍"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}