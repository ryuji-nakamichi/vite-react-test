/**
 * キーワードやスキルを表示する小さなタグコンポーネント
 */
const TagItem = ({ text, type = 'keyword' }) => {
  let style = "bg-gray-600 border-gray-500 text-gray-200";
  let icon = '★';

  if (type === 'skill') {
    // スキルはより目立つ色にする
    style = "bg-red-700/80 border-red-500 text-white font-semibold";
    icon = '⚔️';
  } else if (type === 'keyword') {
    // キーワードは派手さ抑えめ
    style = "bg-indigo-700/80 border-indigo-500 text-white";
    icon = '✨';
  }

  return (
    <span
      className={`inline-block text-sm px-3 py-1 rounded-full border-2 shadow-md ${style} whitespace-nowrap`}
    >
      {icon} {text}
    </span>
  );
};

/**
 * 武将のキーワードとスキル（特技）を表示するコンポーネント
 * @param {object} characterData - 武将データ全体。keywordsとskills配列を持つ
 * @param {string} colorClass - 勢力ごとの文字色クラス (例: text-green-400)
 */
const CharacterTags = ({ characterData, colorClass }) => {
  // keywords または skills のどちらかがない場合は何も表示しない
  if (!characterData.keywords && !characterData.skills) {
    return null;
  }

  return (
    <div className="bg-gray-700 p-6 rounded-lg shadow-md">
      <h3 className={`text-xl font-bold mb-3 ${colorClass}`}>
        <span className="mr-2">💡</span>特徴・能力タグ
      </h3>

      {/* 1. キーワード */}
      {characterData.keywords && characterData.keywords.length > 0 && (
        <div className="mb-4 pt-2 border-t border-gray-600">
          <p className="text-lg font-semibold text-gray-300 mb-2">キーワード:</p>
          <div className="flex flex-wrap gap-2">
            {characterData.keywords.map((tag, index) => (
              <TagItem key={index} text={tag} type="keyword" />
            ))}
          </div>
        </div>
      )}

      {/* 2. 特技/スキル */}
      {characterData.skills && characterData.skills.length > 0 && (
        <div className="pt-2 border-t border-gray-600">
          <p className="text-lg font-semibold text-gray-300 mb-2">特技・スキル:</p>
          <div className="flex flex-wrap gap-2">
            {characterData.skills.map((tag, index) => (
              <TagItem key={index} text={tag} type="skill" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CharacterTags;