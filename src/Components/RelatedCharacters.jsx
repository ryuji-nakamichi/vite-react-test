import { Link } from 'react-router-dom';

/**
 * 武将の関連人物リストを表示するコンポーネント
 * @param {Array} relatedCharacters - 関連人物のリスト [{ id, name, relation }, ...]
 * @param {string} colorClass - 勢力ごとの文字色クラス (例: text-green-400)
 */
const RelatedCharacters = ({ relatedCharacters, colorClass }) => {
  // データがない場合は何も表示しない
  if (!relatedCharacters || relatedCharacters.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-700 p-6 rounded-lg shadow-md">
      <h3 className={`text-xl font-bold mb-3 ${colorClass}`}>
        <span className="mr-2">🤝</span>関連人物
      </h3>
      <div className="space-y-3">
        {relatedCharacters.map((relatedChar) => (
          <Link
            key={relatedChar.id}
            // 関連人物の詳細ページへのパスを設定
            to={`/dic/detail/${relatedChar.id}`}
            className="flex justify-between items-center p-3 rounded-lg bg-gray-600 hover:bg-gray-500 transition duration-200"
          >
            <span className="text-gray-300 font-medium">
              {relatedChar.relation}:
            </span>
            {/* 名前と関係性を表示し、クリック可能であることを示す */}
            <span className={`text-lg font-bold ${colorClass}`}>
              {relatedChar.name}
            </span>
            <span className={`text-sm ${colorClass}`}>
              &gt;
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedCharacters;