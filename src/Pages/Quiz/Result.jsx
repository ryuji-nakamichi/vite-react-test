import { Link, useLocation } from "react-router-dom";
import Header from "../../Components/Header";
function Result() {
  const location = useLocation();
  const answerLogs = location.state?.answerLogs || [];
  const totalQuestions = location.state?.totalQuestions || 0;
  const correctAnswers = location.state?.correctAnswers || 0;
  const score = correctAnswers * 20;
  const difficulty = location.state?.difficulty || "不明";

  // スコアに基づくメッセージ
  const resultMessage = correctAnswers === totalQuestions ? "完璧です！大軍師の采配！" : "よく頑張りました！次も挑戦を！";

  return (
    <div id="appWrapper" className="min-h-screen flex items-center justify-center py-20 bg-gray-900 px-6">
      <div className="w-full max-w-xl p-10 rounded-2xl shadow-2xl bg-gray-800 border border-red-800/50 text-center">

        {/* 2. タイトルと見出しの統一 */}
        <Header page={{ title: 'クイズモード' }} />

        {/* 3. 結果概要エリアの強化 */}
        <div className="bg-gray-700/60 p-8 rounded-lg shadow-xl mb-10 border-t-4 border-yellow-500">
          <p className="text-3xl font-bold text-yellow-400 mb-4">{resultMessage}</p>

          {/* スコア強調 */}
          <p className="text-base text-gray-400 mb-2">得点</p>
          <p className="text-7xl font-black text-green-400 mb-4 leading-none">
            {score} 点
          </p>

          <p className="text-xl text-gray-300 mb-2">
            {`全${totalQuestions}問中、${correctAnswers}問正解`}
          </p>
          <p className="text-base text-gray-400">
            {`難易度: ${difficulty}`}
          </p>
        </div>

        {/* 4. 解答ログエリアの強化 */}
        <div className="mb-10 p-4 rounded-lg bg-gray-900 border border-gray-700">
          <h3 className="text-lg font-semibold text-gray-200 mb-3 border-b border-gray-600 pb-2">解答詳細</h3>
          <ul className="space-y-2 text-left">
            {answerLogs.map((isCorrect, index) => (
              <li
                key={index}
                className={`p-2 rounded-md font-medium text-gray-100 ${isCorrect ? 'bg-green-700' : 'bg-red-700'}`}
              >
                {`第${index + 1}問: ${isCorrect ? "正解" : "不正解"}`}
              </li>
            ))}
          </ul>
        </div>

        {/* ボタンの統一 */}
        <div className="appButtonContainer">
          <Link to="/" className="block">
            <button className="w-full py-3 px-4 rounded-lg font-medium transition duration-200 
                               bg-red-700 text-white hover:bg-red-600 shadow-md">
              ホームに戻る
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Result;