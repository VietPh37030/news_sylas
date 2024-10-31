

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import NewBoard from './Components/NewBoard';
import NewsDetail from './Components/NewsDetail';
import MissionPage from './Components/MissionPage'; 

const App = () => {
  const [category, setCategory] = useState("general");

  return (
    <Router>
      <Navbar setCategory={setCategory} />
    
      <Routes>
        <Route path="/" element={<NewBoard category={category} />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/mission" element={<MissionPage />} />
      </Routes>
    </Router>
  );
};

export default App;

