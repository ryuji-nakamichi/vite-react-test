// src/Pages/Home.jsx (CSSブラッシュアップ適用後)

import { Link } from "react-router-dom";
import Header from "../Components/Header";
import NavigationButton from "../Components/NavigationButton";

function Home() {
  return (
    // 1. 骨格と背景の強化 (背景グラデーションを追加)
    <div
      id="appWrapper"
      className="min-h-screen flex items-center justify-center py-20 px-6 
                 bg-gradient-to-br from-gray-900 via-gray-900 to-red-900/40" // ★ 背景を暗く、赤のアクセントを加えたグラデーションに変更 ★
    >
      <div
        className="w-full max-w-lg p-10 rounded-2xl shadow-2xl text-center 
                   bg-gray-800/90 backdrop-blur-sm border border-red-700/80 
                   transform hover:scale-[1.02] transition duration-500" // ★ コンテナの背景を透過させ、ホバーで拡大するエフェクトを追加 ★
      >

        {/* 2. タイトルとテーマの強調 */}
        <Header page={{ title: '〜其レハ智ノ旅路〜' }} />

        {/* 装飾的な区切り線を追加 (色と太さを強調) */}
        <hr className="border-t-4 border-red-600/70 w-2/3 mx-auto my-8 shadow-inner" />

        <p className="text-xl text-gray-300 mb-8 font-serif italic">
          モードを選択してください。
        </p>

        {/* 3. ボタンの差別化とアクションの強調 */}
        <div className="space-y-6">

          {/* クイズボタン (赤のプライマリカラーを強調) */}
          <NavigationButton
            to="/quiz/select"
            text="クイズで遊ぶ (出陣！)"
            isPrimary={true}
            className="py-5 text-2xl font-black shadow-[0_0_20px_rgba(239,68,68,0.7)]" // ★ 炎のような強いシャドウ ★
          />

          {/* 辞典ボタン (紫から赤茶系に変更し、差別化) */}
          <Link to="/dic/list" className="block">
            <button
              className="w-full py-4 text-xl font-extrabold rounded-xl shadow-lg bg-red-900 text-white border border-red-700hover:bg-red-800 transform hover:scale-105 transition duration-300"
            >
              武将名鑑を見る (情報収集)
            </button>
          </Link>

        </div>

      </div>
    </div>
  );
}

export default Home;