import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import dic from "../../data/dic";
import Header from "../../Components/Header";
import NavigationButton from "../../Components/NavigationButton";
import RadarChart from "../../Components/RadarChart";
import CharacterTags from "../../Components/CharacterTags";
import RelatedCharacters from "../../Components/RelatedCharacters";
import { useMonetization } from "../../hooks/useMonetization";
import DecodingText from '../../Components/DecodingText';

const FACTION_COLORS = {
  '蜀': { color: 'text-green-400', border: 'border-green-600', bg: 'bg-green-700/50', chartFill: 'fill-green-500' },
  '呉': { color: 'text-red-400', border: 'border-red-600', bg: 'bg-red-700/50', chartFill: 'fill-red-500' },
  '魏': { color: 'text-blue-400', border: 'border-blue-600', bg: 'bg-blue-700/50', chartFill: 'fill-blue-500' },
  'その他': { color: 'text-gray-400', border: 'border-gray-600', bg: 'bg-gray-700/50', chartFill: 'fill-gray-500' },
};

function Detail({ currentBranch }) {
  const { isMonetized } = useMonetization();
  const { id } = useParams();
  const characterId = parseInt(id, 10);
  const [searchParams] = useSearchParams();
  const modeFromUrl = searchParams.get('mode');
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

  const currentDetails = characterData.details[viewMode];
  const faction = characterData.group || 'その他';
  const factionTheme = FACTION_COLORS[faction] || FACTION_COLORS['その他'];
  const backPath = `/dic/list?mode=${viewMode}`;

  return (
    /* 1. overflow-x-hidden を追加し、横揺れを根本から防止 */
    <div id="appWrapper" className="h-[100svh] flex flex-col bg-gray-900 overflow-x-hidden">

      <Header page={{ title: '武将詳細' }} />

      <main className="flex-grow overflow-y-auto">
        {/* 2. px-0 sm:px-4 にし、スマホでは画面端までカードを広げる */}
        <div className="w-full max-w-2xl mx-auto p-0 sm:p-4 md:p-8 pb-20">

          {/* 3. p-4 sm:p-10 に調整。スマホ時の余白を削ってコンテンツ幅を確保 */}
          <div className="bg-gray-800/50 md:bg-gray-800 p-4 sm:p-10 rounded-none md:rounded-3xl shadow-2xl border-y md:border border-red-800/30 text-center">

            {/* モード切り替えタブ：text-xsを追加してSPでの文字溢れを防止 */}
            <div className="flex justify-center mb-8 bg-gray-900/50 p-1 rounded-full border border-gray-700 shadow-inner max-w-sm mx-auto">
              <button
                onClick={() => setViewMode('romance')}
                className={`flex-1 py-2 px-2 rounded-full font-bold text-xs sm:text-base transition-all duration-300 ${viewMode === 'romance' ? 'bg-red-700 text-white shadow-lg' : 'text-gray-500'}`}
              >
                三國志演義
              </button>
              <button
                onClick={() => setViewMode('history')}
                className={`flex-1 py-2 px-2 rounded-full font-bold text-xs sm:text-base transition-all duration-300 ${viewMode === 'history' ? 'bg-blue-800 text-white shadow-lg' : 'text-gray-500'}`}
              >
                正史 三國志
              </button>
            </div>

            {/* 武将名セクション：break-wordsを追加 */}
            <div className={`p-6 sm:p-8 rounded-2xl mb-10 shadow-xl border-t-4 ${factionTheme.border} ${factionTheme.bg} break-words`}>
              <p className="text-3xl sm:text-5xl font-black text-white leading-tight">
                {characterData.firstName}{characterData.lastName}
              </p>
              <p className={`text-lg sm:text-xl font-bold ${factionTheme.color} mt-2`}>
                字: {characterData.nickName || '字不明'}
              </p>
              <p className="text-sm sm:text-base text-gray-400 italic mt-4 animate-fade-in px-2 sm:px-4">
                "{currentDetails.catch}"
              </p>
            </div>

            <div className="space-y-8 text-left">
              {/* 能力チャート：コンテナに overflow-hidden を入れ、チャート自体を少し縮小可能にする */}
              <div className="bg-gray-900/40 p-4 sm:p-6 rounded-2xl shadow-md border border-gray-700/50 overflow-hidden">
                <h3 className={`text-lg sm:text-xl font-bold mb-4 ${factionTheme.color}`}>⚔️ 総合能力</h3>
                <div className="flex justify-center items-center overflow-hidden">
                  <div className="w-full max-w-[280px] sm:max-w-sm flex justify-center">
                    {/* SPでは少し小さく見えるようコンテナで制限 */}
                    <RadarChart stats={characterData} color={factionTheme.chartFill} size={window.innerWidth < 640 ? 250 : 300} />
                  </div>
                </div>
              </div>

              <CharacterTags characterData={characterData} colorClass={factionTheme.color} />
              <RelatedCharacters relatedCharacters={characterData.relatedCharacters} colorClass={factionTheme.color} />

              {/* 人物略歴：break-words でテキストのはみ出しを防止 */}
              <div className="bg-gray-900/40 p-5 sm:p-6 rounded-2xl shadow-md border-l-4 border-yellow-500/50 break-words">
                <h3 className={`text-lg sm:text-xl font-bold mb-4 ${factionTheme.color}`}>
                  <span className="mr-2">📖</span>
                  {viewMode === 'romance' ? '演義での活躍' : '正史の記録'}
                </h3>
                <p className="text-gray-300 leading-relaxed indent-4 whitespace-pre-wrap text-sm sm:text-lg">
                  {currentDetails.bio}
                </p>
              </div>
            </div>

            {/* ★ ブランチが 'main' 以外、かつその武将にIFデータがある場合のみ表示 */}
            {currentBranch !== 'main' && characterData.details[currentBranch] && (
              <div className="mt-8 animate-fade-in">
                <div className="bg-blue-900/30 border-2 border-blue-500/50 p-6 rounded-3xl shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-2 py-0.5 bg-blue-600 text-[10px] font-mono font-bold rounded text-white uppercase">
                      Branch: {currentBranch}
                    </span>
                    <h3 className="text-xl font-black text-blue-400">【 仮想戦史：IFの軌跡 】</h3>
                  </div>
                  <p className="text-gray-200 leading-relaxed italic text-base md:text-lg">
                    {characterData.details[currentBranch].bio}
                  </p>
                  {/* IFの世界での「現代の役職」も変えられたら最高ですね！ */}
                </div>
              </div>
            )}

            {/* 支援者限定セクション：pxを調整 */}
            <div className="mt-8 space-y-6">
              {isMonetized ? (
                <div className="secret-container relative overflow-hidden bg-gradient-to-br from-yellow-900/40 via-gray-800 to-red-900/40 p-5 sm:p-6 rounded-2xl sm:rounded-3xl border-2 border-yellow-500/50 shadow-[0_0_20px_rgba(234,179,8,0.3)] animate-fade-in">
                  <div className="relative z-10 text-left">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xl animate-pulse">🏆</span>
                      <h3 className="text-lg font-black text-yellow-400 tracking-tighter">
                        【 支援者限定：軍略秘録 】
                      </h3>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-gray-900/60 p-4 rounded-xl border border-yellow-500/20 break-words">
                        <span className="text-[9px] font-bold text-yellow-600 uppercase tracking-widest block mb-1">Analysis: Modern Role</span>
                        <div className="text-white font-bold text-base sm:text-lg">
                          <DecodingText text={characterData.supporterData.modernRole} />
                        </div>
                      </div>

                      <div className="bg-gray-900/60 p-4 rounded-xl border border-yellow-500/20 break-words">
                        <span className="text-[9px] font-bold text-yellow-600 uppercase tracking-widest block mb-1">Analysis: Hidden Bio</span>
                        <div className="text-gray-200 leading-relaxed italic text-sm sm:text-base">
                          「 <DecodingText text={characterData.supporterData.hiddenBio} speed={25} /> 」
                        </div>
                      </div>

                      <div className="flex flex-wrap justify-between items-center gap-2 pt-2">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
                          <span className="text-[10px] text-yellow-600/70 font-mono">DATA_DECRYPTED</span>
                        </div>
                        <span className="px-2 py-1 bg-yellow-500/20 text-yellow-500 rounded-full text-[9px] font-bold border border-yellow-500/30">SUPPORTER</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl border-2 border-dashed border-gray-700 bg-gray-800/20 text-center group">
                  <div className="text-3xl mb-4 opacity-50">📜</div>
                  <h3 className="text-gray-400 font-bold mb-2 text-base">軍略秘録（限定）</h3>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-6 px-2">
                    MetaMask でアプリを応援すると、<br className="hidden sm:block" />
                    この武将の極秘データが解析されます。
                  </p>
                  <div className="inline-block px-4 py-2 rounded-full border border-gray-600 text-gray-500 text-[10px] font-bold">SUPPORT_REQUIRED</div>
                </div>
              )}
            </div>

            <div className="w-full mt-10 pb-6 px-4">
              <NavigationButton to={backPath} text="武将一覧に戻る" isPrimary={false} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Detail;