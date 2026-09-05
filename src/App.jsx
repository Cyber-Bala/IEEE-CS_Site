import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home';
import About from './components/About';
import EventGallery from './components/EventGallery';
import Team from './components/Team';
import Contact from './components/Contact';
import Creators from './components/Creators';
import Registration from './components/Registration';
import ICCDSHome from './iccds2026/ICCDSHome';
import ICCDSRegistration from './iccds2026/ICCDSRegistration';
// import ICCDSRegistrationForm from './iccds2026/ICCDSRegistrationForm';
import ICCDSPaperSubmission from './iccds2026/ICCDSPaperSubmission';
import MemberReveal from './components/MemberReveal';
import NotFound from './components/NotFound';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<EventGallery />} />
          {/* <Route path="/team" element={<Team />} /> */}
          <Route path="/reveal" element={<MemberReveal />} />
          <Route path="/new-team" element={<MemberReveal />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/creators" element={<Creators />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/iccds2026" element={<ICCDSHome />} />
          <Route path="/iccds2026/registration" element={<ICCDSRegistration />} />
          {/* <Route path="/iccds2026/registration/form" element={<ICCDSRegistrationForm />} /> */}
          <Route path="/iccds2026/paper-submission" element={<ICCDSPaperSubmission />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
