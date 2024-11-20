import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NewBoard from './Components/NewBoard';
import Navbar from './Components/Navbar';
import MissionScreen from './Components/Mission/MissionScreen';
import AssetsScreen from './Components/AssetsTotal/Assets';
import NewDetail from './Components/NewDeitail';
import LoginCard from './Components/Login/LoginCard';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    // Kiểm tra trạng thái đăng nhập từ localStorage khi khởi tạo
    () => JSON.parse(localStorage.getItem('isLoggedIn')) || false
  );

  // Hàm xử lý khi người dùng đăng nhập
  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', JSON.stringify(true)); // Lưu trạng thái đăng nhập
  };

  // Hàm xử lý khi người dùng đăng xuất
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn'); // Xóa trạng thái đăng nhập khỏi localStorage
  };

  return (
    <Router>
      {isLoggedIn && <Navbar onLogout={handleLogout} />} {/* Truyền hàm onLogout cho Navbar */}
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
