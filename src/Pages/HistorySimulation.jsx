import React, { useState } from 'react';
import Header from '../Components/Header';
import NavigationButton from '../Components/NavigationButton';

const HistorySimulation = ({ isMonetized, currentBranch, setCurrentBranch, markBranchAsVisited }) => {

  const [isProcessing, setIsProcessing] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState([]);

  const handleCheckout = (branchId) => {
    if (branchId === currentBranch) return;

    setIsProcessing(true);
    setTerminalLogs([]);

    // handleCheckout 内の logs 定義部分を修正
    const branchNames = {
      'main': 'Historical Timeline',
      'win-fancheng': 'Guan Yu Survival Route',
      'win-yiling': 'Liu Bei Revenge Success Route',
      'mengda-success': 'Meng Da Coup Success Route'
    };

    const logs = [
      `$ git checkout ${branchId}`,
      `Swapping entities to ${branchNames[branchId] || branchId}...`,
      `Merging scenario_delta into HEAD...`,
      branchId === 'win-yiling' ? `Calculating impact: Wu navy neutralized.` : `Rebuilding character relations...`,
      `Branch changed to ${branchId}.`
    ];

    logs.forEach((log, index) => {
      setTimeout(() => {
        setTerminalLogs(prev => [...prev, log]);
        if (index === logs.length - 1) {
          setTimeout(() => {
            setCurrentBranch(branchId);
            setIsProcessing(false);
          }, 800);
        }
      }, index * 400); // 0.4秒ごとにログを表示
    });

    setTimeout(() => {
      setCurrentBranch(branchId);
      markBranchAsVisited(branchId); // ★ ここで訪問を記録！
      setIsProcessing(false);
    }, logs.length * 400 + 800);
  };

  return (
    <div className={`flex-grow flex flex-col w-full min-h-screen transition-colors duration-1000 ${isMonetized ? 'bg-golden-mode' : 'bg-slate-900'
      }`}>
      <Header page={{ title: '歴史シミュレーター' }} />

      {/* 演出用のオーバーレイ */}
      {isProcessing && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="w-full max-w-lg font-mono text-green-500 text-sm sm:text-base bg-black p-6 rounded-lg border border-green-900/50 shadow-[0_0_20px_rgba(34,197,94,0.2)]">
            {terminalLogs.map((log, i) => (
              <p key={i} className="mb-2">
                <span className="text-gray-500 mr-2">▶</span> {log}
              </p>
            ))}
            <div className="w-2 h-5 bg-green-500 animate-pulse inline-block mt-2"></div>
          </div>
        </div>
      )}

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

                {/* ★ ここに移動させると、カードとの対応関係が明確になります */}
                <button
                  onClick={() => handleCheckout('main')}
                  className={`mt-4 px-6 py-2 rounded-lg font-bold text-sm transition-colors ${currentBranch === 'main'
                    ? 'bg-red-700 text-white border border-red-500'
                    : 'bg-gray-700 hover:bg-gray-600 text-white'
                    }`}
                >
                  {currentBranch === 'main' ? '✓ Currently Selected' : '史実を Checkout する'}
                </button>
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

            {/* 3. 夷陵の分岐点 */}
            <div className="relative pl-12 group cursor-pointer">
              {/* 分岐の線（前の分岐からさらに伸びるイメージ） */}
              <div className="absolute left-4 top-[-20px] w-8 h-10 border-l-4 border-b-4 border-orange-500 rounded-bl-xl"></div>

              <div className="absolute left-0 top-1 w-10 h-10 bg-orange-600 rounded-full border-4 border-gray-900 z-10 flex items-center justify-center text-xs font-bold shadow-[0_0_15px_rgba(234,88,12,0.5)] group-hover:scale-110 transition-transform">
                IF
              </div>

              <div className="bg-orange-900/20 p-6 rounded-2xl border border-orange-500/30 hover:bg-orange-900/40 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-orange-400">夷陵の戦い：陸遜を撃破</h3>
                  <span className="px-3 py-1 bg-orange-500 text-white text-[10px] rounded-full font-bold">BRANCH: win-yiling</span>
                </div>
                <p className="text-gray-300 text-sm mb-4">
                  「もし劉備が陸遜の火計を見破り、呉の防衛線を突破して荊州を奪還していたら？」
                </p>
                <button
                  onClick={() => handleCheckout('win-yiling')}
                  className={`px-6 py-2 rounded-lg font-bold text-sm transition-colors ${currentBranch === 'win-yiling'
                      ? 'bg-green-600 text-white'
                      : 'bg-orange-600 hover:bg-orange-500 text-white'
                    }`}
                >
                  {currentBranch === 'win-yiling' ? '✓ Checked out' : 'この歴史を Checkout する'}
                </button>
              </div>
            </div>

            
            <div className="relative pl-12 group cursor-pointer">
              {/* 分岐の線（前の分岐からさらに横に伸びるイメージ） */}
              <div className="absolute left-4 top-[-20px] w-8 h-10 border-l-4 border-b-4 border-purple-500 rounded-bl-xl"></div>

              <div className="absolute left-0 top-1 w-10 h-10 bg-purple-600 rounded-full border-4 border-gray-900 z-10 flex items-center justify-center text-xs font-bold shadow-[0_0_15px_rgba(147,51,234,0.5)] group-hover:scale-110 transition-transform">
                IF
              </div>

              <div className="bg-purple-900/20 p-6 rounded-2xl border border-purple-500/30 hover:bg-purple-900/40 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-purple-400">上庸の乱：孟達の挙兵成功</h3>
                  <span className="px-3 py-1 bg-purple-500 text-white text-[10px] rounded-full font-bold">BRANCH: mengda-success</span>
                </div>
                <p className="text-gray-300 text-sm mb-4">
                  「もし孟達が司馬懿の電撃戦を凌ぎ、上庸で蜀軍と合流できていたら？」
                </p>
                <button
                  onClick={() => handleCheckout('mengda-success')}
                  className={`px-6 py-2 rounded-lg font-bold text-sm transition-colors ${currentBranch === 'mengda-success'
                      ? 'bg-green-600 text-white'
                      : 'bg-purple-600 hover:bg-purple-500 text-white'
                    }`}
                >
                  {currentBranch === 'mengda-success' ? '✓ Checked out' : 'この歴史を Checkout する'}
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