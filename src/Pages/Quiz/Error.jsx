import { Link } from "react-router-dom";
function Error(props) {
  const { from } = props.page || {}
  return (
    <div className="error-page">
      <h1 className="appHead --lv-1">三國志 仮想戦史</h1>
      <h2 className="appHead --lv-2 text-2xl font-semibold text-gray-800 mb-8">クイズモード</h2>
      <p className="appLead">
        {from && `(${from}からのエラーメッセージ )`}<br />
        {props.children}
      </p>
      <div className="appButtonContainer">
        <Link to="/quiz/select">
          <button>難易度選択に戻る</button>
        </Link>
      </div>
    </div>
  );
}

export default Error;