
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import TourismPage from './pages/TourismPage';
import GuestRegistration from './pages/GuestRegistration';
import Evaluation from './pages/Evaluation';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Routes>
          {/* Routes with Navbar and Footer */}
          <Route path="/" element={<><Navbar /><Home /><Footer /></>} />
          <Route path="/turismo" element={<><Navbar /><TourismPage /><Footer /></>} />
          
          {/* Direct access routes without Navbar (not in menu) */}
          <Route path="/cadastro-hospedes" element={<GuestRegistration />} />
          <Route path="/avaliacao" element={<Evaluation />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
