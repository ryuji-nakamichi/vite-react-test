import { Link, useNavigate } from "react-router-dom";
import quizData from "../../data/quiz";
import { useEffect, useState } from "react";

function Hard() {

  const { hardQuizData } = quizData;

  const [quizIndex, setQuizIndex] = useState(0); // 初期値を0にセット
  const [answerLogs, setAnswerLogs] = useState([]); // 解答ログを保存する配列
  const navigate = useNavigate();
  const MAX_QUIZ_COUNT = hardQuizData.length;
  const difficulty = "上級"; // 難易度設定も送る

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
    if (selectedIndex === hardQuizData[quizIndex].answerIndex) {
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
        {hardQuizData[quizIndex] && (
          <div className="appQuizData">
            <p className="appLead">{hardQuizData[quizIndex].question}</p>
            <p className="appLead">正解を選択してください。</p>
            <div className="appQuizButtonListContaier">
              {hardQuizData[quizIndex].options.map((option, index) => (
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

export default Hard;