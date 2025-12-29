
import Header from "../../Components/Header";
import dic from "../../data/dic"; // 武将データをインポート（パスは適宜修正）
import CharacterCard from "../../Components/CharacterCard";
import NavigationButton from "../../Components/NavigationButton";

// 勢力ごとのデータの定義を統合
const ALL_DIC_DATA = [
  { group: '蜀', data: dic.dicSyokuData, color: 'text-green-500', border: 'border-green-700/30', bgColor: 'bg-green-600 hover:bg-green-700' },
  { group: '呉', data: dic.dicGoData, color: 'text-red-500', border: 'border-red-700/30', bgColor: 'bg-red-600 hover:bg-red-700' },
  { group: '魏', data: dic.dicGiData, color: 'text-blue-500', border: 'border-blue-700/30', bgColor: 'bg-blue-600 hover:bg-blue-700' },
];


function List() {
  return (
    // 1. 骨格と背景の統一
    <div
      id="appWrapper"
      className="min-h-screen py-16 bg-gray-900 px-6"
    >
      <div className="max-w-7xl mx-auto">

        {/* 2. ヘッダーエリアの統一 */}
        <div className="w-full max-w-xl mx-auto p-10 mb-8 rounded-2xl shadow-2xl bg-gray-800 border border-red-800/50 text-center">
          <Header page={{ title: '武将辞典' }} />
          <p className="text-xl text-gray-300 mb-2">武将の詳細情報をご確認ください。</p>
        </div>

        {/* 3. 各勢力の武将カード一覧 */}
        {ALL_DIC_DATA.map((faction) => (
          <div key={faction.group} className="mb-12">

            {/* 勢力見出し */}
            <h2 className={`text-3xl font-extrabold mb-8 text-center ${faction.color} border-b-4 border-current pb-2`}>
              {faction.group}軍 一覧
            </h2>

            {/* カードグリッド */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {faction.data.map((character) => (
                <CharacterCard
                  key={character.nickName || `${character.firstName}${character.lastName}`}
                  character={character}
                  factionColor={faction.color}
                  factionBorder={faction.border}
                  factionBgColor={faction.bgColor}
                />
              ))}
            </div>
          </div>
        ))}

        {/* 4. フッター/ホームボタンの統一 */}
        <div className="w-full max-w-md mx-auto mt-12">
          <NavigationButton
            to="/"
            text="ホームに戻る"
            isPrimary={false}
          />
        </div>
      </div>
    </div>
  );
}

export default List;