import { Link } from "react-router-dom";

function Home() {
  return (
    <div id="appWrapper" className="appWrapper">
      <div className="appContents">
        <h1 className="appHead --lv-1">三國志 仮想戦史</h1>
        <h2 className="appHead --lv-2">〜其レハ智ノ旅路〜</h2>
        <p className="appLead">モードを選択してください。</p>

        <div className="appButtonContainer">
          <Link to="/quiz/select">
            <button>クイズで遊ぶ</button>
          </Link>
        </div>

        <div className="appButtonContainer">
          <Link to="/dic/show">
            <button>辞典を見る（準備中）</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home;