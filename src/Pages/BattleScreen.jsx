// src/Pages/BattleScreen.jsx

import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import BattleGauge from '../Components/BattleGauge';
import SevenStarLantern from '../Components/SevenStarLantern';
import NavigationButton from '../Components/NavigationButton';
import { useParams, useNavigate } from 'react-router-dom';
import { BATTLES } from '../data/battles';

const BattleScreen = ({ isMonetized, markBranchAsVisited, setCurrentBranch, visitedBranches = [] }) => {
  const navigate = useNavigate();
  const { battleId } = useParams();
  const scenario = BATTLES[battleId] || BATTLES.fancheng_shu;

  // ★ 追加：軍令ボーナスの判定
  const isCleared = visitedBranches.includes(scenario.branchId);
  const moraleBonus = !isCleared ? 20 : 0;
  

  const [isNarrating, setIsNarrating] = useState(true); // ★ ナレーション中かどうか
  const [currentLine, setCurrentLine] = useState(0);    // ★ 何行目か
  const [displayedText, setDisplayedText] = useState(""); // ★ タイピング演出用

  // 初期ステータスにボーナスを合算
  const [playerArmy, setPlayerArmy] = useState({
    ...scenario.initialStats.player,
    morale: scenario.initialStats.player.morale + moraleBonus
  });
  const [enemyArmy, setEnemyArmy] = useState(scenario.initialStats.enemy);
  const [currentPhase, setCurrentPhase] = useState("start");
  const [logs, setLogs] = useState(["軍議を開始します。"]);
  const [showCutIn, setShowCutIn] = useState(false);

  const phaseData = scenario.phases[currentPhase];
  const isVictory = currentPhase === "victory";
  const isDefeat = currentPhase === "defeat";

  // ★ 追加：ナレーションを全て飛ばして合戦を開始する
  const handleSkip = (e) => {
    e.stopPropagation(); // 1. 背景の onClick（handleNextLine）が発火するのを防ぐ
    setIsNarrating(false); // 2. ナレーション画面を閉じる
  };


  // --- タイピング演出ロジック（改良版） ---
  useEffect(() => {
    if (!isNarrating) return;

    let index = 0;
    const fullText = scenario.prelude[currentLine];

    // 1. まず表示を空にする
    setDisplayedText("");

    // 2. タイマーを開始
    const timer = setInterval(() => {
      index++; // 1文字目から順に増やしていく

      // 文字列の先頭から index 番目までを切り取って表示
      // これにより prev ステートに依存せず、常に正しい位置の文字が表示されます
      setDisplayedText(fullText.slice(0, index));

      if (index >= fullText.length) {
        clearInterval(timer);
      }
    }, 60); // わずかに速度を調整（お好みで）

    return () => clearInterval(timer);
  }, [currentLine, isNarrating, scenario.prelude]);

  const handleNextLine = () => {
    if (currentLine < scenario.prelude.length - 1) {
      setCurrentLine(prev => prev + 1);
    } else {
      setIsNarrating(false); // ナレーション終了
    }
  };

  const handleChoice = (choice) => {
    // 1. 終了判定（凱旋ボタンなど）
    if (choice.nextPhase === "end_victory" || choice.nextPhase === "end_defeat") {
      if (choice.nextPhase === "end_victory" && markBranchAsVisited) {
        // ★ ハードコードを廃止し、scenario.branchId を使用
        markBranchAsVisited(scenario.branchId);
      }
      navigate('/');
      return;
    }

    // 2. ステータス計算
    const nextPlayerTroops = playerArmy.troops + (choice.impact.playerTroops || 0);
    const nextEnemyTroops = enemyArmy.troops + (choice.impact.enemyTroops || 0);
    const nextPlayerMorale = Math.max(0, Math.min(150, playerArmy.morale + (choice.impact.playerMorale || 0)));
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

  const isLowMorale = playerArmy.morale < 40 && battleId === 'wuzhang_shu';

  // 1. 判定ロジックの追加
  const isBlessed = playerArmy.morale > 120 && battleId === 'wuzhang_shu';

  // --- ナレーション画面のレンダリング ---
  if (isNarrating) {
    return (
      <div
        className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center p-8 cursor-pointer overflow-hidden"
        onClick={handleNextLine}
      >
        {/* ★ スキップボタン：右上に配置 */}
        <button
          onClick={handleSkip}
          className="absolute top-8 right-8 px-4 py-2 border border-gray-800 text-gray-600 text-[10px] tracking-widest rounded-full hover:bg-gray-900 hover:text-gray-400 transition-all z-[210] uppercase font-bold"
        >
          Skip Narration ≫
        </button>

        <div className="max-w-2xl w-full animate-narration-in">
          <p className="text-gray-600 text-[10px] tracking-[0.5em] uppercase mb-12 text-center">
            Historical Prelude
          </p>

          <div className="min-h-[12rem] flex items-center justify-center">
            <p className="text-xl sm:text-2xl text-gray-100 font-serif narration-text text-center whitespace-pre-wrap">
              {displayedText}
              <span className={`ml-1 inline-block w-1 h-6 bg-blue-500 ${displayedText.length === scenario.prelude[currentLine].length ? 'animate-pulse' : ''
                }`}></span>
            </p>
          </div>

          <p className="mt-16 text-gray-700 text-xs text-center animate-pulse tracking-widest">
            CLICK TO CONTINUE
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex-grow flex flex-col w-full min-h-screen ${isMonetized ? 'bg-golden-mode' : 'bg-slate-900'}`}>

      {/* ★ 追加：暗闇オーバーレイレイヤー */}
      {isLowMorale && (
        <div className="fixed inset-0 z-[5] pointer-events-none transition-opacity duration-1000 animate-fade-in bg-black/60 shadow-[inset_0_0_150px_rgba(0,0,0,1)]">
        </div>
      )}

      {isBlessed && (
        <div className="fixed inset-0 z-[5] pointer-events-none animate-pulse bg-yellow-500/20 shadow-[inset_0_0_100px_rgba(253,224,71,0.4)] transition-opacity duration-1000">
          {/* 粒子が舞うような装飾を入れるとさらに神々しくなります */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
        </div>
      )}
      
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

          {/* ★ ここがベストポジション！ ★ */}
          {/* 五丈原の戦いの時だけ表示し、プレイヤーの士気を渡す */}
          {battleId === 'wuzhang_shu' && (
            <div className="mb-8">
              <SevenStarLantern morale={playerArmy.morale} />
            </div>
          )}

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
            {/* ★ 決着がついていない（勝利でも敗北でもない）時だけ、撤退ボタンを表示 */}
            {!isVictory && !isDefeat && (
              <NavigationButton to="/battles" text="戦場から離脱する" isPrimary={false} />
            )}

            {/* 勝利時や敗北時は、このエリアには何も表示しないか、あるいは「戦歴を確認して帰還する」といった補足テキストを入れるのもアリです */}
            {(isVictory || isDefeat) && (
              <p className="text-[10px] text-gray-600 uppercase tracking-widest animate-pulse">
                The battle has ended. Return to headquarters.
              </p>
            )}
          </div>
        </div>

        {/* ★ カットイン演出レイヤー（動的版） */}
        {showCutIn && scenario.cutIn && (
          <div className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center overflow-hidden">
            {/* 背景色も動的に変更 */}
            <div className={`absolute w-[200%] h-32 animate-cutin-bg border-y-4 border-white/20 shadow-2xl ${scenario.cutIn.color || 'bg-blue-600/80'}`} />

            <div className="relative z-10 text-center animate-cutin-text">
              <p className="text-4xl sm:text-6xl font-black text-white italic tracking-tighter drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
                {scenario.cutIn.text}
              </p>
              <p className="text-right text-xl text-white/80 font-bold mt-4 mr-10">
                {scenario.cutIn.author}
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default BattleScreen;