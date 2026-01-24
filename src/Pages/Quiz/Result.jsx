// src/Pages/Quiz/Result.jsx

import { useEffect } from 'react';
import { useLocation } from "react-router-dom";
import Header from "../../Components/Header";
import NavigationButton from "../../Components/NavigationButton";

function Result({ updateQuizStats }) {
  const location = useLocation();
  const answerLogs = location.state?.answerLogs || [];
  const totalQuestions = location.state?.totalQuestions || 0;
  const correctAnswers = location.state?.correctAnswers || 0;
  const score = correctAnswers * 20;
  const difficulty = location.state?.difficulty || "不明";

  // ★ 追加：ページ読み込み時にクイズ成績を App.jsx へ報告する
  useEffect(() => {
    if (updateQuizStats) {
      // 正解数と難易度を親コンポーネントのステートに保存
      updateQuizStats(correctAnswers, difficulty);
    }
  }, []); // [] により、結果画面が出た時の一度だけ実行される

  // スコアに基づく称号（より三國志らしく）
  const getRank = () => {
    if (score === 100) return { title: "大軍師の采配", color: "text-yellow-400" };
    if (score >= 60) return { title: "猛将の活躍", color: "text-red-400" };
    return { title: "一兵卒の修行", color: "text-gray-400" };
  };

  const rank = getRank();

  return (
    // 1. 全体を h-[100svh] で固定
    <div id="appWrapper" className="h-[100svh] flex flex-col bg-gray-900 overflow-hidden">

      {/* 2. ヘッダーを固定 */}
      <Header page={{ title: 'クイズ結果' }} difficulty={difficulty} />

      {/* 3. メインコンテンツ領域 */}
      <main className="flex-grow overflow-y-auto">
        <div className="w-full max-w-2xl mx-auto p-4 md:p-8">

          <div className="animate-fade-in">
            {/* スコアカード：金色の装飾で達成感を演出 */}
            <div className="bg-gray-800/60 backdrop-blur-md p-8 md:p-12 rounded-3xl shadow-2xl border border-yellow-600/30 text-center mb-8">
              <p className={`text-xl md:text-2xl font-black tracking-widest mb-4 ${rank.color}`}>
                【 {rank.title} 】
              </p>

              <div className="relative inline-block mb-6">
                <p className="text-base text-gray-500 mb-1 tracking-tighter">得点</p>
                <p className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-green-300 to-green-600 leading-none">
                  {score}
                </p>
                <span className="absolute -right-8 bottom-0 text-2xl text-green-600 font-bold">点</span>
              </div>

              <div className="flex justify-center gap-8 border-t border-gray-700/50 pt-6">
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">正解数</p>
                  <p className="text-xl font-bold text-gray-200">{correctAnswers} / {totalQuestions}</p>
                </div>
                <div className="text-center border-l border-gray-700/50 pl-8">
                  <p className="text-xs text-gray-500 mb-1">難易度</p>
                  <p className="text-xl font-bold text-gray-200">{difficulty}</p>
                </div>
              </div>
            </div>

            {/* 解答詳細ログ：戦記風のリスト */}
            <div className="bg-gray-950/50 rounded-2xl p-6 border border-gray-800 mb-10">
              <h3 className="text-sm font-bold text-gray-500 mb-4 tracking-widest text-center uppercase">戦績詳細（解答ログ）</h3>
              <div className="space-y-3">
                {answerLogs.map((isCorrect, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-4 rounded-xl border transition-all ${isCorrect
                        ? 'bg-green-900/10 border-green-800/30 text-green-400'
                        : 'bg-red-900/10 border-red-800/30 text-red-400'
                      }`}
                  >
                    <span className="font-bold">第 {index + 1} 問</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{isCorrect ? "見事なり" : "不覚..."}</span>
                      <span className="text-2xl">
                        {isCorrect ? "○" : "×"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 下部ナビゲーション */}
          <div className="mt-8 mb-12">
            <NavigationButton to="/" text="ホームに戻る" isPrimary={false} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Result;