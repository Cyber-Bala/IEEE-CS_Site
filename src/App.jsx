import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home';
import About from './components/About';
import Team from './components/Team';
import Contact from './components/Contact';
import Creators from './components/Creators';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/creators" element={<Creators />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
