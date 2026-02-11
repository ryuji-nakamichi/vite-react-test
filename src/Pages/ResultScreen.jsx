import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import NavigationButton from '../Components/NavigationButton';

const ResultScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // BattleScreenから渡されたデータを受け取る（なければ初期値を設定）
  const resultData = location.state?.resultData || {
    rank: "C",
    title: "九死一生",
    score: 0,
    message: "戦果を確認できませんでした。",
    isBlessed: false
  };

  const { rank, title, score, message, isBlessed } = resultData;

  // ランク別の文字色設定
  const rankColors = {
    S: "text-yellow-400 drop-shadow-[0_0_20px_rgba(250,204,21,0.6)]",
    A: "text-blue-400",
    B: "text-green-400",
    C: "text-gray-500"
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">

      {/* Sランク専用：黄金の粒子レイヤー */}
      {rank === 'S' && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="particle animate-gold-particle bg-yellow-400"
              style={{
                left: `${Math.random() * 100}%`, // 横位置をランダムに
                width: `${Math.random() * 6 + 2}px`, // サイズをランダムに
                height: `${Math.random() * 6 + 2}px`,
                animationDelay: `${Math.random() * 4}s`, // 出現タイミングをずらす
                boxShadow: '0 0 10px #fbbf24', // 輝き（Glow）を追加
              }}
            />
          ))}
        </div>
      )}

      <Header page={{ title: '戦果報告' }} />

      <main className="flex-grow flex flex-col items-center justify-center p-6 relative overflow-hidden">

        {/* Sランク時のみ表示される背後の光演出 */}
        {rank === 'S' && (
          <div className="absolute inset-0 bg-yellow-500/5 animate-pulse pointer-events-none" />
        )}

        <div className="z-10 text-center animate-fade-in-up">
          <p className="text-gray-500 text-xs tracking-[0.5em] uppercase mb-2">Battle Result</p>

          {/* ランク巨大表示 */}
          <h1 className={`text-[12rem] font-black italic leading-none mb-4 ${rankColors[rank]}`}>
            {rank}
          </h1>

          {/* 二つ名 */}
          <h2 className="text-3xl font-serif text-white tracking-[0.3em] mb-8">
            ― {title} ―
          </h2>

          {/* スコア詳細カード */}
          <div className="w-full max-w-md bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-10 shadow-2xl">
            <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
              <span className="text-gray-400 text-sm">戦略評価スコア</span>
              <span className="text-2xl font-mono text-white">{score} <span className="text-xs text-gray-500">pt</span></span>
            </div>

            <p className="text-gray-200 leading-relaxed font-serif italic">
              「{message}」
            </p>

            {isBlessed && (
              <div className="mt-6 py-2 px-4 bg-yellow-500/10 border border-yellow-500/30 rounded-full text-yellow-500 text-[10px] font-bold tracking-widest animate-pulse">
                ★ 七星灯の加護が歴史を動かした
              </div>
            )}
          </div>

          {/* アクションボタン */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <NavigationButton to="/battles" text="次の戦場を選択" isPrimary={true} />
            <NavigationButton to="/" text="本陣へ帰還" isPrimary={false} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResultScreen;