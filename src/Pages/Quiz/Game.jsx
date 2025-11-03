import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import quizData from "../../data/quiz";
import Error from "./Error";
import Header from "../../Components/Header";
function Game() {

  const difficultyParams = useParams();
  const dataKey = `${difficultyParams.difficulty}QuizData`; // "easyQuizData", "normalQuizData", "hardQuizData"のいずれかがdataKeyに入る
  const currentQuizData = quizData[dataKey]; // 通常の配列として取得可能
  // const currentQuizData = []; // 通常の配列として取得可能（エラー処理デバッグ用）

  let difficultyName;
  if (difficultyParams.difficulty === "easy") {
    difficultyName = "初級";
  } else if (difficultyParams.difficulty === "normal") {
    difficultyName = "中級";
  } else if (difficultyParams.difficulty === "hard") {
    difficultyName = "上級";
  } else {
    difficultyName = "不明";
  }

  if (currentQuizData.length === 0) {
    console.log("無効な難易度が選択されました。");
    return (
      <div id="appWrapper" className="appWrapper">
        <div className="appContents">
          <Error page={{
            from: "Game.jsx"
          }}>
            無効な難易度が選択されました。<br />難易度選択画面に戻ってください。
          </Error>
        </div>
      </div>
    );
  }

  const [quizIndex, setQuizIndex] = useState(0); // 初期値を0にセット
  const [answerLogs, setAnswerLogs] = useState([]); // 解答ログを保存する配列
  const navigate = useNavigate();
  const MAX_QUIZ_COUNT = currentQuizData.length;
  const difficulty = difficultyName || "不明"; // 難易度を取得
  
  useEffect(() => {
    // 全問解答後、結果画面に遷移する処理
    if (answerLogs.length > 1 && (answerLogs.length === MAX_QUIZ_COUNT)) {

      const correctAnswersNum = answerLogs.filter((isCorrectNum) => {
        return isCorrectNum === true;
      });


      // 結果画面に遷移し、解答ログを渡す
      navigate("/quiz/result", {
        state: {
          answerLogs: answerLogs,
          totalQuestions: MAX_QUIZ_COUNT,
          correctAnswers: correctAnswersNum.length,
          difficulty: difficulty,
        }
      });
    }
  }, [answerLogs, navigate, MAX_QUIZ_COUNT]);// 依存配列にanswerLogs, navigate, MAX_QUIZ_COUNTを追加



  // 選択肢がクリックされたときの処理
  const handleOptionClick = (selectedIndex) => {
    if (selectedIndex === currentQuizData[quizIndex].answerIndex) {
      // 正解の場合の処理
      setAnswerLogs((prev) => [...prev, true]); // 正解をログに追加
    } else {
      // 不正解の場合の処理
      setAnswerLogs((prev) => [...prev, false]); // 不正解をログに追加
    }
    setQuizIndex((prev) => prev + 1); // 次の問題へ進む
  }

  return (
    // 1. 骨格と背景の統一 (px-6を追加)
    <div id="appWrapper" className="min-h-screen flex items-center justify-center py-20 bg-gray-900 px-6">
      <div className="w-full max-w-xl p-10 rounded-2xl shadow-2xl bg-gray-800 border border-red-800/50 text-center">

        {/* 2. タイトルと見出しの統一 */}
        <Header page={{ title: 'クイズモード' }} />
        
        {currentQuizData[quizIndex] && (
          <div className="appQuizData">

            {/* 進捗表示の強化 */}
            <p className="text-xl font-bold text-red-500 bg-gray-700/50 py-2 rounded-lg mb-8 border-b-2 border-red-500">
              第 {quizIndex + 1} 問 / 全 {MAX_QUIZ_COUNT} 問
            </p>

            {/* 3. 問題エリアの強化 */}
            <div className="bg-gray-700 p-8 rounded-lg shadow-xl mb-10 border-t-4 border-red-600">
              <p className="text-2xl font-semibold text-gray-100 mb-4">
                {currentQuizData[quizIndex].question}
              </p>
              <p className="text-base text-gray-400 mb-6">
                正解を選択してください。
              </p>

              {/* 選択肢ボタンの強化（強い影とアニメーション） */}
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
        )
        }

        {/* ホームに戻るボタン（統一デザイン） */}
        <div className="mt-8">
          <Link to="/" className="block">
            <button className="w-full py-3 px-4 rounded-lg font-medium transition duration-200 
                               bg-gray-600 text-gray-200 hover:bg-gray-700">
              ホームに戻る
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Game;