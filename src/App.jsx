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

  // ★ 追加：訪問済みのブランチを記録（初期値は史実 'main'）
  const [visitedBranches, setVisitedBranches] = useState(['main']);

  // ★ 新設：クイズの最高成績を管理
  const [quizStats, setQuizStats] = useState({ maxCorrect: 0, difficulty: "" });

  // ★ 新設：クイズ完了時に成績を更新する関数
  const updateQuizStats = (correct, diff) => {
    setQuizStats(prev => ({
      // 正解数がこれまでの最高を超えた場合、または同等でも難易度が変わった場合に更新
      maxCorrect: Math.max(prev.maxCorrect, correct),
      difficulty: correct >= prev.maxCorrect ? diff : prev.difficulty
    }));
  };

  // ★ 追加：新しいブランチを訪れた時に記録を更新する関数
  const markBranchAsVisited = (branchId) => {
    setVisitedBranches(prev => {
      if (prev.includes(branchId)) return prev; // すでに存在すれば更新しない
      return [...prev, branchId];
    });
  };

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
          <Route path="/" element={<Home
            isMonetized={isMonetized}
            visitedBranches={visitedBranches}
            quizStats={quizStats} // ★ 追加
          />} />
          <Route path="/quiz/select" element={<QuizSelect />} />

          { /* 動的ルーティング
            URLパラメータで難易度を受け取り、1つのコンポーネントで処理する 
          */ }
          <Route path="/quiz/game/:difficulty" element={<QuizGame isMonetized={isMonetized} />} />

          <Route path="/quiz/result" element={<QuizResult updateQuizStats={updateQuizStats} />} />

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
              markBranchAsVisited={markBranchAsVisited} // 関数を渡す
            />
          } />
        </Routes>
      </main>
    </div>
  );
}

export default App;