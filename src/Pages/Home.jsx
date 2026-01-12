import { Link } from "react-router-dom";
import Header from "../Components/Header";
import NavigationButton from "../Components/NavigationButton";

function Home({ isMonetized }) {
  return (
    /* flex-grow: 親のmain要素の残りの高さをすべて使う
      flex flex-col: ヘッダーとメインコンテンツを縦に並べる
    */
    <div className="flex-grow flex flex-col w-full">

      {/* 1. ヘッダー部分 */}
      <Header page={{ title: '〜其レハ智ノ旅路〜' }} />

      {/* 2. コンテンツエリア 
        items-center justify-center で、カードを画面の「ど真ん中」に配置。
        px-2: スマホで画面端ギリギリまで広げる（SPサイズ対策）
      */}
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6">

        <div
          className={`w-full sm:max-w-2xl p-6 sm:p-12 sm:rounded-3xl shadow-2xl text-center 
             backdrop-blur-md border transition-all duration-1000 ${isMonetized
              ? 'bg-yellow-900/20 border-yellow-500/50 shadow-[0_0_30px_rgba(234,179,8,0.2)]'
              : 'bg-gray-800/70 border-red-700/30'
            }`}
        >
          {/* 支援中のみ区切り線を黄金に */}
          <hr className={`w-1/4 mx-auto mb-8 border-t-2 transition-colors duration-1000 ${isMonetized ? 'border-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.8)]' : 'border-red-600/50'
            }`} />

          <p className="text-lg md:text-xl text-gray-300 mb-10 font-serif italic tracking-widest">
            モードを選択してください
          </p>

          <div className="space-y-6 sm:space-y-8">
            {/* クイズボタン */}
            <NavigationButton
              to="/quiz/select"
              text="クイズで遊ぶ（出陣！）"
              isPrimary={true}
              className="py-6 text-xl sm:text-2xl font-black w-full block"
            />

            {/* 辞典ボタン */}
            <Link to="/dic/list" className="block w-full">
              <button
                className="w-full py-5 text-xl font-extrabold rounded-2xl shadow-lg 
                           bg-gradient-to-r from-red-950 to-red-900 text-white 
                           border border-red-800/50 hover:from-red-900 hover:to-red-800 
                           transition duration-300"
              >
                武将名鑑を見る
              </button>
            </Link>
          </div>

          <p className="mt-10 text-[10px] sm:text-xs text-gray-500 tracking-tighter">
            © 2026 三國志 仮想戦史 - 真・歴史体験
          </p>
        </div>
      </main>
    </div>
  );
}

export default Home;