import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import NavigationButton from '../Components/NavigationButton';
import GoldParticles from '../Components/GoldParticles';

const ResultScreen = ({ isMonetized }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const resultData = location.state?.resultData || {
    rank: "C",
    title: "九死一生",
    score: 0,
    message: "戦果を確認できませんでした。",
    isBlessed: false
  };

  const { rank, title, score, message, isBlessed } = resultData;
  const isSRank = rank === 'S';

  // ランク別の文字色設定
  const rankColors = {
    S: "text-yellow-400 drop-shadow-[0_0_50px_rgba(250,204,21,0.8)]",
    A: "text-blue-400",
    B: "text-green-400",
    C: "text-gray-500"
  };

  // ★ 新設：歴史の加護メッセージ集
  const getBlessedMessage = useMemo(() => {
    // 黄金モード（Web Monetization）が有効な時の特別なリスト
    const goldenMessages = [
      "諸葛孔明の神算鬼謀が、天の時をも味方につけた",
      "黄金の補給路が確立され、大軍を養うに足る兵糧が届いている",
      "太公望の如き静かなる一手が、歴史の奔流を変えた",
      "桃園の誓いが時を超え、黄金の輝きとなって戦場を包む",
      "楚漢の覇気が激突し、貴殿に勝利の天命が下った"
    ];

    // 通常の加護（isBlessed）の時のリスト
    const normalMessages = [
      "七星灯の加護が消えることなく、歴史を動かした",
      "白起の如き苛烈なる用兵が、敵陣を壊滅させた",
      "管仲の智略が国を富ませ、勝利の礎を築いた",
      "背水の陣、その覚悟が奇跡の逆転劇を生んだ"
    ];

    // リストからランダムに選ぶ
    const list = isMonetized ? goldenMessages : normalMessages;
    return list[Math.floor(Math.random() * list.length)];
  }, [isMonetized]);

  return (
    /* ★ 修正ポイント：isMonetized に応じて背景クラスを切り替え */
    <div className={`min-h-screen flex flex-col transition-colors duration-1000 ${isMonetized ? 'bg-golden-mode' : 'bg-slate-950'
      }`}>

      {/* Sランク時は黄金の粒子を降らせる */}
      {isSRank && <GoldParticles count={50} />}

      <Header page={{ title: '戦果報告' }} />

      <main className="flex-grow flex flex-col items-center justify-center p-6 relative overflow-hidden">

        {/* ★ 黄金モード専用：上部に「加護」を示すバッジを表示 */}
        {isMonetized && (
          <div className="absolute top-8 animate-flicker z-20">
            <div className="px-6 py-1 bg-yellow-500/20 border border-yellow-500/50 rounded-full backdrop-blur-md">
              <span className="text-[10px] font-black text-yellow-500 uppercase tracking-[0.3em]">
                ✨ Web Monetization: Active ✨
              </span>
            </div>
          </div>
        )}

        {/* Sランク時の光の揺らぎ演出 */}
        {isSRank && (
          <div className="absolute inset-0 bg-yellow-500/5 animate-pulse pointer-events-none z-0" />
        )}

        <div className="z-10 text-center animate-fade-in-up">
          <p className="text-gray-500 text-xs tracking-[0.5em] uppercase mb-2">Battle Result</p>

          <h1 className={`text-[12rem] font-black italic leading-none mb-4 transition-all duration-1000 ${rankColors[rank]}`}>
            {rank}
          </h1>

          <h2 className="text-3xl font-serif text-white tracking-[0.3em] mb-8 drop-shadow-lg">
            ― {title} ―
          </h2>

          <div className="w-full max-w-md bg-gray-900/60 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 mb-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
              <span className="text-gray-400 text-sm font-bold">戦略評価スコア</span>
              <span className="text-2xl font-mono text-white">
                {score} <span className="text-xs text-gray-500 ml-1">pt</span>
              </span>
            </div>

            <p className="text-gray-200 leading-relaxed font-serif italic text-lg">
              「{message}」
            </p>

            {/* 特別な加護メッセージ */}
            {(isBlessed || (isSRank && isMonetized)) && (
              <div className="mt-6 py-2 px-4 bg-yellow-600/20 border border-yellow-500/30 rounded-xl text-yellow-400 text-[10px] font-black tracking-widest animate-pulse flex items-center justify-center gap-2">
                <span>✦</span>
                {getBlessedMessage}
                <span>✦</span>
              </div>
            )}
          </div>

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