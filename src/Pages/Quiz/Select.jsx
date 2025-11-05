import Header from "../../Components/Header";
import NavigationButton from "../../Components/NavigationButton";
import DifficultyButton from "../../Components/DifficultyButton";
function Select() {
  return (
    // 1. 骨格と背景の統一
    <div
      id="appWrapper"
      className="min-h-screen flex items-center justify-center py-20 bg-gray-900 px-6"
    >
      <div className="w-full max-w-lg p-10 rounded-2xl shadow-2xl bg-gray-800 border border-red-800/50 text-center">

        {/* 2. タイトルと見出しの統一 */}
        <Header page={{ title: 'クイズモード' }} />

        <p className="text-xl text-gray-300 mb-10">難易度を選択してください。</p>

        {/* 難易度ボタン - 強い影とアニメーションを追加 */}
        <div className="space-y-4">

          {/* DifficultyButtonの使用 */}
          <DifficultyButton
            to="/quiz/game/easy"
            colorClass="bg-green-600 hover:bg-green-500"
            text="簡単"
          />

          <DifficultyButton
            to="/quiz/game/normal"
            colorClass="bg-yellow-500 hover:bg-yellow-400"
            text="普通"
            textColor="text-gray-900"
          />

          <DifficultyButton
            to="/quiz/game/hard"
            colorClass="bg-red-700 hover:bg-red-600"
            text="難しい"
          />
        </div>

        {/* ホームに戻るボタン - デザインを統一 */}
        <div className="mt-10">
          <NavigationButton
            to="/"
            text="ホームに戻る"
            isPrimary={false}
          />
        </div>

      </div>
    </div>
  );
}

export default Select;