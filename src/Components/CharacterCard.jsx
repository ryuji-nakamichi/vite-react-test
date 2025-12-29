// src/Components/CharacterCard.jsx

import { Link } from "react-router-dom";

const BASE_BUTTON_CLASSES =
  "w-full py-2 text-white font-semibold rounded-lg transition duration-150 shadow-md transform hover:scale-[1.02]";

function CharacterCard({ character, viewMode, factionColor, factionBorder, factionBgColor }) {
  const currentDetails = character.details[viewMode];

  // ★ リンク先に現在のモード（viewMode）をクエリパラメータとして追加 ★
  const detailPath = `/dic/detail/${character.id}?mode=${viewMode}`;

  return (
    <div className="flex flex-col">
      <Link to={detailPath} className="block h-full transition-all duration-300 transform hover:scale-[1.03]">
        <div className={`h-full bg-gray-800 rounded-xl shadow-2xl overflow-hidden ${factionBorder} border flex flex-col`}>
          
          <div className="p-4 bg-gray-700/50 border-b border-gray-600">
            <p className="text-xl font-extrabold text-white leading-tight">
              {character.firstName} {character.lastName}
            </p>
            <p className={`text-sm font-medium ${factionColor} mt-0.5`}>
              {character.nickName || '字不明'}
            </p>
          </div>

          <div className="p-4 flex-grow">
            <p className="text-sm text-gray-300 italic leading-relaxed">
              "{currentDetails.catch}"
            </p>
          </div>

          <div className="p-4 pt-2 mt-auto">
            <button className={`${BASE_BUTTON_CLASSES} ${factionBgColor}`}>
              詳細情報
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default CharacterCard;