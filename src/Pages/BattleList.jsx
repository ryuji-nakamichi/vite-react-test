// src/Pages/BattleList.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import NavigationButton from '../Components/NavigationButton';
import StrategyMap from '../Components/StrategyMap';
import { BATTLES } from '../data/battles';

const BattleList = ({ isMonetized, visitedBranches = [] }) => {
  const navigate = useNavigate();

  // 勢力ごとのデザインテーマ
  const FACTION_THEMES = {
    '魏': 'bg-blue-600 border-blue-400',
    '呉': 'bg-red-600 border-red-400',
    '蜀': 'bg-emerald-600 border-emerald-400',
    '袁': 'bg-purple-600 border-purple-400',
    'default': 'bg-gray-600 border-gray-400'
  };


  const FACTION_DETAILS = {
    '蜀': { name: '蜀漢', desc: '劉備が建国した「漢」の正統を継ぐ国。義を重んじる。' },
    '魏': { name: '曹魏', desc: '曹操が礎を築いた、中原を支配する最大勢力。実力主義。' },
    '呉': { name: '孫呉', desc: '長江の天険を頼みに三代に渡って築かれた南方の大国。' },
    '袁紹': { name: '袁紹軍', desc: '「四世三公」を誇る名門中の名門。河北に強大な版図を築いた、三国時代初期の最大勢力。' }
  };

  return (
    <div className={`flex-grow flex flex-col w-full min-h-screen ${isMonetized ? 'bg-golden-mode' : 'bg-slate-900'}`}>
      <Header page={{ title: '軍議演習：合戦一覧' }} />

      <main className="flex-grow flex flex-col items-center p-4 sm:p-8">
        <div className="w-full max-w-5xl">

          {/* ★ 戦略地図：画面上部に堂々と配置 */}
          <div className="mb-12">
            <h2 className="text-gray-500 text-[10px] font-black tracking-[0.5em] uppercase mb-4 text-center">
              Continental Strategic Map
            </h2>
            <StrategyMap visitedBranches={visitedBranches} />
            <p className="mt-4 text-[10px] text-gray-600 italic tracking-widest uppercase text-center">
              Click markers on the map or select from the list below
            </p>
          </div>

          <h2 className="text-2xl font-black text-gray-400 mb-8 tracking-widest uppercase border-l-4 border-red-600 pl-4">
            合戦場を選択せよ
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(BATTLES).map(([key, battle]) => {
              const isCleared = visitedBranches.includes(battle.branchId);
              const hasMilitaryOrder = !isCleared;

              return (
                <div
                  key={key}
                  onClick={() => navigate(`/battle/${key}`)}
                  className={`relative p-6 rounded-2xl border transition-all group cursor-pointer overflow-visible ${isCleared
                    ? 'bg-blue-900/20 border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.2)]'
                    : 'bg-gray-800/50 border-gray-700 hover:border-red-500/50'
                    }`}
                >
                  {/* 1. クリア済みバッジ：ここだけを overflow-hidden の小箱に入れる */}
                  {isCleared && (
                    <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-2xl pointer-events-none">
                      <div className="absolute -right-8 -top-8 w-20 h-20 bg-blue-600 rotate-45 flex items-end justify-center pb-1 shadow-lg">
                        <span className="text-[10px] font-black text-white uppercase tracking-tighter -rotate-45 mb-1">
                          Cleared
                        </span>
                      </div>
                    </div>
                  )}

                  {/* 2. ヘッダー行（統合済み） */}
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase ${isCleared ? 'text-blue-400 bg-blue-400/10' : 'text-red-500 bg-red-500/10'
                        }`}>
                        {isCleared ? '制圧済み' : '未踏の地'}
                      </span>
                    </div>
                    {/* ★ アイコン付きのラベル表示 */}
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1">
                      {battle.typeLabel || 'BATTLEFIELD'} {battle.icon || '🗡️'}
                    </span>
                  </div>

                  {/* 3. 軍令バッジ（絶対配置の調整） */}
                  {hasMilitaryOrder && (
                    <div className="absolute top-12 right-4 animate-bounce z-10">
                      <span className="bg-yellow-500 text-black text-[10px] font-black px-2 py-1 rounded shadow-lg border border-yellow-300">
                        ⚠︎ 軍令：初期士気+20
                      </span>
                    </div>
                  )}

                  {/* 4. コンテンツ */}
                  <h3 className={`text-xl font-bold mb-2 transition-colors ${isCleared ? 'text-blue-200' : 'text-white group-hover:text-red-400'
                    }`}>
                    {battle.title}
                  </h3>

                  <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                    {battle.phases.start.message.substring(0, 50)}...
                  </p>

                  {/* 5. フッター（勢力・ボタン案内） */}
                  <div className="flex justify-between items-center">
                    <div className="flex -space-x-2">
                      {battle.factions?.map((factionName, index) => (
                        <div
                          key={index}
                          className="relative group/faction" // 親にgroupを設定
                          style={{ zIndex: 10 - index }}
                        >
                          {/* 勢力丸アイコン */}
                          <div
                            className={`w-8 h-8 rounded-full border-2 border-gray-800 flex items-center justify-center text-[10px] font-bold shadow-lg transition-all hover:scale-110 hover:-translate-y-1 ${FACTION_THEMES[factionName] || FACTION_THEMES.default
                              }`}
                          >
                            {factionName}
                          </div>

                          {/* ★ ゲーム風ツールチップレイヤー */}
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-48 p-3 bg-gray-900 border border-gray-700 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] opacity-0 invisible group-hover/faction:opacity-100 group-hover/faction:visible transition-all z-50 pointer-events-none">
                            <div className="text-xs font-bold text-white border-b border-gray-700 pb-1 mb-1 flex items-center gap-2">
                              <span className={`w-2 h-2 rounded-full ${FACTION_THEMES[factionName]}`}></span>
                              {FACTION_DETAILS[factionName]?.name || factionName}
                            </div>
                            <div className="text-[10px] text-gray-400 leading-relaxed font-serif italic">
                              {FACTION_DETAILS[factionName]?.desc || '詳細は不明。'}
                            </div>
                            {/* ツールチップの矢印 */}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-gray-900"></div>
                          </div>
                        </div>
                      ))}
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