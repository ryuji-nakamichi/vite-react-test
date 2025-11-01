import { Link } from "react-router-dom";

function Result() {
  return (
    <div>
      <h1>三國志 仮想戦史</h1>
      <h2>クイズモード</h2>
      <p>結果発表ページ</p>
      <p>全5問中、⚫︎問正解。⚫︎⚫︎点でした。</p>
      <div>
        <Link to="/">
          <button>ホームに戻る</button>
        </Link>
      </div>
    </div>
  )
}

export default Result;