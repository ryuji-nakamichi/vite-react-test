// src/Components/CharacterCard.jsx

import { Link } from "react-router-dom";

// 汎用的な構造/アニメーションのクラスを定義 (色を除く)
const BASE_BUTTON_CLASSES =
  "w-full py-2 text-white font-semibold rounded-lg transition duration-150 shadow-md transform hover:scale-[1.02]";

function CharacterCard({ character, factionColor, factionBorder, factionBgColor }) {
  // リンク先パスの安全な生成 (nickNameがない場合を考慮)
  const detailPath = `/dic/detail/${character.id || `unknown-${character.firstName}${character.lastName}`}`;

  return (
    <div className="flex flex-col">
      <Link
        to={detailPath}
        className="block h-full transition-all duration-300 transform hover:scale-[1.03] hover:shadow-2xl"
      >
        <div
          className={`h-full bg-gray-800 rounded-xl shadow-2xl overflow-hidden ${factionBorder} border flex flex-col`}
        >

          {/* カード上部の情報（武将名と字） */}
          <div className="p-4 bg-gray-700/50 border-b border-gray-600">
            <p className="text-xl font-extrabold text-white leading-tight">
              {character.firstName} {character.lastName}
            </p>
            {/* 字（ニックネーム）を勢力色で表示 */}
            <p className={`text-sm font-medium ${factionColor} mt-0.5`}>
              {character.nickName || '字不明'}
            </p>
          </div>

          {/* カード本文（キャッチフレーズ） */}
          <div className="p-4 flex-grow">
            <p className="text-sm text-gray-400 italic">
              "{character.catch}"
            </p>
          </div>

          {/* アクション/フッター部分 */}
          <div className="p-4 pt-2 mt-auto">
            <button
              // BASE_BUTTON_CLASSESに勢力ごとの背景色クラスを結合
              className={`${BASE_BUTTON_CLASSES} ${factionBgColor}`}
            >
              詳細情報
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default CharacterCard;