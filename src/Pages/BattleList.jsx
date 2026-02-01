// src/Pages/BattleList.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import NavigationButton from '../Components/NavigationButton';
import { BATTLES } from '../data/battles';

const BattleList = ({ isMonetized, visitedBranches = [] }) => {
  const navigate = useNavigate();

  return (
    <div className={`flex-grow flex flex-col w-full min-h-screen ${isMonetized ? 'bg-golden-mode' : 'bg-slate-900'}`}>
      <Header page={{ title: '軍議演習：合戦一覧' }} />

      <main className="flex-grow flex flex-col items-center p-4 sm:p-8">
        <div className="w-full max-w-4xl">
          <h2 className="text-2xl font-black text-gray-400 mb-8 tracking-widest uppercase border-l-4 border-red-600 pl-4">
            合戦場を選択せよ
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(BATTLES).map(([key, battle]) => {
              // ★ クリア判定：この合戦の branchId が訪問済みリストに含まれているか
              const isCleared = visitedBranches.includes(battle.branchId);
              return (
                <div
                  key={key}
                  onClick={() => navigate(`/battle/${key}`)}
                  className={`relative p-6 rounded-2xl border transition-all group cursor-pointer overflow-hidden ${isCleared
                      ? 'bg-blue-900/20 border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.2)]'
                      : 'bg-gray-800/50 border-gray-700 hover:border-red-500/50'
                    }`}
                >
                  {/* ★ クリア済みバッジ */}
                  {isCleared && (
                    <div className="absolute -right-8 -top-8 w-20 h-20 bg-blue-600 rotate-45 flex items-end justify-center pb-1 shadow-lg">
                      <span className="text-[10px] font-black text-white uppercase tracking-tighter -rotate-45 mb-1">
                        Cleared
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-start mb-4">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase ${isCleared ? 'text-blue-400 bg-blue-400/10' : 'text-red-500 bg-red-500/10'
                      }`}>
                      {isCleared ? '制圧済み' : '未踏の地'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-bold text-red-500 bg-red-500/10 px-2 py-1 rounded uppercase">
                      Battlefield
                    </span>
                  </div>

                  <h3 className={`text-xl font-bold mb-2 transition-colors ${isCleared ? 'text-blue-200' : 'text-white group-hover:text-red-400'
                    }`}>
                    {battle.title}
                  </h3>

                  <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                    {battle.phases.start.message.substring(0, 50)}...
                  </p>

                  <div className="flex justify-between items-center">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full bg-blue-600 border-2 border-gray-800 flex items-center justify-center text-[10px] font-bold">蜀</div>
                      <div className="w-8 h-8 rounded-full bg-red-600 border-2 border-gray-800 flex items-center justify-center text-[10px] font-bold">魏</div>
                    </div>
                    <span className="text-red-500 font-bold text-sm group-hover:translate-x-1 transition-transform">
                      出陣する ▶
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <NavigationButton to="/" text="ホームに戻る" isPrimary={false} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default BattleList;