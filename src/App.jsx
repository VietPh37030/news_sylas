

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import NewBoard from './Components/NewBoard';
import NewsDetail from './Components/NewsDetail';

const App = () => {
  const [category, setCategory] = useState("general");

  return (
    <Router>
      <Navbar setCategory={setCategory} />
    
      <Routes>
        <Route path="/" element={<NewBoard category={category} />} />
        <Route path="/news/:id" element={<NewsDetail />} />
      </Routes>
    </Router>
  );
};

export default App;

