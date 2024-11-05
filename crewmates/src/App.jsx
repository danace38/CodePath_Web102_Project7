import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CreateCrewmate from './pages/CreateCrewmate';
import CrewmateGallery from './pages/CrewmateGallery';
import CrewmateDetail from './pages/CrewmateDetail';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateCrewmate />} />
        <Route path="/gallery" element={<CrewmateGallery />} />
        <Route path="/crewmate/:id" element={<CrewmateDetail />} />
      </Routes>
    </Router>
  );
}

export default App;