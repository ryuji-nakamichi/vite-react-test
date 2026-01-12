import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import QuizSelect from './Pages/Quiz/Select';
import QuizGame from './Pages/Quiz/Game';
import QuizResult from './Pages/Quiz/Result';
import DicList from './Pages/Dic/List';
import DicDetail from './Pages/Dic/Detail';
import ThankYouToast from './Components/ThankYouToast';
import { useMonetization } from './hooks/useMonetization';

function App() {
  const isMonetized = useMonetization();

  return (
    <div className="flex flex-col min-h-screen w-full items-center bg-slate-900">
      {/* どのページにいても支援を検知したらトーストを表示 */}
      <ThankYouToast isMonetized={isMonetized} />

      <main className="w-full max-w-6xl flex-grow flex flex-col px-0 sm:px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz/select" element={<QuizSelect />} />

          { /* 動的ルーティング
            URLパラメータで難易度を受け取り、1つのコンポーネントで処理する 
          */ }
          <Route path="/quiz/game/:difficulty" element={<QuizGame />} />

          <Route path="/quiz/result" element={<QuizResult />} />

          <Route path="/dic/list" element={<DicList />} />
          <Route path="/dic/detail/:id" element={<DicDetail />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;