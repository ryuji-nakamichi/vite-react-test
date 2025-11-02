import { Link } from "react-router-dom";

function Select() {
  return (
    <div id="appWrapper" className="appWrapper">
      <div className="appContents">
        <h1 className="appHead --lv-1">三國志 仮想戦史</h1>
        <h2 className="appHead --lv-2">クイズモード</h2>
        <p className="appLead">難易度を選択してください。</p>

        <div className="appButtonContainer">
          <Link to="/quiz/game/easy">
            <button>簡単</button>
          </Link>
        </div>
        <div className="appButtonContainer">
          <Link to="/quiz/game/normal">
            <button>普通</button>
          </Link>
        </div>
        <div className="appButtonContainer">
          <Link to="/quiz/game/hard">
            <button>難しい</button>
          </Link>
        </div>
        
        <div className="appButtonContainer">
          <Link to="/">
            <button>ホームに戻る</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Select;