import { useParams } from "react-router-dom";
import dic from "../../data/dic";
import Header from "../../Components/Header";
import NavigationButton from "../../Components/NavigationButton";
import RadarChart from "../../Components/RadarChart";
import CharacterTags from "../../Components/CharacterTags";
import RelatedCharacters from "../../Components/RelatedCharacters";

// ★ StatBoxコンポーネントは現在使用されていないため削除、またはファイル切り出しを推奨

// 勢力ごとの色設定を定義
const FACTION_COLORS = {
  '蜀': { color: 'text-green-400', border: 'border-green-600', bg: 'bg-green-700/50', chartFill: 'fill-green-500' },
  '呉': { color: 'text-red-400', border: 'border-red-600', bg: 'bg-red-700/50', chartFill: 'fill-red-500' },
  '魏': { color: 'text-blue-400', border: 'border-blue-600', bg: 'bg-blue-700/50', chartFill: 'fill-blue-500' },
  'その他': { color: 'text-gray-400', border: 'border-gray-600', bg: 'bg-gray-700/50', chartFill: 'fill-gray-500' },
};

function Detail() {
  const { id } = useParams();
  const characterId = parseInt(id, 10);

  // 1. 武将データの取得
  const characterData = dic.ALL_DIC_DATA.find(char => char.id === characterId);

  // 2. データが見つからない場合の処理 (Error 404)
  if (!characterData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center py-20 bg-gray-900 px-6 text-center text-gray-300">
        <h1 className="text-3xl text-red-500 font-bold mb-4">Error 404</h1>
        <p className="text-xl mb-8">武将データが見つかりませんでした。(ID: {id})</p>
        <NavigationButton to="/dic/list" text="武将一覧に戻る" isPrimary={false} />
      </div>
    );
  }

  // 3. 勢力カラーとチャート色の適用を一元化
  const faction = characterData.group || 'その他';
  const factionTheme = FACTION_COLORS[faction] || FACTION_COLORS['その他'];
  const { color: colorClass, border: borderClass, bg: bgColor, chartFill: chartColor } = factionTheme;

  // 4. グラフに渡す能力値オブジェクトを準備
  const chartStats = {
    strength: characterData.strength || 0,
    intelligence: characterData.intelligence || 0,
    charisma: characterData.charisma || 0,
    politics: characterData.politics || 0,
    command: characterData.command || 0,
    strategy: characterData.strategy || 0,
  };

  return (
    <div id="appWrapper" className="min-h-screen flex items-center justify-center py-20 bg-gray-900 px-6">
      <div className="w-full max-w-2xl p-10 rounded-2xl shadow-2xl bg-gray-800 border border-red-800/50 text-center">

        {/* 2. ヘッダーエリア */}
        <Header page={{ title: '武将詳細' }} />

        {/* 3. 武将名と字のヘッダーブロック */}
        <div className={`p-6 rounded-lg mb-8 shadow-xl border-t-4 ${borderClass} ${bgColor}`}>
          <p className="text-4xl font-black text-white leading-tight">
            {characterData.firstName} {characterData.lastName}
          </p>
          <p className={`text-xl font-bold ${colorClass} mt-1`}>
            字: {characterData.nickName || '字なし'}
          </p>
          <p className="text-base text-gray-400 italic mt-2">
            "{characterData.catch}"
          </p>
        </div>

        {/* 4. 詳細情報パネル */}
        <div className="space-y-6 text-left">

          {/* 4-3. 総合能力（レーダーチャート） */}
          <div className="bg-gray-700 p-6 rounded-lg shadow-md">
            <h3 className={`text-xl font-bold mb-4 ${colorClass}`}>
              <span className="mr-2">⚔️</span>総合能力
            </h3>
            <div className="flex justify-center">
              <div className="w-full max-w-sm">
                <RadarChart
                  stats={chartStats}
                  color={chartColor}
                  size={400}
                />
              </div>
            </div>
          </div>

          {/* 4-4. キーワードと特技セクション */}
          <CharacterTags
            characterData={characterData}
            colorClass={colorClass}
          />

          {/* ★★★ 4-5. 関連人物セクションを追加 ★★★ */}
          <RelatedCharacters
            relatedCharacters={characterData.relatedCharacters}
            colorClass={colorClass}
          />

          {/* 4-1. 略歴/基本情報 */}
          <div className="bg-gray-700 p-6 rounded-lg shadow-md">
            <h3 className={`text-xl font-bold mb-3 ${colorClass}`}>
              <span className="mr-2">📜</span>基本情報
            </h3>
            <div className="space-y-2 text-gray-300">
              <p>
                <span className="font-semibold text-gray-400 w-24 inline-block">所属</span>: {characterData.group}軍
              </p>
              <p>
                <span className="font-semibold text-gray-400 w-24 inline-block">生没年</span>: {characterData.birthYear || '?'}年 - {characterData.deathYear || '?'}年
              </p>
              <p>
                <span className="font-semibold text-gray-400 w-24 inline-block">出身地</span>: {characterData.homeland || '不明'}
              </p>
            </div>
          </div>

          {/* 4-2. 人物略歴/伝記 */}
          <div className="bg-gray-700 p-6 rounded-lg shadow-md">
            <h3 className={`text-xl font-bold mb-3 ${colorClass}`}>
              <span className="mr-2">📖</span>人物略歴
            </h3>
            <p className="text-gray-300 leading-relaxed indent-4 whitespace-pre-wrap">
              {characterData.bio}
            </p>
          </div>

        </div>

        {/* 5. 戻るボタンの統一 */}
        <div className="w-full mt-10">
          <NavigationButton
            to="/dic/list"
            text="武将一覧に戻る"
            isPrimary={false}
          />
        </div>

      </div>
    </div>
  );
}

export default Detail;