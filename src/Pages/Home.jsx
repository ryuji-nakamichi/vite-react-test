import { Link } from "react-router-dom";
import Header from "../Components/Header";
import NavigationButton from "../Components/NavigationButton";
import { getPlayerTitle } from '../utils/titleSystem';

function Home({ isMonetized, visitedBranches = [] }) {
  const title = getPlayerTitle(visitedBranches.length, isMonetized);

  return (
    <div className="flex-grow flex flex-col w-full h-full">
      {/* 1. ヘッダー（ページタイトルのみ） */}
      <Header page={{ title: '〜其レハ智ノ旅路〜' }} />

      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 py-6">
        <div
          className={`relative w-full sm:max-w-2xl p-6 sm:p-12 sm:rounded-3xl shadow-2xl text-center 
             backdrop-blur-md border transition-all duration-1000 ${isMonetized
              ? 'bg-yellow-900/20 border-yellow-500/50 shadow-[0_0_30px_rgba(234,179,8,0.2)]'
              : 'bg-gray-800/70 border-red-700/30'
            }`}
        >
          {/* ★ 新設：軍師ステータスプレート */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-4/5 sm:w-2/3">
            <div className={`relative px-4 py-2 rounded-xl border-2 shadow-2xl transition-all duration-1000 ${isMonetized
                ? 'bg-gray-900 border-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.4)]'
                : 'bg-gray-900 border-red-900/50 shadow-black'
              }`}>
              {/* ランクバッジ（左上にスタンプのように配置） */}
              <div className={`absolute -left-3 -top-3 w-10 h-10 flex items-center justify-center rounded-full border-2 font-black text-xs rotate-[-15deg] shadow-lg ${title.rank === 'SSR' ? 'bg-yellow-500 text-black border-yellow-200' :
                  title.rank === 'SR' ? 'bg-blue-600 text-white border-blue-400' :
                    'bg-gray-800 text-gray-400 border-gray-600'
                }`}>
                {title.rank}
              </div>

              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em] block">Current Strategist Title</span>
              <div className={`text-xl sm:text-2xl font-black italic tracking-tighter ${title.color}`}>
                {title.name}
              </div>
            </div>
          </div>

          {/* 余白調整：プレートが上に乗るので、コンテンツの先頭に少しマージンを空ける */}
          <div className="mt-8">
            <hr className={`w-1/4 mx-auto mb-8 border-t-2 transition-colors duration-1000 ${isMonetized ? 'border-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.8)]' : 'border-red-600/50'
              }`} />

            <p className="text-lg md:text-xl text-gray-300 mb-10 font-serif italic tracking-widest">
              モードを選択してください
            </p>

            <div className="space-y-6 sm:space-y-8">
              {/* 各種ボタン... */}
              <NavigationButton to="/quiz/select" text="クイズで遊ぶ（出陣！）" isPrimary={true} className="py-6 text-xl sm:text-2xl font-black w-full block" />

              {/* 仮想戦史ボタン */}
              <Link to="/simulation" className="block w-full">
                <button className={`w-full py-5 text-xl sm:text-2xl font-black rounded-2xl shadow-xl transition-all duration-500 border-2 ${isMonetized
                    ? 'bg-gradient-to-r from-amber-600 to-yellow-500 text-black border-yellow-300'
                    : 'bg-gradient-to-r from-indigo-900 to-blue-900 text-white border-blue-700/50'
                  }`}>
                  <span className="flex items-center justify-center gap-3">
                    🌲 仮想戦史を編む (Simulation)
                  </span>
                </button>
              </Link>

              {/* 武将名鑑ボタン */}
              <Link to="/dic/list" className="block w-full">
                <button className="w-full py-5 text-xl font-extrabold rounded-2xl shadow-lg bg-gradient-to-r from-red-950 to-red-900 text-white border border-red-800/50 transition duration-300">
                  武将名鑑を見る
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;