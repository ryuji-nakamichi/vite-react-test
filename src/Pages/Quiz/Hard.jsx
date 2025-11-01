import { Link } from "react-router-dom";
function Hard() {
  return (
    <div>
      <h1>三國志 仮想戦史</h1>
      <h2>クイズモード</h2>
      <p>〜〜〜〜〜はどれですか？</p>
      <p>正解を選択してください。</p>
      <button>上級問題</button>
      <button>上級問題</button>
      <button>上級問題</button>

      <div>
        <Link to="/">
          <button>ホームに戻る</button>
        </Link>
      </div>
    </div>
  );
}

export default Hard;