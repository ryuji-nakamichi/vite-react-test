import { Link, useNavigate } from "react-router-dom";
import easyQuizData from "../../data/quiz";
import { useEffect, useState } from "react";

function Easy() {

  // const quizIndex = 0; // 現在は0番目の問題を表示するように固定
  const [quizIndex, setQuizIndex] = useState(0); // 初期値を0にセット
  const [ answerLogs, setAnswerLogs ] = useState([]); // 解答ログを保存する配列
  const navigate = useNavigate();
  const MAX_QUIZ_COUNT = easyQuizData.length;

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
          correctAnswers: correctAnswersNum.length
        }
      });
    }
  }, [answerLogs, navigate, MAX_QUIZ_COUNT]);// 依存配列にanswerLogs, navigate, MAX_QUIZ_COUNTを追加

  

  // 選択肢がクリックされたときの処理
  const handleOptionClick = (selectedIndex) => {
    if (selectedIndex === easyQuizData[quizIndex].answerIndex) {
      // 正解の場合の処理
      setAnswerLogs((prev) => [...prev, true]); // 正解をログに追加
    } else {
      // 不正解の場合の処理
      setAnswerLogs((prev) => [...prev, false]); // 不正解をログに追加
    }
    setQuizIndex((prev) => prev + 1); // 次の問題へ進む
  }

  return (
    <div>
      { easyQuizData[quizIndex] && (
        <div>
          <h1>三國志 仮想戦史</h1>
          <h2>クイズモード</h2>
          <p>{easyQuizData[quizIndex].question}</p>
          <p>正解を選択してください。</p>

          <div>
            {easyQuizData[quizIndex].options.map((option, index) => (
              <button key={index} onClick={() => handleOptionClick(index)}>{option}</button>
            )) }
          </div>
        </div>
        )
      }

      <div>
        <Link to="/">
          <button>ホームに戻る</button>
        </Link>
      </div>
    </div>
  );
}

export default Easy;