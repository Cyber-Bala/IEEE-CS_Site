import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home';
import Team from './components/Team';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/team" element={<Team />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
