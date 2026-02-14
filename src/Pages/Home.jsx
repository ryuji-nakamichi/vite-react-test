import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Components/Header";
import NavigationButton from "../Components/NavigationButton";
import { getPlayerTitle } from '../utils/titleSystem';
import MarchingSimulator from '../Components/MarchingSimulator';
import MilitaryRankGallery from '../Components/MilitaryRankGallery';
import { useMonetization } from '../hooks/useMonetization';
import ThankYouToast from "../Components/ThankYouToast";

function Home({ visitedBranches = [], quizStats = { maxCorrect: 0 } }) {
  const { isMonetized, totalReceived, currency } = useMonetization();


  // モード管理を拡張 ('menu' | 'marching' | 'ranks')
  const [activeMode, setActiveMode] = useState('menu');

  // 称号の計算
  const title = getPlayerTitle(visitedBranches.length, isMonetized, quizStats);

  return (
    <div className="flex-grow flex flex-col w-full h-full">
      <Header page={{ title: '〜其レハ智ノ旅路〜' }} />

      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 py-6 relative">

        {/* ★ 修正：コンポーネントを置くだけ！ロジックはあちらで完結しています */}
        <ThankYouToast isMonetized={isMonetized} />

        {/* 軍資金（War Funds）カウンターウィジェット */}
        <div className="fixed top-52 right-4 z-50 animate-bounce-in">
          <div className={`p-3 rounded-2xl border backdrop-blur-xl transition-all duration-1000 ${isMonetized
            ? 'bg-yellow-900/40 border-yellow-500/50 shadow-[0_0_20px_rgba(234,179,8,0.3)]'
            : 'bg-gray-900/60 border-white/5'
            }`}>
            <div className="flex items-center gap-2 mb-1">
              <div className={`w-2 h-2 rounded-full ${isMonetized ? 'bg-green-500 animate-pulse' : 'bg-gray-600'}`} />
              <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Treasury Log</span>
            </div>

            <div className="flex items-baseline gap-1">
              <span className="text-xl font-mono font-bold text-white tracking-tighter">
                {totalReceived.toFixed(9)}
              </span>
              <span className="text-[10px] text-yellow-500 font-bold">{currency || 'EUR'}</span>
            </div>

            {isMonetized && (
              <p className="text-[8px] text-yellow-600 font-serif italic mt-1 text-right animate-pulse">
                補給路より兵糧が届いています...
              </p>
            )}
          </div>
        </div>

        {/* メインコンテンツパネル */}
        <div
          className={`relative w-full sm:max-w-2xl p-6 sm:p-12 sm:rounded-3xl shadow-2xl text-center 
             backdrop-blur-md border transition-all duration-1000 ${isMonetized
              ? 'bg-yellow-900/20 border-yellow-500/50 shadow-[0_0_30px_rgba(234,179,8,0.2)]'
              : 'bg-gray-800/70 border-red-700/30'
            }`}
        >
          {/* 称号プレート */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-4/5 sm:w-2/3">
            <div className={`relative px-4 py-2 rounded-xl border-2 shadow-2xl transition-all duration-1000 ${isMonetized
              ? 'bg-gray-900 border-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.4)]'
              : 'bg-gray-900 border-red-900/50 shadow-black'
              }`}>
              <div className={`absolute -left-3 -top-3 w-10 h-10 flex items-center justify-center rounded-full border-2 font-black text-xs rotate-[-15deg] shadow-lg ${title.rank === 'SSR' ? 'bg-yellow-500 text-black border-yellow-200' :
                title.rank === 'SR' ? 'bg-blue-600 text-white border-blue-400' :
                  'bg-gray-800 text-gray-400 border-gray-600'
                }`}>
                {title.rank}
              </div>

              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em] block">Current Strategist Title</span>
              <div className={`text-xl sm:text-2xl font-black italic tracking-tighter ${title.color}`}>
                {title.fullName}
              </div>
            </div>
          </div>

          <div className="mt-8">
            {activeMode === 'menu' ? (
              <>
                <p className="text-lg md:text-xl text-gray-300 mb-8 font-serif italic tracking-widest">
                  モードを選択してください
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <NavigationButton to="/quiz/select" text="⚔️ クイズで出陣" isPrimary={true} />
                  <NavigationButton to="/battles" text="🔥 合戦場へ向かう" isPrimary={true} className="bg-gradient-to-r from-red-600 to-red-800" />

                  <button
                    onClick={() => setActiveMode('marching')}
                    className="flex items-center justify-center px-6 py-4 rounded-xl bg-blue-900/40 border border-blue-500/50 text-blue-100 font-bold hover:bg-blue-800/60 transition-all shadow-lg hover:shadow-blue-500/20"
                  >
                    🗺️ 行軍試算を行う
                  </button>

                  {/* ★ 変更：Linkではなくモード切替ボタンにする */}
                  <button
                    onClick={() => setActiveMode('ranks')}
                    className="flex items-center justify-center px-6 py-4 rounded-xl bg-purple-900/40 border border-purple-500/50 text-purple-100 font-bold hover:bg-purple-800/60 transition-all shadow-lg hover:shadow-purple-500/20"
                  >
                    🏛️ 将軍位名鑑
                  </button>

                  <NavigationButton to="/simulation" text="🌲 仮想戦史を編む" isPrimary={false} />
                  <NavigationButton to="/dic/list" text="📜 武将名鑑を見る" isPrimary={false} />
                </div>
              </>
            ) : activeMode === 'marching' ? (
              <div className="animate-fade-in">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-black text-blue-400 italic">【大陸行軍試算儀】</h2>
                  <button onClick={() => setActiveMode('menu')} className="text-xs text-gray-400 hover:text-white border border-gray-700 px-3 py-1 rounded-full transition-colors">
                    戻る
                  </button>
                </div>
                <MarchingSimulator />
              </div>
            ) : (
              /* --- 将軍位名鑑モード --- */
              <div className="animate-fade-in">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-black text-purple-400 italic">【官職学位名鑑】</h2>
                  <button onClick={() => setActiveMode('menu')} className="text-xs text-gray-400 hover:text-white border border-gray-700 px-3 py-1 rounded-full transition-colors">
                    戻る
                  </button>
                </div>
                <MilitaryRankGallery />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;