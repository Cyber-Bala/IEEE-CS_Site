import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home';
import About from './components/About';
import EventGallery from './components/EventGallery';
import Team from './components/Team';
import Contact from './components/Contact';
import Creators from './components/Creators';
import Registration from './components/Registration';
import XypherRoutes from './xypher26/XypherRoutes';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<EventGallery />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/creators" element={<Creators />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/xypher26/*" element={<XypherRoutes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
