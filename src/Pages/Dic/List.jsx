// src/Pages/Dic/List.jsx

import { useState } from "react";
import Header from "../../Components/Header";
import dic from "../../data/dic";
import CharacterCard from "../../Components/CharacterCard";
import NavigationButton from "../../Components/NavigationButton";

function List() {
  // --- 1. 状態管理 (3つのState) ---
  const [searchTerm, setSearchTerm] = useState(""); // 名前検索用
  const [selectedFaction, setSelectedFaction] = useState("すべて"); // 勢力ボタン用
  const [globalMode, setGlobalMode] = useState('romance'); // 正史/演義切り替え用

  // --- 2. フィルタリングロジック ---
  // 全データから「検索ワード」と「勢力」の両方に合致するものを抽出
  const filteredCharacters = dic.ALL_DIC_DATA.filter((char) => {
    // 名前または字（nickName）が検索ワードに含まれているか
    const fullName = `${char.firstName}${char.lastName}`;
    const matchesSearch =
      fullName.includes(searchTerm) ||
      (char.nickName && char.nickName.includes(searchTerm));

    // 勢力が一致するか
    const matchesFaction =
      selectedFaction === "すべて" || char.group === selectedFaction;

    return matchesSearch && matchesFaction;
  });

  // UI用の定数
  const factions = ["すべて", "魏", "呉", "蜀"];

  return (
    <div id="appWrapper" className="min-h-screen py-16 bg-gray-900 px-6">
      <div className="max-w-7xl mx-auto">

        {/* --- 3. コントロールパネル (検索・フィルタ・モード切替) --- */}
        <div className="w-full max-w-xl mx-auto p-10 mb-8 rounded-2xl shadow-2xl bg-gray-800 border border-red-800/50 text-center">
          <Header page={{ title: '武将辞典' }} />

          <div className="mt-6 space-y-6">
            {/* 検索入力 */}
            <input
              type="text"
              placeholder="武将名・字で検索..."
              className="w-full p-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:border-red-500 outline-none transition shadow-inner"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* 勢力フィルタボタン */}
            <div className="flex justify-center gap-2 flex-wrap">
              {factions.map((f) => (
                <button
                  key={f}
                  onClick={() => setSelectedFaction(f)}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${selectedFaction === f
                      ? "bg-yellow-600 text-white shadow-lg"
                      : "bg-gray-700 text-gray-400 hover:bg-gray-600"
                    }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* モード切り替えスイッチ */}
            <div className="flex justify-center bg-gray-900 p-1 rounded-full border border-gray-700 w-full max-w-xs mx-auto shadow-inner">
              <button
                onClick={() => setGlobalMode('romance')}
                className={`flex-1 py-2 px-4 rounded-full text-xs font-bold transition-all duration-300 ${globalMode === 'romance' ? 'bg-red-700 text-white shadow-lg' : 'text-gray-500'
                  }`}
              >
                演義モード
              </button>
              <button
                onClick={() => setGlobalMode('history')}
                className={`flex-1 py-2 px-4 rounded-full text-xs font-bold transition-all duration-300 ${globalMode === 'history' ? 'bg-blue-800 text-white shadow-lg' : 'text-gray-500'
                  }`}
              >
                正史モード
              </button>
            </div>
          </div>
        </div>

        {/* --- 4. 結果表示エリア --- */}
        {filteredCharacters.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
            {filteredCharacters.map((character) => (
              <CharacterCard
                key={character.id}
                character={character}
                viewMode={globalMode} // ★ 正史/演義の状態を渡す
                // 勢力に応じた色設定（以前のロジックを統合）
                factionColor={character.group === '魏' ? 'text-blue-400' : character.group === '呉' ? 'text-red-400' : 'text-green-400'}
                factionBorder={character.group === '魏' ? 'border-blue-600/30' : character.group === '呉' ? 'border-red-600/30' : 'border-green-600/30'}
                factionBgColor={character.group === '魏' ? 'bg-blue-800' : character.group === '呉' ? 'bg-red-800' : 'bg-green-800'}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-xl italic">該当する武将は戦史に見当たりません...</p>
          </div>
        )}

        <div className="w-full max-w-md mx-auto mt-12">
          <NavigationButton to="/" text="ホームに戻る" isPrimary={false} />
        </div>
      </div>
    </div>
  );
}

export default List;