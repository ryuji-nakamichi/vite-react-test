import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Components/Header";
import NavigationButton from "../Components/NavigationButton";
import { getPlayerTitle } from '../utils/titleSystem';
import MarchingSimulator from '../Components/MarchingSimulator';
import MilitaryRankGallery from '../Components/MilitaryRankGallery';
import { useMonetization } from '../hooks/useMonetization';
import ThankYouToast from "../Components/ThankYouToast";

function Home({
  visitedBranches = [],
  quizStats = { maxCorrect: 0 },
  isMetaMaskInstalled,
  walletAddress,
  isConnecting,
  connectWallet,
  openSupportModal,
}) {
  const { isMonetized, totalReceived, currency } = useMonetization();
  const [activeMode, setActiveMode] = useState('menu');
  const title = getPlayerTitle(visitedBranches.length, isMonetized, quizStats);
  const shortAddress = walletAddress
    ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
    : null;

  return (
    <div className="flex-grow flex flex-col w-full min-h-0 h-full">
      <Header page={{ title: '〜其レハ智ノ旅路〜' }} />

      <main className="flex-grow flex flex-col px-3 pt-3 h-full" style={{ paddingBottom: 'calc(12px + var(--sab))' }}>

        {/* 称号プレート */}
        <div className={`flex items-center gap-3 p-3 mb-4 rounded-2xl border ${isMonetized
            ? 'bg-yellow-900/20 border-yellow-500/40'
            : 'bg-gray-900 border-red-900/40'
          }`}>
          <div className={`w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full border-2 font-black text-xs rotate-[-15deg] ${title.rank === 'SSR' ? 'bg-yellow-500 text-black border-yellow-200' :
              title.rank === 'SR' ? 'bg-blue-600 text-white border-blue-400' :
                'bg-gray-800 text-gray-400 border-gray-600'
            }`}>
            {title.rank}
          </div>
          <div className="flex-1 text-left">
            <span className="text-[9px] font-mono text-gray-500 uppercase tracking-[0.2em] block">
              Current Strategist Title
            </span>
            <div className={`text-base font-black italic tracking-tight ${title.color}`}>
              {title.fullName}
            </div>
          </div>
        </div>

        {/* モードグリッド */}
        {activeMode === 'menu' ? (
          <>
            <p className="text-xs text-gray-500 text-center mb-3 tracking-widest font-serif">
              モードを選択してください
            </p>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <NavigationButton to="/quiz/select" text="⚔️ クイズで出陣" isPrimary={true} />
              <NavigationButton to="/battles" text="🔥 合戦場へ向かう" isPrimary={true} />
              <button
                onClick={() => setActiveMode('marching')}
                className="touch-btn flex flex-col items-center justify-center gap-1 px-4 py-4 rounded-xl bg-blue-900/40 border border-blue-500/50 text-blue-100 font-bold shadow-lg"
              >
                <span className="text-xl">🗺️</span>
                <span className="text-xs">行軍試算を行う</span>
              </button>
              <button
                onClick={() => setActiveMode('ranks')}
                className="touch-btn flex flex-col items-center justify-center gap-1 px-4 py-4 rounded-xl bg-purple-900/40 border border-purple-500/50 text-purple-100 font-bold shadow-lg"
              >
                <span className="text-xl">🏛️</span>
                <span className="text-xs">将軍位名鑑</span>
              </button>
              <NavigationButton to="/simulation" text="🌲 仮想戦史を編む" isPrimary={false} />
              <NavigationButton to="/dic/list" text="📜 武将名鑑を見る" isPrimary={false} />
            </div>

            {/* ウォレットウィジェット：フロー内に統合 */}
            <div className="mt-auto pt-2">
              {isMonetized ? (
                <div className="p-3 rounded-2xl border backdrop-blur-xl bg-yellow-900/40 border-yellow-500/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Treasury Log</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm font-mono font-bold text-white">
                        {totalReceived.toFixed(9)}
                      </span>
                      <span className="text-[10px] text-yellow-500 font-bold">{currency}</span>
                    </div>
                  </div>
                </div>
              ) : !isMetaMaskInstalled ? (
                <a
                  href="https://metamask.io/download/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="touch-btn flex items-center justify-between w-full px-4 py-3 bg-gray-900/80 border border-orange-700/40 rounded-xl text-sm text-orange-400"
                >
                  <span>🦊 MetaMask をインストール</span>
                  <span className="text-xs text-gray-500">→</span>
                </a>
              ) : !walletAddress ? (
                <button
                  onClick={connectWallet}
                  disabled={isConnecting}
                  className="touch-btn flex items-center justify-between w-full px-4 py-3 bg-gray-900/80 border border-gray-700 rounded-xl text-sm text-gray-300 disabled:opacity-50"
                >
                  <span>{isConnecting ? '⏳ 接続中...' : '🦊 MetaMask で接続'}</span>
                  <span className="text-xs text-gray-500">→</span>
                </button>
              ) : (
                <div className="flex items-center justify-between px-4 py-3 bg-yellow-900/30 border border-yellow-700/40 rounded-xl">
                  <span className="text-[11px] text-gray-500 font-mono">{shortAddress}</span>
                  <button
                    onClick={openSupportModal}
                    className="touch-btn text-xs text-yellow-400 border border-yellow-700/40 px-3 py-1 rounded-lg"
                  >
                    🪙 応援する
                  </button>
                </div>
              )}
            </div>
          </>
        ) : activeMode === 'marching' ? (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-black text-blue-400 italic">【大陸行軍試算儀】</h2>
              <button
                onClick={() => setActiveMode('menu')}
                className="touch-btn text-xs text-gray-400 border border-gray-700 px-3 py-1 rounded-full"
              >
                戻る
              </button>
            </div>
            <MarchingSimulator />
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-black text-purple-400 italic">【官職学位名鑑】</h2>
              <button
                onClick={() => setActiveMode('menu')}
                className="touch-btn text-xs text-gray-400 border border-gray-700 px-3 py-1 rounded-full"
              >
                戻る
              </button>
            </div>
            <MilitaryRankGallery />
          </div>
        )}
      </main>
    </div>
  );
}

export default Home;