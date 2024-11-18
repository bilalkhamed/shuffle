import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddQuestions from './pages/AddQuestions';
import Preview from './pages/Preview';
const URL_BASE = '/shuffle';

function App() {
  return (
    <Routes>
      <Route path={`${URL_BASE}/`} Component={Home} />
      <Route path={`${URL_BASE}/add-questions`} Component={AddQuestions} />
      <Route path={`${URL_BASE}/preview`} Component={Preview} />
    </Routes>

  )
}


export default App
