import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import YogaPlanner from './pages/YogaPlanner';
import DietPlanner from './pages/DietPlanner';
import CycleTracker from './pages/CycleTracker';
import DoctorContact from './pages/DoctorContact';
import SelfDiagnosis from './pages/SelfDiagnosis';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50 to-purple-50">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/selfdiagnosis" element={<SelfDiagnosis />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/yoga-planner" element={<YogaPlanner />} />
            <Route path="/diet-planner" element={<DietPlanner />} />
            <Route path="/cycle-tracker" element={<CycleTracker />} />
            <Route path="/doctors" element={<DoctorContact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;