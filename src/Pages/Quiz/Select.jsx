// src/Pages/Quiz/Select.jsx

import Header from "../../Components/Header";
import NavigationButton from "../../Components/NavigationButton";
import DifficultyButton from "../../Components/DifficultyButton";

function Select() {
  return (
    // 1. 全体を h-[100svh] の縦並び(flex-col)にし、スクロールを制御
    <div id="appWrapper" className="h-[100svh] flex flex-col bg-gray-900 overflow-hidden">

      {/* 2. ヘッダーを外に出して上部に固定 */}
      <Header page={{ title: 'クイズモード' }} />

      {/* 3. メインコンテンツ領域：flex-grow で中央配置しやすくする */}
      <main className="flex-grow overflow-y-auto">
        <div className="w-full max-w-lg mx-auto p-4 md:p-8 flex flex-col justify-center min-h-full">

          <div className="animate-fade-in bg-gray-800/60 backdrop-blur-md p-8 md:p-12 rounded-3xl shadow-2xl border border-red-800/30 text-center">

            <div className="mb-10">
              <span className="text-red-500 font-bold tracking-[0.3em] text-xs uppercase block mb-2">Select Difficulty</span>
              <h3 className="text-xl md:text-2xl text-gray-200 font-serif italic">
                難易度を選択してください
              </h3>
            </div>

            {/* 難易度ボタンの間隔を gap で調整 */}
            <div className="flex flex-col gap-5">
              <DifficultyButton
                to="/quiz/game/easy"
                colorClass="bg-gradient-to-r from-green-800 to-green-600 hover:from-green-700 hover:to-green-500"
                text="初級（演義・正史の基礎）"
              />

              <DifficultyButton
                to="/quiz/game/normal"
                colorClass="bg-gradient-to-r from-yellow-700 to-yellow-600 hover:from-yellow-600 hover:to-yellow-500"
                text="中級（群雄割拠の知識）"
                textColor="text-white"
              />

              <DifficultyButton
                to="/quiz/game/hard"
                colorClass="bg-gradient-to-r from-red-900 to-red-700 hover:from-red-800 hover:to-red-600"
                text="上級（真の三國志通へ）"
              />
            </div>

            <p className="text-xs text-gray-500 mt-10 leading-relaxed">
              ※難易度に応じて、出題される武将の知名度や<br />
              マニアックなエピソードが変化します。
            </p>
          </div>

          {/* 下部ナビゲーション */}
          <div className="mt-12 mb-6">
            <NavigationButton
              to="/"
              text="ホームに戻る"
              isPrimary={false}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Select;