// src/Pages/Dic/List.jsx

import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Header from "../../Components/Header";
import dic from "../../data/dic";
import CharacterCard from "../../Components/CharacterCard";
import NavigationButton from "../../Components/NavigationButton";

function List() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const modeFromUrl = searchParams.get('mode');
  const searchFromUrl = searchParams.get('search');

  // 初期値に URL からの検索ワードをセット
  const [searchTerm, setSearchTerm] = useState(searchFromUrl || "");
  const [selectedFaction, setSelectedFaction] = useState("すべて");
  const [globalMode, setGlobalMode] = useState(modeFromUrl || 'romance');

  // ★ 追加：URLパラメータが変わった時（別の武将リンクを踏んだ時など）に
  // 検索ワードを再セットする処理を入れておくと確実です
  useEffect(() => {
    if (searchFromUrl) {
      setSearchTerm(searchFromUrl);
    }
  }, [searchFromUrl]);

  const filteredCharacters = dic.ALL_DIC_DATA.filter((char) => {
    // 姓と名を結合したフルネームで判定
    const fullName = `${char.firstName}${char.lastName}`;
    const matchesSearch =
      fullName.includes(searchTerm) ||
      (char.nickName && char.nickName.includes(searchTerm));

    const matchesFaction =
      selectedFaction === "すべて" || char.group === selectedFaction;

    return matchesSearch && matchesFaction;
  });

  // ★ 2. 自動遷移ロジックの追加
  useEffect(() => {
    // 検索結果がちょうど1人、かつURLに検索パラメータがある場合
    if (filteredCharacters.length === 1 && searchFromUrl) {
      const targetChar = filteredCharacters[0];
      // 詳細ページへ自動遷移
      // replace: true をつけることで、戻るボタンを押したときに一覧画面で止まらず、
      // さらに前の画面（官職名鑑）まで戻れるようになります（無限ループ防止）
      navigate(`/dic/detail/${targetChar.id}?mode=${globalMode}`, { replace: true });
    }
  }, [filteredCharacters, searchFromUrl, globalMode, navigate]);

  const factions = ["すべて", "魏", "呉", "蜀"];

  return (
    // 1. 全体を h-[100svh] の縦並びに固定
    <div id="appWrapper" className="h-[100svh] flex flex-col bg-gray-900 overflow-hidden">

      {/* 2. 固定ヘッダー */}
      <Header page={{ title: '武将辞典' }} />

      {/* 3. 操作パネル領域（検索・フィルタ）：ここも固定、またはリストと一緒にスクロール */}
      <main className="flex-grow overflow-y-auto">
        <div className="w-full max-w-7xl mx-auto p-4 md:p-8">

          {/* コントロールパネル：スマホでは余白を詰め、透過背景で没入感を出す */}
          <div className="w-full max-w-3xl mx-auto p-5 md:p-8 mb-8 rounded-3xl shadow-2xl bg-gray-800/60 backdrop-blur-md border border-red-800/30 text-center">
            <div className="space-y-5">
              {/* 検索入力 */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="武将名・字で検索..."
                  className="w-full p-4 pl-12 rounded-xl bg-gray-900/80 text-white border border-gray-700 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition shadow-inner"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">🔍</span>
              </div>

              {/* 勢力フィルタボタン */}
              <div className="flex justify-center gap-2 flex-wrap">
                {factions.map((f) => (
                  <button
                    key={f}
                    onClick={() => setSelectedFaction(f)}
                    className={`px-5 py-2 rounded-full text-xs md:text-sm font-bold transition-all duration-300 ${selectedFaction === f
                        ? "bg-red-700 text-white shadow-lg scale-105"
                        : "bg-gray-700/50 text-gray-400 hover:bg-gray-600"
                      }`}
                  >
                    {f}
                  </button>
                ))}
              </div>

              {/* モード切り替えスイッチ */}
              <div className="flex justify-center bg-gray-950 p-1 rounded-full border border-gray-700 w-full max-w-xs mx-auto shadow-inner">
                <button
                  onClick={() => setGlobalMode('romance')}
                  className={`flex-1 py-2 px-4 rounded-full text-xs font-bold transition-all duration-300 ${globalMode === 'romance' ? 'bg-red-800 text-white shadow-lg' : 'text-gray-500'
                    }`}
                >
                  演義モード
                </button>
                <button
                  onClick={() => setGlobalMode('history')}
                  className={`flex-1 py-2 px-4 rounded-full text-xs font-bold transition-all duration-300 ${globalMode === 'history' ? 'bg-blue-900 text-white shadow-lg' : 'text-gray-500'
                    }`}
                >
                  正史モード
                </button>
              </div>
            </div>
          </div>

          {/* --- 4. 結果表示エリア --- */}
          {filteredCharacters.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 animate-fade-in">
              {filteredCharacters.map((character) => (
                <CharacterCard
                  key={character.id}
                  character={character}
                  viewMode={globalMode}
                  factionColor={character.group === '魏' ? 'text-blue-400' : character.group === '呉' ? 'text-red-400' : 'text-green-400'}
                  factionBorder={character.group === '魏' ? 'border-blue-600/30' : character.group === '呉' ? 'border-red-600/30' : 'border-green-600/30'}
                  factionBgColor={character.group === '魏' ? 'bg-blue-800' : character.group === '呉' ? 'bg-red-800' : 'bg-green-800'}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-800/30 rounded-3xl border border-dashed border-gray-700">
              <p className="text-gray-500 text-xl italic tracking-widest">該当する武将は戦史に見当たりません...</p>
            </div>
          )}

          {/* 下部ナビゲーション */}
          <div className="w-full max-w-xs mx-auto mt-16 pb-10">
            <NavigationButton to="/" text="ホームに戻る" isPrimary={false} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default List;