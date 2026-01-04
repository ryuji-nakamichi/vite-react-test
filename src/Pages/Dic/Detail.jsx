import { useState } from "react"; // ★ useStateをインポート
import { useParams, useSearchParams } from "react-router-dom";
import dic from "../../data/dic";
import Header from "../../Components/Header";
import NavigationButton from "../../Components/NavigationButton";
import RadarChart from "../../Components/RadarChart";
import CharacterTags from "../../Components/CharacterTags";
import RelatedCharacters from "../../Components/RelatedCharacters";

const FACTION_COLORS = {
  '蜀': { color: 'text-green-400', border: 'border-green-600', bg: 'bg-green-700/50', chartFill: 'fill-green-500' },
  '呉': { color: 'text-red-400', border: 'border-red-600', bg: 'bg-red-700/50', chartFill: 'fill-red-500' },
  '魏': { color: 'text-blue-400', border: 'border-blue-600', bg: 'bg-blue-700/50', chartFill: 'fill-blue-500' },
  'その他': { color: 'text-gray-400', border: 'border-gray-600', bg: 'bg-gray-700/50', chartFill: 'fill-gray-500' },
};

function Detail() {
  const { id } = useParams();
  const characterId = parseInt(id, 10);

  // ★ URLの ?mode=xxx 部分を取得 ★
  const [searchParams] = useSearchParams();
  const modeFromUrl = searchParams.get('mode'); // 'history' または 'romance' が取れる


  // ★ Stateの初期値をURLのパラメータにする（なければ 'romance'）★
  const [viewMode, setViewMode] = useState(modeFromUrl || 'romance');

  const characterData = dic.ALL_DIC_DATA.find(char => char.id === characterId);

  if (!characterData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center py-20 bg-gray-900 px-6 text-center text-gray-300">
        <h1 className="text-3xl text-red-500 font-bold mb-4">Error 404</h1>
        <p className="text-xl mb-8">武将データが見つかりませんでした。</p>
        <NavigationButton to="/dic/list" text="武将一覧に戻る" isPrimary={false} />
      </div>
    );
  }

  // 表示用データの抽出（現在のモードに基づいて取得）
  const currentDetails = characterData.details[viewMode];
  const faction = characterData.group || 'その他';
  const factionTheme = FACTION_COLORS[faction] || FACTION_COLORS['その他'];

  // 戻るボタンのリンク先を動的に生成
  const backPath = `/dic/list?mode=${viewMode}`;

  return (
    // 1. 全体を h-[100svh] の縦並び(flex-col)にする
    <div id="appWrapper" className="h-[100svh] flex flex-col bg-gray-900 overflow-hidden">

      {/* 2. ヘッダーを外に出す。これで上部に固定される */}
      <Header page={{ title: '武将詳細' }} />

      {/* 3. コンテンツエリア：flex-grow と overflow-y-auto でここだけをスクロールさせる */}
      <main className="flex-grow overflow-y-auto">
        <div className="w-full max-w-2xl mx-auto p-4 md:p-8 pb-20">

          {/* カードコンテナ：スマホでは背景に馴染ませ、PCでは枠線を表示 */}
          <div className="bg-gray-800/50 md:bg-gray-800 p-5 md:p-10 rounded-none md:rounded-3xl shadow-2xl border-y md:border border-red-800/30 text-center">

            {/* モード切り替えタブ：少しマージンを調整 */}
            <div className="flex justify-center mb-10 bg-gray-900/50 p-1 rounded-full border border-gray-700 shadow-inner">
              <button
                onClick={() => setViewMode('romance')}
                className={`flex-1 py-3 px-4 rounded-full font-bold text-sm md:text-base transition-all duration-300 ${viewMode === 'romance' ? 'bg-red-700 text-white shadow-lg' : 'text-gray-500'
                  }`}
              >
                三國志演義
              </button>
              <button
                onClick={() => setViewMode('history')}
                className={`flex-1 py-3 px-4 rounded-full font-bold text-sm md:text-base transition-all duration-300 ${viewMode === 'history' ? 'bg-blue-800 text-white shadow-lg' : 'text-gray-500'
                  }`}
              >
                正史 三國志
              </button>
            </div>

            {/* 武将名セクション：ここがヘッダーの下に正しく現れます */}
            <div className={`p-8 rounded-2xl mb-10 shadow-xl border-t-4 ${factionTheme.border} ${factionTheme.bg}`}>
              <p className="text-4xl md:text-5xl font-black text-white leading-tight">
                {characterData.firstName} {characterData.lastName}
              </p>
              <p className={`text-xl font-bold ${factionTheme.color} mt-2`}>
                字: {characterData.nickName || '字不明'}
              </p>
              <p className="text-base text-gray-400 italic mt-4 animate-fade-in px-4">
                "{currentDetails.catch}"
              </p>
            </div>

            <div className="space-y-8 text-left">
              {/* 能力チャート */}
              <div className="bg-gray-900/40 p-6 rounded-2xl shadow-md border border-gray-700/50">
                <h3 className={`text-xl font-bold mb-4 ${factionTheme.color}`}>⚔️ 総合能力</h3>
                <div className="flex justify-center">
                  <div className="w-full max-w-sm">
                    <RadarChart stats={characterData} color={factionTheme.chartFill} size={300} />
                  </div>
                </div>
              </div>

              <CharacterTags characterData={characterData} colorClass={factionTheme.color} />
              <RelatedCharacters relatedCharacters={characterData.relatedCharacters} colorClass={factionTheme.color} />

              {/* 人物略歴 */}
              <div className="bg-gray-900/40 p-6 rounded-2xl shadow-md border-l-4 border-yellow-500/50">
                <h3 className={`text-xl font-bold mb-4 ${factionTheme.color}`}>
                  <span className="mr-2">📖</span>
                  {viewMode === 'romance' ? '演義での活躍' : '正史の記録'}
                </h3>
                <p className="text-gray-300 leading-relaxed indent-4 whitespace-pre-wrap text-base md:text-lg">
                  {currentDetails.bio}
                </p>
              </div>
            </div>

            <div className="w-full mt-12 pb-6">
              <NavigationButton to={backPath} text="武将一覧に戻る" isPrimary={false} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Detail;