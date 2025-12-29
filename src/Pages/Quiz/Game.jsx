import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Error from "./Error";
import Header from "../../Components/Header";
import NavigationButton from "../../Components/NavigationButton";
import { generateDynamicQuiz } from "../../data/quizGenerator";

function Game() {
  const { difficulty } = useParams(); // URLから難易度（easy, normal, hard）を取得

  // 難易度の日本語表示用
  const difficultyDisplayNames = {
    easy: "初級",
    normal: "中級",
    hard: "上級"
  };
  const difficultyName = difficultyDisplayNames[difficulty] || "不明";

  // クイズデータの生成（初回レンダリング時に一度だけ実行）
  const [currentQuizData] = useState(() => generateDynamicQuiz(difficulty, 5));

  const [quizIndex, setQuizIndex] = useState(0);
  const [answerLogs, setAnswerLogs] = useState([]);
  const navigate = useNavigate();
  const MAX_QUIZ_COUNT = currentQuizData.length;

  // 全問解答後の遷移処理
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

  // エラーハンドリング
  if (!currentQuizData || currentQuizData.length === 0) {
    return (
      <div id="appWrapper" className="min-h-screen flex items-center justify-center py-20 bg-gray-900 px-6">
        <div className="w-full max-w-xl p-10 rounded-2xl shadow-2xl bg-gray-800 border border-red-800/50 text-center">
          <Error page={{ from: "Game.jsx" }}>
            無効な難易度が選択されました。<br />難易度選択画面に戻ってください。
          </Error>
        </div>
      </div>
    );
  }

  // 選択肢がクリックされたときの処理
  const handleOptionClick = (selectedIndex) => {
    // 生成時に保証された answerIndex と比較
    const isCorrect = selectedIndex === currentQuizData[quizIndex].answerIndex;
    setAnswerLogs((prev) => [...prev, isCorrect]);
    setQuizIndex((prev) => prev + 1); // 次の問題へ
  };

  return (
    <div id="appWrapper" className="min-h-screen flex items-center justify-center py-20 bg-gray-900 px-6">
      <div className="w-full max-w-xl p-10 rounded-2xl shadow-2xl bg-gray-800 border border-red-800/50 text-center">

        <Header page={{ title: 'クイズモード' }} difficulty={difficultyName} />

        {currentQuizData[quizIndex] && (
          <div className="appQuizData">
            <p className="text-xl font-bold text-red-500 bg-gray-700/50 py-2 rounded-lg mb-8 border-b-2 border-red-500">
              第 {quizIndex + 1} 問 / 全 {MAX_QUIZ_COUNT} 問
            </p>

            <div className="bg-gray-700 p-8 rounded-lg shadow-xl mb-10 border-t-4 border-red-600">
              <p className="text-2xl font-semibold text-gray-100 mb-4">
                {currentQuizData[quizIndex].question}
              </p>
              <p className="text-base text-gray-400 mb-6">
                正解を選択してください。
              </p>

              <div className="grid grid-cols-1 gap-4">
                {currentQuizData[quizIndex].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleOptionClick(index)}
                    className="py-4 px-4 rounded-lg font-bold bg-indigo-600 text-white shadow-xl hover:bg-indigo-500 
                               transform hover:scale-105 transition duration-300"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="mt-8">
          <NavigationButton to="/" text="ホームに戻る" isPrimary={false} />
        </div>
      </div>
    </div>
  );
}

export default Game;