import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Error from "./Error";
import Header from "../../Components/Header";
import NavigationButton from "../../Components/NavigationButton";
import { generateDynamicQuiz } from "../../data/quizGenerator";

// 1. 引数に { isMonetized } を追加（黄金モード対応）
function Game({ isMonetized }) {
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

  // ★ 追加：ヒント用の状態
  const [hasUsedHint, setHasUsedHint] = useState(false); // ゲームを通して1回のみ
  const [hiddenChoices, setHiddenChoices] = useState([]); // 現在の問題で隠す選択肢のインデックス

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

  // ★ 追加：諸葛亮の助言ロジック
  const handleZhugeAdvice = () => {
    if (hasUsedHint || !currentQuizData[quizIndex]) return;

    const correctIdx = currentQuizData[quizIndex].answerIndex;
    // 正解以外のインデックス（0,1,2,3から正解を除く）を抽出
    const incorrectIndices = [0, 1, 2, 3].filter(idx => idx !== correctIdx);

    // 不正解の中からランダムに2つ選んで「隠す対象」にする
    const toHide = incorrectIndices
      .sort(() => Math.random() - 0.5)
      .slice(0, 2);

    setHiddenChoices(toHide);
    setHasUsedHint(true); // 使用済みにする
  };

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

    // ★ 追加：次の問題へ行く前にヒント表示をリセット
    setHiddenChoices([]);
    setQuizIndex((prev) => prev + 1);
  };

  return (
    /* 黄金モード対応：isMonetized で背景クラスを分岐 */
    <div id="appWrapper" className={`h-[100svh] flex flex-col transition-colors duration-1000 overflow-hidden ${isMonetized ? 'bg-golden-mode' : 'bg-gray-900'
      }`}>

      <Header page={{ title: 'クイズモード' }} difficulty={difficultyName} />

      <main className="flex-grow overflow-y-auto">
        <div className="w-full max-w-2xl mx-auto p-4 md:p-8">

          {currentQuizData[quizIndex] && (
            <div className="animate-fade-in">
              {/* 進捗表示 */}
              <div className="flex justify-between items-center mb-6 px-2">
                <span className="text-gray-400 font-bold tracking-widest text-sm">PROGRESS</span>
                <span className={`${isMonetized ? 'text-yellow-500' : 'text-red-500'} font-black text-xl`}>
                  {quizIndex + 1} <span className="text-gray-600 text-sm">/ {MAX_QUIZ_COUNT}</span>
                </span>
              </div>

              {/* クイズカード */}
              <div className={`backdrop-blur-md p-6 md:p-10 rounded-3xl shadow-2xl border transition-all duration-1000 text-center ${isMonetized ? 'bg-yellow-900/20 border-yellow-500/50' : 'bg-gray-800/60 border-red-800/30'
                }`}>

                {/* 問題文セクション */}
                <div className="mb-6">
                  <div className={`inline-block px-4 py-1 rounded-full border text-xs font-bold mb-4 tracking-widest ${isMonetized ? 'bg-yellow-900/30 border-yellow-500/30 text-yellow-400' : 'bg-red-900/30 border-red-500/30 text-red-400'
                    }`}>
                    QUESTION
                  </div>
                  <p className="text-xl md:text-3xl font-bold text-gray-100 leading-relaxed">
                    {currentQuizData[quizIndex].question}
                  </p>
                </div>

                {/* ★ 追加：諸葛亮の助言ボタン */}
                <div className="flex justify-center mb-10">
                  <button
                    onClick={handleZhugeAdvice}
                    disabled={hasUsedHint}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all duration-500 ${hasUsedHint
                        ? 'bg-gray-700/50 text-gray-500 cursor-not-allowed opacity-50'
                        : isMonetized
                          ? 'bg-gradient-to-r from-yellow-500 to-yellow-700 text-white shadow-[0_0_15px_rgba(234,179,8,0.4)] hover:scale-105'
                          : 'bg-gradient-to-r from-gray-700 to-gray-800 text-gray-200 border border-gray-600 hover:scale-105'
                      }`}
                  >
                    <span className="text-xl">🪶</span>
                    {hasUsedHint ? '助言は一度きりです' : '諸葛亮の助言を仰ぐ'}
                  </button>
                </div>

                {/* 選択肢 */}
                <div className="grid grid-cols-1 gap-4 text-left">
                  {currentQuizData[quizIndex].options.map((option, index) => {
                    const isHidden = hiddenChoices.includes(index);
                    return (
                      <button
                        key={index}
                        onClick={() => handleOptionClick(index)}
                        disabled={isHidden}
                        className={`group relative w-full py-5 px-6 rounded-2xl font-bold text-lg 
                                 border transition-all duration-300 flex items-center shadow-lg ${isHidden
                            ? 'opacity-0 pointer-events-none scale-95'
                            : isMonetized
                              ? 'bg-gray-900/80 text-white border-yellow-900/50 hover:border-yellow-500 active:scale-95'
                              : 'bg-gray-900 text-white border-gray-700 hover:border-red-500 active:scale-95'
                          }`}
                      >
                        <span className={`w-8 h-8 flex items-center justify-center rounded-full mr-4 transition-colors ${isMonetized ? 'bg-yellow-900/50 text-yellow-500 group-hover:bg-yellow-500 group-hover:text-black' : 'bg-red-900/50 text-red-500 group-hover:bg-red-500 group-hover:text-white'
                          }`}>
                          {index + 1}
                        </span>
                        {option}
                      </button>
                    );
                  })}
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