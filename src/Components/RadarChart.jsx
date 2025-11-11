// src/Components/RadarChart.jsx

import React, { useState, useEffect } from 'react';

// グラフの定数定義
const MAX_VAL = 100;
const ANIMATION_DURATION = 1000; // 1000ms = 1秒

/**
 * 武将の能力値をレーダーチャートで表示するコンポーネント
 * @param {object} stats - 6つの能力値 {strength, intelligence, charisma, politics, command, strategy}
 * @param {string} color - グラフの塗りつぶし色 (例: 'fill-green-500')
 * @param {number} size - グラフのサイズ (SVGのviewBoxに対応)
 */
const RadarChart = ({ stats, color = 'fill-red-500', size = 300 }) => {
  // グラフの軸とラベル
  const axes = [
      { name: '武力', key: 'strength' },
      { name: '統率', key: 'command' },
      { name: '魅力', key: 'charisma' },
      { name: '政治', key: 'politics' },
      { name: '知力', key: 'intelligence' },
      { name: '策略', key: 'strategy' },
  ];

  // ★ アニメーション用の状態を定義 ★
  const [animatedStats, setAnimatedStats] = useState({
      strength: 0, intelligence: 0, charisma: 0,
      politics: 0, command: 0, strategy: 0
  });

  // コンポーネントがマウントされた後にアニメーションを開始
    useEffect(() => {
        // 1. 開始時間と現在の能力値をセット
        const startTime = Date.now();
        const startStats = {
            strength: 0, intelligence: 0, charisma: 0,
            politics: 0, command: 0, strategy: 0
        };
        const endStats = stats; // 最終目標の能力値

        const animate = () => {
            const now = Date.now();
            const elapsed = now - startTime;
            // 経過時間に基づき、0から1の間の進行度を計算
            const progress = Math.min(1, elapsed / ANIMATION_DURATION); 

            // 進行度に基づき、各能力値を更新
            const currentStats = {};
            Object.keys(endStats).forEach(key => {
                currentStats[key] = startStats[key] + (endStats[key] - startStats[key]) * progress;
            });

            setAnimatedStats(currentStats);

            // 進行度が1未満なら、次のフレームで再描画を要求
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [stats]); // statsが変更されたらアニメーションを再実行

  // グラフの半径
  const R = size / 2.5;
  // 中心点
  const cx = size / 2;
  const cy = size / 2;
  // 最大値 (100)
  const MAX_VAL = 100;

  /**
   * 能力値に基づいて六角形の頂点座標を計算する関数
   * @param {number} value - 能力値 (0-100)
   * @param {number} index - 軸のインデックス (0-5)
   * @param {number} maxR - 基準となる最大の半径
   * @returns {string} SVG座標文字列 "x,y"
   */
  const getPoint = (value, index, maxR) => {
    // 角度を計算 (0度を右として、反時計回りに60度ずつ)
    const angleDeg = 90 - (index * 60); // 策略 (index 5)を上に配置するため90度スタート
    const angleRad = (Math.PI / 180) * angleDeg;

    // 能力値に基づく比率 (0.1〜1.0)
    const ratio = (value || 0) / MAX_VAL;
    // 頂点までの半径
    const r = maxR * ratio * 0.9; // 90%に縮小して内側にパディング

    // 座標計算
    const x = cx + r * Math.cos(angleRad);
    const y = cy - r * Math.sin(angleRad); // SVGはY軸が下向きなのでマイナス

    return `${x},${y}`;
  };

  // データのポリゴン座標を生成 (★ 修正: key を使って値を取得 ★)
  const dataPoints = axes.map((axis, index) => {
      // 修正: axis.key を使って animatedStats から値を取得
      const value = animatedStats[axis.key] || 0; 
      return getPoint(value, index, R);
  }).join(' ');


  // グラフの枠線（六角形）の座標を生成
  const webPoints = axes.map((_, index) =>
    getPoint(MAX_VAL, index, R) // 最大値 (100) で枠を生成
  ).join(' ');

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${size} ${size}`}
      className="font-sans"
    >
      {/* 枠線と補助線 */}
      {/* Web (枠線) - 最大値の六角形 */}
      <polygon
        points={webPoints}
        className="stroke-gray-600 fill-transparent stroke-2"
      />
      {/* Web (補助線) - 中央から各頂点への線 */}
      {axes.map((_, index) => (
        <line
          key={`line-${index}`}
          x1={cx}
          y1={cy}
          x2={getPoint(MAX_VAL, index, R).split(',')[0]}
          y2={getPoint(MAX_VAL, index, R).split(',')[1]}
          className="stroke-gray-600 stroke-1"
        />
      ))}

      {/* データポリゴン */}
        <polygon 
            points={dataPoints}
            className={`opacity-60 ${color}`} 
            strokeWidth="2"
            stroke={color.replace('fill-', 'stroke-')}
        />

      {/* ラベル (能力値の項目名) */}
      {axes.map((axis, index) => {
        const point = getPoint(MAX_VAL, index, R * 1.05).split(','); // 枠より少し外側
        const x = parseFloat(point[0]);
        const y = parseFloat(point[1]);

        // テキスト配置の微調整
        let textAnchor = 'middle';
        if (x < cx - 5) textAnchor = 'end';
        if (x > cx + 5) textAnchor = 'start';

        return (
          <text
            key={`label-${index}`}
            x={x}
            y={y}
            fill="white"
            fontSize="14"
            textAnchor={textAnchor}
            alignmentBaseline="middle"
            className="font-bold tracking-wider"
          >
            {axis.name}
          </text>
        );
      })}
    </svg>
  );
};

export default RadarChart;