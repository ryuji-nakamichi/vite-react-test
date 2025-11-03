import { Link } from "react-router-dom";
import Header from "../Components/Header";
function Home() {
  return (
    // 1. 骨格と背景の強化
    <div
      id="appWrapper"
      className="min-h-screen flex items-center justify-center py-20 bg-gray-900 px-6" // ★ px-6 を追加
    >
      <div className="w-full max-w-lg p-10 rounded-2xl shadow-2xl bg-gray-800 border border-red-800/50 text-center">

        {/* 2. タイトルとテーマの強調 */}
        <Header page={{ title: '〜其レハ智ノ旅路〜' }} />

        {/* 装飾的な区切り線を追加 */}
        <hr className="border-t-2 border-red-700/50 w-2/3 mx-auto mb-10" />

        <p className="text-xl text-gray-300 mb-8">
          モードを選択してください。
        </p>

        {/* 3. ボタンの差別化とアクションの強調 */}
        <div className="space-y-4"> {/* space-y-4 でボタン間に間隔を確保 */}

          <Link to="/quiz/select" className="block">
            <button
              className="w-full py-4 text-xl font-extrabold rounded-xl shadow-2xl 
                         bg-red-700 text-white 
                         hover:bg-red-600 
                         transform hover:scale-105 transition duration-300"
            >
              クイズで遊ぶ (出陣！)
            </button>
          </Link>

          <Link to="/dic/list" className="block">
            <button
              className="w-full py-4 text-xl font-extrabold rounded-xl shadow-2xl 
                         bg-purple-700 text-white 
                         hover:bg-red-600 
                         transform hover:scale-105 transition duration-300"
            >
              辞典を見る
            </button>
          </Link>

        </div>

      </div>
    </div>
  );
}

export default Home;