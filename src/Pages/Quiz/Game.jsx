import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import quizData from "../../data/quiz";

function Game() {

  const difficultyParams = useParams();
  const dataKey = `${difficultyParams.difficulty}QuizData`; // "easyQuizData", "normalQuizData", "hardQuizData"のいずれかがdataKeyに入る
  const currentQuizData = quizData[dataKey]; // 通常の配列として取得可能

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

  if (!currentQuizData) {
    return (
      <div id="appWrapper" className="appWrapper">
        <div className="appContents">
          <h1 className="appHead --lv-1">三國志 仮想戦史</h1>
          <h2 className="appHead --lv-2">クイズモード</h2>
          <p className="appLead">無効な難易度が選択されました。</p>
          <div className="appButtonContainer">
            <Link to="/quiz/select">
              <button>難易度選択に戻る</button>
            </Link>
          </div>
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
    if (answerLogs.length === MAX_QUIZ_COUNT) {

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
    <div id="appWrapper" className="appWrapper">
      <div className="appContents">
        <h1 className="appHead --lv-1">三國志 仮想戦史</h1>
        <h2 className="appHead --lv-2">クイズモード</h2>
        {currentQuizData[quizIndex] && (
          <div className="appQuizData">
            <p className="appLead">{currentQuizData[quizIndex].question}</p>
            <p className="appLead">正解を選択してください。</p>
            <div className="appQuizButtonListContaier">
              {currentQuizData[quizIndex].options.map((option, index) => (
                <button key={index} onClick={() => handleOptionClick(index)}>{option}</button>
              ))}
            </div>
          </div>
        )
        }

        <div className="appButtonContainer">
          <Link to="/">
            <button>ホームに戻る</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Game;