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
import ResultScreen from './Pages/ResultScreen';
import ThankYouToast from './Components/ThankYouToast';
import MetaMaskSupportModal from './Components/MetaMaskSupportModal';
import { useMonetization } from './hooks/useMonetization';
import { useMetaMaskConnect } from './hooks/useMetaMaskConnect';

function App() {
  const { isMonetized } = useMonetization();
  const {
    isMetaMaskInstalled,
    walletAddress,
    showSupportModal,
    isConnecting,
    txStatus,
    connectWallet,
    openSupportModal,
    sendSupportPayment,
    dismissModal,
  } = useMetaMaskConnect();

  const [visitedBranches, setVisitedBranches] = useState(() => {
    const saved = localStorage.getItem('visitedBranches');
    return saved ? JSON.parse(saved) : ['main'];
  });

  const [quizStats, setQuizStats] = useState(() => {
    const saved = localStorage.getItem('quizStats');
    return saved ? JSON.parse(saved) : { maxCorrect: 0, difficulty: "" };
  });

  const [currentBranch, setCurrentBranch] = useState('main');

  useEffect(() => {
    localStorage.setItem('visitedBranches', JSON.stringify(visitedBranches));
  }, [visitedBranches]);

  useEffect(() => {
    localStorage.setItem('quizStats', JSON.stringify(quizStats));
  }, [quizStats]);

  const updateQuizStats = (correct, diff) => {
    setQuizStats(prev => ({
      maxCorrect: Math.max(prev.maxCorrect, correct),
      difficulty: correct >= prev.maxCorrect ? diff : prev.difficulty
    }));
  };

  const markBranchAsVisited = (branchId) => {
    setVisitedBranches(prev => {
      if (prev.includes(branchId)) return prev;
      return [...prev, branchId];
    });
  };

  return (
    <div className={`flex flex-col min-h-dvh w-full transition-colors duration-1000 ${isMonetized ? 'bg-golden-mode' : 'bg-slate-900'}`}>

      {isMonetized && <div className="golden-aura" />}
      <ThankYouToast isMonetized={isMonetized} />

      {showSupportModal && (
        <MetaMaskSupportModal
          onSupport={sendSupportPayment}
          onDecline={dismissModal}
          txStatus={txStatus}
        />
      )}

      <main className="w-full flex-grow flex flex-col min-h-0">
        <Routes>
          <Route path="/" element={<Home
            isMonetized={isMonetized}
            visitedBranches={visitedBranches}
            quizStats={quizStats}
            isMetaMaskInstalled={isMetaMaskInstalled}
            walletAddress={walletAddress}
            isConnecting={isConnecting}
            connectWallet={connectWallet}
            openSupportModal={openSupportModal}
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

          <Route path="/result" element={<ResultScreen />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
