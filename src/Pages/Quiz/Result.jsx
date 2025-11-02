import { Link, useLocation } from "react-router-dom";
function Result() {

  const location = useLocation();
  const answerLogs = location.state?.answerLogs || []; // 解答ログを取得
  const totalQuestions = location.state?.totalQuestions || 0; // 総問題数を取得
  const correctAnswers = location.state?.correctAnswers || 0; // 正解数を取得
  const score = correctAnswers * 20; // 1問あたり20点として計算
  const difficulty = location.state?.difficulty || "不明"; // 難易度を取得

  return (
    <div id="appWrapper" className="appWrapper">
      <div className="appContents">
        <h1 className="appHead --lv-1">三國志 仮想戦史</h1>
        <h2 className="appHead --lv-2">クイズモード</h2>
        <p className="appLead">結果発表ページ</p>
        <p className="appLead">
          {`全${totalQuestions}問中、${correctAnswers}問正解。${score}点でした。`}
        </p>
        <p className="appLead">{`難易度: ${difficulty}`}</p>

        <div className="appQuizResultListContainer">
          <ul className="appQuizResultList">
            {answerLogs.map((isCorrect, index) => (
              <li key={index} className="appQuizResultListItem">
                {`第${index + 1}問: ${isCorrect ? "正解" : "不正解"}`}
              </li>
            ))}
          </ul>
        </div>

        <div className="appButtonContainer">
          <Link to="/">
            <button>ホームに戻る</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Result;