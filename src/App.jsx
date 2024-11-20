import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NewBoard from './Components/NewBoard';
import Navbar from './Components/Navbar';
import MissionScreen from './Components/Mission/MissionScreen';
import AssetsScreen from './Components/AssetsTotal/Assets';
import NewDetail from './Components/NewDeitail';
import LoginCard from './Components/Login/LoginCard';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      {isLoggedIn && <Navbar />}
      <Routes>
        <Route path="/login" element={<LoginCard onLogin={handleLogin} />} />
        <Route path="/home" element={<NewBoard />} />
        <Route path="/mission" element={<MissionScreen />} />
        <Route path="/assets" element={<AssetsScreen />} />
        <Route path="/detail/:id" element={<NewDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
