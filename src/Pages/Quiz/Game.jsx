// src/Pages/Quiz/Game.jsx

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Error from "./Error";
import Header from "../../Components/Header";
import NavigationButton from "../../Components/NavigationButton";
import { generateDynamicQuiz } from "../../data/quizGenerator";

function Game() {
  const { difficulty } = useParams();

  const difficultyDisplayNames = {
    easy: "初級",
    normal: "中級",
    hard: "上級"
  };
  const difficultyName = difficultyDisplayNames[difficulty] || "不明";

  const [currentQuizData] = useState(() => generateDynamicQuiz(difficulty, 5));
  const [quizIndex, setQuizIndex] = useState(0);
  const [answerLogs, setAnswerLogs] = useState([]);
  const navigate = useNavigate();
  const MAX_QUIZ_COUNT = currentQuizData.length;

  useEffect(() => {
    if (answerLogs.length > 0 && answerLogs.length === MAX_QUIZ_COUNT) {
      const correctCount = answerLogs.filter(isCorrect => isCorrect === true).length;
      navigate("/quiz/result", {
        state: {
          answerLogs: answerLogs,
          totalQuestions: MAX_QUIZ_COUNT,
          correctAnswers: correctCount,
          difficulty: difficultyName,
        }
      });
    }
  }, [answerLogs, navigate, MAX_QUIZ_COUNT, difficultyName]);

  // エラーハンドリング用の体裁も統一
  if (!currentQuizData || currentQuizData.length === 0) {
    return (
      <div id="appWrapper" className="h-[100svh] flex flex-col bg-gray-900">
        <Header page={{ title: 'エラー' }} />
        <main className="flex-grow flex items-center justify-center p-6">
          <div className="w-full max-w-lg p-10 rounded-3xl bg-gray-800 border border-red-800/50 text-center">
            <Error page={{ from: "Game.jsx" }}>
              無効な難易度が選択されました。<br />難易度選択画面に戻ってください。
            </Error>
          </div>
        </main>
      </div>
    );
  }

  const handleOptionClick = (selectedIndex) => {
    const isCorrect = selectedIndex === currentQuizData[quizIndex].answerIndex;
    setAnswerLogs((prev) => [...prev, isCorrect]);
    setQuizIndex((prev) => prev + 1);
  };

  return (
    // 1. 全体を h-[100svh] で固定
    <div id="appWrapper" className="h-[100svh] flex flex-col bg-gray-900 overflow-hidden">

      {/* 2. ヘッダーを固定 */}
      <Header page={{ title: 'クイズモード' }} difficulty={difficultyName} />

      {/* 3. メインコンテンツ領域：スクロール可能に */}
      <main className="flex-grow overflow-y-auto">
        <div className="w-full max-w-2xl mx-auto p-4 md:p-8">

          {currentQuizData[quizIndex] && (
            <div className="animate-fade-in">
              {/* 進捗表示 */}
              <div className="flex justify-between items-center mb-6 px-2">
                <span className="text-gray-400 font-bold tracking-widest text-sm">PROGRESS</span>
                <span className="text-red-500 font-black text-xl">
                  {quizIndex + 1} <span className="text-gray-600 text-sm">/ {MAX_QUIZ_COUNT}</span>
                </span>
              </div>

              {/* クイズカード：スマホでは端まで広げ、没入感を出す */}
              <div className="bg-gray-800/60 backdrop-blur-md p-6 md:p-10 rounded-3xl shadow-2xl border border-red-800/30 text-center">

                {/* 問題文セクション */}
                <div className="mb-10">
                  <div className="inline-block px-4 py-1 rounded-full bg-red-900/30 border border-red-500/30 text-red-400 text-xs font-bold mb-4 tracking-widest">
                    QUESTION
                  </div>
                  <p className="text-xl md:text-3xl font-bold text-gray-100 leading-relaxed">
                    {currentQuizData[quizIndex].question}
                  </p>
                </div>

                {/* 選択肢：押しやすさを最優先に */}
                <div className="grid grid-cols-1 gap-4">
                  {currentQuizData[quizIndex].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleOptionClick(index)}
                      className="group relative w-full py-5 px-6 rounded-2xl font-bold text-lg 
                               bg-gray-900 text-white border border-gray-700 
                               hover:border-red-500 hover:bg-gray-800 
                               active:scale-95 transition-all duration-200 text-left flex items-center shadow-lg"
                    >
                      <span className="w-8 h-8 flex items-center justify-center rounded-full bg-red-900/50 text-red-500 mr-4 group-hover:bg-red-500 group-hover:text-white transition-colors">
                        {index + 1}
                      </span>
                      {option}
                    </button>
                  ))}
                </div>

                <p className="text-xs text-gray-500 mt-8 italic">
                  ※正解と思う武将を選択して「出陣」せよ
                </p>
              </div>
            </div>
          )}

          {/* 下部ナビゲーション */}
          <div className="mt-12 mb-10">
            <NavigationButton to="/" text="ホームに戻る" isPrimary={false} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Game;