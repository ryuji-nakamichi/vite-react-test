// src/Components/DifficultyButton.jsx

import { Link } from 'react-router-dom';

// 難易度ボタンに共通する構造とアニメーションのスタイルを定義
const BASE_BUTTON_CLASSES = 
  "w-full py-4 px-4 rounded-lg font-bold transition duration-300 uppercase tracking-widest shadow-xl transform hover:scale-105";

/**
 * 難易度選択画面用のボタンコンポーネント
 * @param {string} to - リンク先のパス
 * @param {string} colorClass - ボタンの背景色とホバー色 (例: 'bg-green-600 hover:bg-green-500')
 * @param {string} text - ボタンに表示するテキスト
 * @param {string} [textColor='text-white'] - ボタンの文字色
 */
function DifficultyButton({ to, colorClass, text, textColor = 'text-white' }) {
  // 共通スタイルと色、文字色を結合
  const finalClass = `${BASE_BUTTON_CLASSES} ${colorClass} ${textColor}`;
  
  return (
    <div className="appButtonContainer">
      <Link to={to} className="block">
        <button className={finalClass}>
          {text}
        </button>
      </Link>
    </div>
  );
}

export default DifficultyButton;