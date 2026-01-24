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
              // 解放条件などのロジックをここに挟むことも可能
              return (
                <div
                  key={key}
                  onClick={() => navigate(`/battle/${key}`)}
                  className="bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-700 p-6 hover:border-red-500/50 transition-all group cursor-pointer relative overflow-hidden"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-bold text-red-500 bg-red-500/10 px-2 py-1 rounded uppercase">
                      Battlefield
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
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