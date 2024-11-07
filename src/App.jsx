import React, { useState } from 'react';
import NewBoard from './Components/NewBoard';
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MissionScreen from './Components/Mission/MissionScreen';
import AssetsScreen from './Components/AssetsTotal/Assets';
import NewDetail from './Components/NewDeitail';
import LoginCard from './Components/Login/LoginCard'; // Import LoginCard

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

  const handleLogin = () => {
    setIsLoggedIn(true); // Update login status when login is successful
  };

  return (
    <Router>
      {isLoggedIn && <Navbar />} {/* Render Navbar only if logged in */}
      <Routes>
        <Route path="/" element={<LoginCard onLogin={handleLogin} />} /> {/* Render LoginCard when not logged in */}
        <Route path="/home" element={<NewBoard />} />
        <Route path="/mission" element={<MissionScreen />} />
        <Route path="/assets" element={<AssetsScreen />} />
        <Route path="/detail/:id" element={<NewDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
