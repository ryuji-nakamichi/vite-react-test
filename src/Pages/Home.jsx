// src/Pages/Home.jsx

import { Link } from "react-router-dom";
import Header from "../Components/Header";
import NavigationButton from "../Components/NavigationButton";

function Home() {
  return (
    // 1. py-20を削除し、h-[100svh]で画面に固定
    <div
      id="appWrapper"
      className="h-[100svh] w-full flex flex-col overflow-hidden
                 bg-gradient-to-br from-gray-900 via-gray-900 to-red-900/40"
    >
      {/* 2. Headerを外側に出す（Stickyを活かすため） */}
      <Header page={{ title: '〜其レハ智ノ旅路〜' }} />

      {/* 3. コンテンツエリア：flex-growで余った隙間をすべて使う */}
      <main className="flex-grow flex items-center justify-center px-4">

        <div
          className="w-full max-w-lg p-6 md:p-10 rounded-3xl shadow-2xl text-center 
                     bg-gray-800/60 backdrop-blur-md border border-red-700/30 
                     transform hover:scale-[1.01] transition duration-500"
        >
          {/* 装飾的な区切り線 */}
          <hr className="border-t-2 border-red-600/50 w-1/4 mx-auto mb-8" />

          <p className="text-lg md:text-xl text-gray-300 mb-10 font-serif italic tracking-widest">
            モードを選択してください
          </p>

          <div className="space-y-8">
            {/* クイズボタン */}
            <NavigationButton
              to="/quiz/select"
              text="クイズで遊ぶ（出陣！）"
              isPrimary={true}
              className="py-6 text-2xl font-black"
            />

            {/* 辞典ボタン */}
            <Link to="/dic/list" className="block">
              <button
                className="w-full py-5 text-xl font-extrabold rounded-2xl shadow-lg 
                           bg-gradient-to-r from-red-950 to-red-900 text-white 
                           border border-red-800/50 hover:from-red-900 hover:to-red-800 
                           transition duration-300"
              >
                武将名鑑を見る（情報収集）
              </button>
            </Link>
          </div>

          <p className="mt-10 text-xs text-gray-500 tracking-tighter">
            © 2026 三國志 仮想戦史 - 真・歴史体験
          </p>
        </div>
      </main>
    </div>
  );
}

export default Home;