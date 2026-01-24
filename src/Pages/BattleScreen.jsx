// src/Pages/BattleScreen.jsx

import React, { useState } from 'react';
import Header from '../Components/Header';
import BattleGauge from '../Components/BattleGauge';
import NavigationButton from '../Components/NavigationButton';
import { useParams, useNavigate } from 'react-router-dom';
import { BATTLES } from '../data/battles';

const BattleScreen = ({ isMonetized, markBranchAsVisited, setCurrentBranch }) => {
  const navigate = useNavigate();
  const { battleId } = useParams();
  const scenario = BATTLES[battleId] || BATTLES.fancheng_shu;

  const [playerArmy, setPlayerArmy] = useState(scenario.initialStats.player);
  const [enemyArmy, setEnemyArmy] = useState(scenario.initialStats.enemy);
  const [currentPhase, setCurrentPhase] = useState("start");
  const [logs, setLogs] = useState(["軍議を開始します。"]);
  const [showCutIn, setShowCutIn] = useState(false);

  const phaseData = scenario.phases[currentPhase];
  const isVictory = currentPhase === "victory";
  const isDefeat = currentPhase === "defeat";

  const handleChoice = (choice) => {
    // 1. 終了判定（凱旋ボタンなど）
    if (choice.nextPhase === "end_victory" || choice.nextPhase === "end_defeat") {
      if (choice.nextPhase === "end_victory" && markBranchAsVisited) {
        markBranchAsVisited('win-fancheng');
      }
      navigate('/');
      return;
    }

    // 2. ステータス計算
    const nextPlayerTroops = playerArmy.troops + (choice.impact.playerTroops || 0);
    const nextEnemyTroops = enemyArmy.troops + (choice.impact.enemyTroops || 0);
    const nextPlayerMorale = Math.max(0, Math.min(100, playerArmy.morale + (choice.impact.playerMorale || 0)));
    const nextEnemyMorale = Math.max(0, Math.min(100, enemyArmy.morale + (choice.impact.enemyMorale || 0)));

    setLogs(prev => [choice.log, ...prev]);
    setPlayerArmy({ ...playerArmy, troops: nextPlayerTroops, morale: nextPlayerMorale });
    setEnemyArmy({ ...enemyArmy, troops: nextEnemyTroops, morale: nextEnemyMorale });

    // 3. 次のフェーズ判定
    // ★ 修正：兵数が0になるだけでなく、勝利フェーズ（victory）に遷移する時もカットインを出す
    const isNowVictory = choice.nextPhase === "victory" || nextEnemyTroops <= 0 || nextEnemyMorale <= 0;

    if (isNowVictory) {
      setCurrentPhase("victory");
      setShowCutIn(true);

      // ★ 追加：3秒後に自動的にカットインを閉じる
      setTimeout(() => {
        setShowCutIn(false);
      }, 3500); // アニメーション時間(2.5s)より少し長めに設定

    } else if (nextPlayerTroops <= 0 || nextPlayerMorale <= 0) {
      setCurrentPhase("defeat");
    } else {
      setCurrentPhase(choice.nextPhase);
    }
  };

  return (
    <div className={`flex-grow flex flex-col w-full min-h-screen ${isMonetized ? 'bg-golden-mode' : 'bg-slate-900'}`}>
      <Header page={{ title: '戦争シミュレーション' }} />

      <main className="flex-grow flex flex-col items-center p-4 sm:p-8 relative">
        {/* メインカード */}
        <div className="w-full max-w-4xl bg-gray-900/90 backdrop-blur-xl rounded-3xl border border-gray-700 p-6 shadow-2xl overflow-hidden relative z-10">

          {/* 1. 対峙レイアウト */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div className="bg-blue-900/10 p-5 rounded-2xl border border-blue-500/20 relative">
              <div className="absolute -top-3 left-4 px-3 py-0.5 bg-blue-600 text-white text-[10px] font-bold rounded-full uppercase tracking-widest">Our Forces</div>
              <h3 className="text-xl font-black text-blue-400 mb-4">{playerArmy.name}</h3>
              <BattleGauge label="兵力" value={playerArmy.troops} maxValue={10000} type="troops" />
              <BattleGauge label="士気" value={playerArmy.morale} maxValue={100} type="morale" />
            </div>

            <div className="bg-red-900/10 p-5 rounded-2xl border border-red-500/20 relative">
              <div className="absolute -top-3 right-4 px-3 py-0.5 bg-red-600 text-white text-[10px] font-bold rounded-full uppercase tracking-widest">Enemy Forces</div>
              <h3 className="text-xl font-black text-red-400 mb-4 text-right">{enemyArmy.name}</h3>
              <BattleGauge label="兵力" value={enemyArmy.troops} maxValue={12000} type="troops" />
              <BattleGauge label="士気" value={enemyArmy.morale} maxValue={100} type="morale" />
            </div>
          </div>

          {/* 2. メッセージ・コマンドエリア */}
          <div className={`border-2 rounded-2xl p-6 mb-8 relative transition-all duration-500 ${isVictory ? 'bg-blue-900/40 border-blue-400 shadow-[0_0_30px_rgba(59,130,246,0.6)]' :
              isDefeat ? 'bg-red-900/40 border-red-400 shadow-[0_0_30px_rgba(239,68,68,0.6)]' :
                'bg-black/50 border-gray-700'
            }`}>
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-gray-500"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-gray-500"></div>
            <p className="text-gray-200 text-sm sm:text-lg leading-relaxed mb-6 font-serif">{phaseData?.message}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {phaseData?.choices?.map((choice, index) => (
                <button
                  key={index}
                  onClick={() => handleChoice(choice)}
                  className={`py-3 px-4 border rounded-xl text-sm font-bold transition-all text-left ${isVictory || isDefeat ? 'bg-gray-700 border-gray-600 cursor-default opacity-80' : 'bg-gray-800 hover:bg-blue-700 border-gray-600 text-white'
                    }`}
                >
                  ▶ {choice.text}
                </button>
              ))}
            </div>
          </div>

          {/* ★ 撤退するボタンをカードの内側・最下部に配置（レイアウトの安定） */}
          <div className="text-center pt-4 border-t border-gray-800">
            <NavigationButton to="/" text="撤退する" isPrimary={false} />
          </div>
        </div>

        {/* ★ カットイン演出レイヤー（z-index最強にしてカードの外に配置） */}
        {showCutIn && (
          <div className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center overflow-hidden">
            <div className="absolute w-[200%] h-32 bg-blue-600/80 animate-cutin-bg border-y-4 border-blue-400 shadow-[0_0_50px_rgba(59,130,246,0.8)]" />
            <div className="relative z-10 text-center animate-cutin-text">
              <p className="text-4xl sm:text-6xl font-black text-white italic tracking-tighter drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
                「我が刃、中原を両断せん！」
              </p>
              <p className="text-right text-xl text-blue-200 font-bold mt-4 mr-10">— 蜀将・関羽雲長</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default BattleScreen;