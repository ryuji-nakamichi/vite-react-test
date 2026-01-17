import React from 'react';
import Header from '../Components/Header';
import NavigationButton from '../Components/NavigationButton';

const HistorySimulation = ({ isMonetized, currentBranch, setCurrentBranch }) => {

  const handleCheckout = (branchId) => {
    setCurrentBranch(branchId);
    // 演出：checkoutしたことを知らせるアラートやトーストを出すのも良いですね！
    alert(`Switched to branch: ${branchId}`);
  };

  return (
    <div className={`flex-grow flex flex-col w-full min-h-screen transition-colors duration-1000 ${
      isMonetized ? 'bg-golden-mode' : 'bg-slate-900'
    }`}>
      <Header page={{ title: '歴史シミュレーター' }} />

      <main className="flex-grow flex flex-col items-center p-4 sm:p-8">
        <div className="w-full max-w-4xl bg-gray-900/80 backdrop-blur-xl rounded-3xl border border-gray-700 p-6 sm:p-10 shadow-2xl">
          
          <div className="mb-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-4">Timeline Repository</h2>
            <p className="text-gray-400 font-mono text-sm uppercase tracking-widest">
              $ git log --graph --oneline --all
            </p>
          </div>

          {/* Gitグラフ風の分岐リスト（モック） */}
          <div className="space-y-12 relative before:absolute before:left-[19px] before:top-4 before:bottom-4 before:w-1 before:bg-gray-700">
            
            {/* 1. 史実：メインブランチ */}
            <div className="relative pl-12">
              <div className="absolute left-0 top-1 w-10 h-10 bg-red-600 rounded-full border-4 border-gray-900 z-10 flex items-center justify-center text-xs font-bold shadow-[0_0_15px_rgba(220,38,38,0.5)]">
                main
              </div>
              <div className="bg-gray-800/50 p-6 rounded-2xl border border-red-900/30">
                <h3 className="text-xl font-bold text-red-500 mb-2">史実：正史/演義タイムライン</h3>
                <p className="text-gray-400 text-sm">我々が知る、三國鼎立から統一への歩み。</p>
              </div>
            </div>

            {/* 2. 樊城の分岐点 */}
            <div className="relative pl-12 group cursor-pointer">
              {/* 分岐の線（アニメーションさせたい） */}
              <div className="absolute left-4 top-[-20px] w-8 h-10 border-l-4 border-b-4 border-blue-500 rounded-bl-xl"></div>
              
              <div className="absolute left-0 top-1 w-10 h-10 bg-blue-600 rounded-full border-4 border-gray-900 z-10 flex items-center justify-center text-xs font-bold shadow-[0_0_15px_rgba(37,99,235,0.5)] group-hover:scale-110 transition-transform">
                IF
              </div>
              
              <div className="bg-blue-900/20 p-6 rounded-2xl border border-blue-500/30 hover:bg-blue-900/40 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-blue-400">樊城の戦い：関羽の勝利</h3>
                  <span className="px-3 py-1 bg-blue-500 text-white text-[10px] rounded-full font-bold">BRANCH: win-fancheng</span>
                </div>
                <p className="text-gray-300 text-sm mb-4">
                  「もし関羽が樊城を落とし、孫権の裏切りを未然に防いでいたら？」
                </p>
                <button
                  onClick={() => handleCheckout('win-fancheng')}
                  className={`px-6 py-2 rounded-lg font-bold text-sm transition-colors ${currentBranch === 'win-fancheng'
                      ? 'bg-green-600 text-white' // すでにそのブランチにいる時
                      : 'bg-blue-600 hover:bg-blue-500 text-white'
                    }`}
                >
                  {currentBranch === 'win-fancheng' ? '✓ Checked out' : 'この歴史を Checkout する'}
                </button>
              </div>
            </div>

          </div>

          <div className="mt-16 text-center">
            <NavigationButton to="/" text="ホームに戻る" isPrimary={false} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default HistorySimulation;