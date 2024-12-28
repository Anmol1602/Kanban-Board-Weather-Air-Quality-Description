import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Components
import LandingPage from './components/LandingPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import OurTeamPage from './components/OurTeamPage';
import SignUpPage from './components/Signup';
import LoginPage from './components/LoginPage';
import UserProfile from './components/UserProfile';
import KanbanBoard from './components/KanbanBoard';
import AirQualityDetails from './components/AirQualityDetails';
import WeatherDetails from './components/WeatherDetails';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const [user, setUser] = useState(null); // Manage user state (null means not logged in)

  return (
    <Router>
      <div className="app bg-blue-50 text-gray-800 min-h-screen flex flex-col">
        <Navbar user={user} setUser={setUser} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage user={user} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/team" element={<OurTeamPage />} />
            <Route path="/signup" element={<SignUpPage setUser={setUser} />} />
            <Route path="/login" element={<LoginPage setUser={setUser} />} />
            <Route path="/profile" element={<UserProfile user={user} setUser={setUser} />} />
            {/* Make sure to add the wildcard "*" for nested routes */}
            <Route path="/kanban/*" element={<KanbanBoard />} >
              <Route path="weather" element={<WeatherDetails />} />
              <Route path="airquality" element={<AirQualityDetails />} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
