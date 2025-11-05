// src/Components/NavigationButton.jsx

import { Link } from 'react-router-dom';

function NavigationButton({ to, text, isPrimary = false, className = "" }) {
  // 汎用的な構造/アニメーションのクラス
  const baseClasses = "w-full py-3 px-4 rounded-lg font-medium transition duration-200";
  
  // スタイルをプライマリ（赤）またはセカンダリ（グレー）で分ける
  const colorClasses = isPrimary
    ? "bg-red-700 text-white hover:bg-red-600 shadow-md transform hover:scale-[1.02]"
    : "bg-gray-600 text-gray-200 hover:bg-gray-700";
    
  return (
    <div className="appButtonContainer">
      <Link to={to} className="block">
        <button className={`${baseClasses} ${colorClasses} ${className}`}>
          {text}
        </button>
      </Link>
    </div>
  );
}

export default NavigationButton;