import { Link } from "react-router-dom";

function Select() {
  return (
    <div>
      <h1>三國志 仮想戦史</h1>
      <h2>クイズモード</h2>
      <p>難易度を選択してください。</p>
      <Link to="/quiz/game/easy">
        <button>簡単</button>
      </Link>
      <Link to="/quiz/game/normal">
        <button>普通</button>
      </Link>
      <Link to="/quiz/game/hard">
        <button>難しい</button>
      </Link>

      <div>
        <Link to="/">
          <button>ホームに戻る</button>
        </Link>
      </div>
    </div>
  )
}

export default Select;