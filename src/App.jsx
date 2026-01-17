import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from "react";
import Home from './Pages/Home';
import QuizSelect from './Pages/Quiz/Select';
import QuizGame from './Pages/Quiz/Game';
import QuizResult from './Pages/Quiz/Result';
import DicList from './Pages/Dic/List';
import DicDetail from './Pages/Dic/Detail';
import HistorySimulation from './Pages/HistorySimulation';
import ThankYouToast from './Components/ThankYouToast';
import { useMonetization } from './hooks/useMonetization';

function App() {
  const isMonetized = useMonetization();

  // ★ 追加：現在の歴史ブランチ（デフォルトは 'main'）
  const [currentBranch, setCurrentBranch] = useState('main');

  return (
    /* isMonetized が true なら 'bg-golden-mode'、false なら通常の 'bg-slate-900' */
    <div className={`flex flex-col min-h-screen w-full items-center transition-colors duration-1000 ${isMonetized ? 'bg-golden-mode' : 'bg-slate-900'
      }`}>

      {/* 黄金モード時のみ、上部に微かな光のオーラを表示 */}
      {isMonetized && <div className="golden-aura" />}

      {/* どのページにいても支援を検知したらトーストを表示 */}
      <ThankYouToast isMonetized={isMonetized} />

      <main className="w-full max-w-6xl flex-grow flex flex-col px-0 sm:px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz/select" element={<QuizSelect />} />

          { /* 動的ルーティング
            URLパラメータで難易度を受け取り、1つのコンポーネントで処理する 
          */ }
          <Route path="/quiz/game/:difficulty" element={<QuizGame isMonetized={isMonetized} />} />

          <Route path="/quiz/result" element={<QuizResult />} />

          <Route path="/dic/list" element={<DicList />} />
          {/* ★ 武将詳細に現在のブランチ情報を渡す */}
          <Route path="/dic/detail/:id" element={
            <DicDetail currentBranch={currentBranch} />
          } />

          {/* ★ シミュレーション画面に setter を渡す */}
          <Route path="/simulation" element={
            <HistorySimulation
              isMonetized={isMonetized}
              currentBranch={currentBranch}
              setCurrentBranch={setCurrentBranch}
            />
          } />
        </Routes>
      </main>
    </div>
  );
}

export default App;