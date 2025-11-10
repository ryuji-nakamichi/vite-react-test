import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import QuizSelect from './Pages/Quiz/Select';
import QuizGame from './Pages/Quiz/Game';
import QuizResult from './Pages/Quiz/Result';
import DicList from './Pages/Dic/List';
import DicDetail from './Pages/Dic/Detail';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz/select" element={<QuizSelect />} />

        { /* 
          動的ルーティングに変更
          難易度ごとにコンポーネントを分けるのではなく、
          URLパラメータで難易度を受け取り、1つのコンポーネントで処理する 
        */ }
        <Route path="/quiz/game/:difficulty" element={<QuizGame />} />

        <Route path="/quiz/result" element={<QuizResult />} />

        <Route path="/dic/list" element={<DicList />} />
        <Route path="/dic/detail/:id" element={<DicDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
