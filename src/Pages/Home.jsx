import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>三國志 仮想戦史</h1>
      <h2>〜其レハ智ノ旅路〜</h2>
      <p>モードを選択してください。</p>
      <Link to="/quiz/select">
        <button>クイズで遊ぶ</button>
      </Link>
      <Link to="/dic/show">
        <button>辞典を見る（準備中）</button>
      </Link>
    </div>
  )
}

export default Home;