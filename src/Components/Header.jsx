// src/Components/Header.jsx

import { useNavigate, useLocation } from "react-router-dom";

function Header({ page, difficulty }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/"; // ホームかどうか判定

  const mainTitle = page?.title || 'Undefined Title';
  const subTitle = difficulty
    ? `${mainTitle}（${difficulty}）`
    : mainTitle;

  return (
    <header className="sticky top-0 z-50 w-full bg-gray-900/90 backdrop-blur-xl border-b border-red-900/40">
      {/* セーフエリア（ノッチ）対策のパディング */}
      <div className="pt-[env(safe-area-inset-top)]">
        <div className="relative h-20 md:h-28 flex flex-col items-center justify-center px-4">

          {/* 戻るボタン：ホーム以外で表示 */}
          {!isHomePage && (
            <button
              onClick={() => navigate(-1)}
              className="absolute left-4 top-[calc(50%+10px)] -translate-y-1/2 p-2 rounded-full bg-red-900/20 text-red-500 border border-red-500/30 active:scale-90 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          <h1 className="text-2xl md:text-4xl font-black tracking-[0.2em] 
                   text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-300 to-red-500"
          >
            三國志 仮想戦史
          </h1>

          <h2 className="text-sm md:text-lg text-yellow-300/70 italic tracking-widest mt-1">
            {subTitle}
          </h2>
        </div>
      </div>
    </header>
  );
}

export default Header;