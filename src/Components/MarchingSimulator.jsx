import React, { useState } from 'react';
import { MAJOR_LOCATIONS, TERRAIN_MULTIPLIER } from '../constants/mapData';

const SPEED = { INFANTRY: 30, CAVALRY: 50, LOGISTICS: 15 };

export default function MarchingSimulator() {
  const [startCity, setStartCity] = useState(null);
  const [endCity, setEndCity] = useState(null);

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

  return (
    <div className="p-4 bg-slate-900 text-white rounded-lg shadow-xl border border-yellow-700/50">
      <h2 className="text-xl font-bold text-yellow-500 mb-4">🗺️ 大陸行軍シミュレーター</h2>

      {/* SVG Map Area */}
      <div className="relative bg-slate-800 rounded border border-slate-700 h-64 mb-4 overflow-hidden">
        <svg viewBox="0 0 900 600" className="w-full h-full">
          {/* 拠点間の線（選択時のみ表示） */}
          {startCity && endCity && (
            <line
              x1={startCity.x} y1={startCity.y}
              x2={endCity.x} y2={endCity.y}
              stroke="#eab308" strokeWidth="2" strokeDasharray="5,5"
            />
          )}

          {/* 拠点の描画 */}
          {Object.values(MAJOR_LOCATIONS).map(city => (
            <g
              key={city.id}
              className="cursor-pointer"
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
                cx={city.x} cy={city.y} r="12"
                className={`transition-all ${startCity?.id === city.id ? 'fill-blue-500' :
                    endCity?.id === city.id ? 'fill-red-500' : 'fill-yellow-600'
                  }`}
              />
              <text x={city.x} y={city.y - 20} textAnchor="middle" className="fill-white text-[14px] font-bold">
                {city.name}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* 結果表示パネル */}
      <div className="bg-slate-950 p-4 rounded-md border border-slate-800">
        {!startCity ? (
          <p className="text-gray-400">出発地を選択してください...</p>
        ) : !endCity ? (
          <p className="text-blue-400">{startCity.name}からの目的地を選択してください...</p>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-bold">【 {startCity.name} → {endCity.name} 】</span>
              <button
                onClick={() => { setStartCity(null); setEndCity(null); }}
                className="text-xs bg-slate-700 px-2 py-1 rounded"
              >リセット</button>
            </div>
            <p className="text-sm text-gray-400 mb-4">{endCity.history}</p>

            {typeof travelInfo === 'object' ? (
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-slate-900 p-2 rounded border border-yellow-900/30">
                  <span className="text-[10px] text-gray-500 block">歩兵部隊</span>
                  <span className="text-xl text-yellow-500">{travelInfo.infantry}</span> 日
                </div>
                <div className="bg-slate-900 p-2 rounded border border-yellow-900/30">
                  <span className="text-[10px] text-gray-500 block">輸送隊（兵糧重視）</span>
                  <span className="text-xl text-orange-500">{travelInfo.logistics}</span> 日
                </div>
              </div>
            ) : (
              <p className="text-red-400">{travelInfo}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}