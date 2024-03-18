import Day from './pages/Day/Day';
import Hour from './pages/Hour/Hour';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Day />}></Route>
        <Route path='/:date' element={<Hour />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
