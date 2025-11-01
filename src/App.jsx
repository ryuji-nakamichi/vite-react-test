import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import QuizSelect from './Pages/Quiz/Select';
import QuizGame from './Pages/Quiz/Game';
import QuizResult from './Pages/Quiz/Result';
import QuizEasy from './Pages/Quiz/Easy';
import QuizNormal from './Pages/Quiz/Normal';
import QuizHard from './Pages/Quiz/Hard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz/select" element={<QuizSelect />} />
        <Route path="/quiz/game" element={<QuizGame />} />
        <Route path="/quiz/result" element={<QuizResult />} />
        <Route path="/quiz/game/easy" element={<QuizEasy />} />
        <Route path="/quiz/game/normal" element={<QuizNormal />} />
        <Route path="/quiz/game/hard" element={<QuizHard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
