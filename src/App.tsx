import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddQuestions from './pages/AddQuestions';
import Preview from './pages/Preview';

function App() {
  return (
    <Routes>
      <Route path='/' Component={Home} />
      <Route path='add-questions' Component={AddQuestions} />
      <Route path='preview' Component={Preview} />
    </Routes>
  )
}


export default App
