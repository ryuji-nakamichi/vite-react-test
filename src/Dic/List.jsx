import Header from "../../Components/Header";
function list() {
  return (
    <div
      id="appWrapper"
      className="min-h-screen flex items-center justify-center py-20 bg-gray-900 px-6"
    >
      <div className="w-full max-w-lg p-10 rounded-2xl shadow-2xl bg-gray-800 border border-red-800/50 text-center">

        <Header page={{ title: '人物辞典' }} />

        <p className="text-xl text-gray-300 mb-10">人物を選択してください。</p>

        <div className="space-y-4">

          <div className="appButtonContainer">
            <Link to="/quiz/game/easy" className="block">
              <button className="w-full py-4 px-4 rounded-lg font-bold transition duration-300 uppercase tracking-widest text-white 
                                 bg-green-600 shadow-xl hover:bg-green-500 transform hover:scale-105">
                劉備
              </button>
            </Link>
          </div>

        </div>

        {/* ホームに戻るボタン - デザインを統一 */}
        <div className="appButtonContainer mt-10">
          <Link to="/" className="block">
            <button className="w-full py-3 px-4 rounded-lg font-medium transition duration-200 
                               bg-gray-600 text-gray-200 hover:bg-gray-700">
              ホームに戻る
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}

export default list;