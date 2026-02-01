import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from "react";
import Home from './Pages/Home';
import QuizSelect from './Pages/Quiz/Select';
import QuizGame from './Pages/Quiz/Game';
import QuizResult from './Pages/Quiz/Result';
import DicList from './Pages/Dic/List';
import DicDetail from './Pages/Dic/Detail';
import HistorySimulation from './Pages/HistorySimulation';
import BattleList from './Pages/BattleList';
import BattleScreen from './Pages/BattleScreen';
import ThankYouToast from './Components/ThankYouToast';
import { useMonetization } from './hooks/useMonetization';

function App() {
  const isMonetized = useMonetization();

  // --- データの復元（初期化） ---
  // localStorageからデータを読み込み、なければデフォルト値を返します
  const [visitedBranches, setVisitedBranches] = useState(() => {
    const saved = localStorage.getItem('visitedBranches');
    return saved ? JSON.parse(saved) : ['main'];
  });

  const [quizStats, setQuizStats] = useState(() => {
    const saved = localStorage.getItem('quizStats');
    return saved ? JSON.parse(saved) : { maxCorrect: 0, difficulty: "" };
  });

  const [currentBranch, setCurrentBranch] = useState('main');

  // --- データの保存（永続化） ---
  // visitedBranchesが更新されるたびにlocalStorageに保存
  useEffect(() => {
    localStorage.setItem('visitedBranches', JSON.stringify(visitedBranches));
  }, [visitedBranches]);

  // quizStatsが更新されるたびにlocalStorageに保存
  useEffect(() => {
    localStorage.setItem('quizStats', JSON.stringify(quizStats));
  }, [quizStats]);

  // --- 既存の関数ロジック ---

  // クイズ完了時に成績を更新する関数
  const updateQuizStats = (correct, diff) => {
    setQuizStats(prev => ({
      maxCorrect: Math.max(prev.maxCorrect, correct),
      difficulty: correct >= prev.maxCorrect ? diff : prev.difficulty
    }));
  };

  // 新しいブランチを訪れた時に記録を更新する関数
  const markBranchAsVisited = (branchId) => {
    setVisitedBranches(prev => {
      if (prev.includes(branchId)) return prev;
      return [...prev, branchId];
    });
  };

  return (
    <div className={`flex flex-col min-h-screen w-full items-center transition-colors duration-1000 ${isMonetized ? 'bg-golden-mode' : 'bg-slate-900'
      }`}>

      {isMonetized && <div className="golden-aura" />}
      <ThankYouToast isMonetized={isMonetized} />

      <main className="w-full max-w-6xl flex-grow flex flex-col px-0 sm:px-4">
        <Routes>
          <Route path="/" element={<Home
            isMonetized={isMonetized}
            visitedBranches={visitedBranches}
            quizStats={quizStats}
          />} />
          <Route path="/quiz/select" element={<QuizSelect />} />

          <Route path="/quiz/game/:difficulty" element={<QuizGame isMonetized={isMonetized} />} />

          <Route path="/quiz/result" element={<QuizResult updateQuizStats={updateQuizStats} />} />

          <Route path="/dic/list" element={<DicList />} />
          <Route path="/dic/detail/:id" element={
            <DicDetail currentBranch={currentBranch} />
          } />

          <Route path="/simulation" element={
            <HistorySimulation
              isMonetized={isMonetized}
              currentBranch={currentBranch}
              setCurrentBranch={setCurrentBranch}
              markBranchAsVisited={markBranchAsVisited}
            />
          } />

          <Route path="/battles" element={<BattleList isMonetized={isMonetized} visitedBranches={visitedBranches} />} />

          <Route path="/battle/:battleId" element={
            <BattleScreen
              isMonetized={isMonetized}
              markBranchAsVisited={markBranchAsVisited}
              setCurrentBranch={setCurrentBranch}
            />
          } />
        </Routes>
      </main>
    </div>
  );
}

export default App;