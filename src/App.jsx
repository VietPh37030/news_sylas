import React from 'react';
import NewBoard from './Components/NewBoard';
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MissionScreen from './Components/Mission/MissionScreen';
import AssetsScreen from './Components/AssetsTotal/Assets';
import NewDetail from './Components/NewDeitail'; // Import NewDetail
const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/home" element={<NewBoard />} />
        <Route path="/mission" element={<MissionScreen />} />
        <Route path="/assets" element={<AssetsScreen />} />
        <Route path="/" element={<NewBoard />} /> {/* Redirect to NewBoard for root path */}
        <Route path="/detail/:id" element={<NewDetail />} /> {/* Route cho NewDetail */}
      </Routes>
    </Router>
  );
};

export default App;
