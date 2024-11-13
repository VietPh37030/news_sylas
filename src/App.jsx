import React, { useState, useEffect } from 'react';
import NewBoard from './Components/NewBoard';
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MissionScreen from './Components/Mission/MissionScreen';
import AssetsScreen from './Components/AssetsTotal/Assets';
import NewDetail from './Components/NewDeitail';
import LoginCard from './Components/Login/LoginCard';
import RegisterCard from './Components/Login/RegisterCard';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Kiểm tra nếu người dùng đã đăng nhập (bằng cách kiểm tra token trong localStorage)
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true); // Nếu có token, người dùng đã đăng nhập
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true); // Đặt trạng thái đăng nhập là true khi đăng nhập thành công
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Xóa token khi đăng xuất
    setIsLoggedIn(false); // Đặt trạng thái đăng nhập là false
  };

  return (
    <Router>
      {/* Chỉ hiển thị Navbar nếu người dùng đã đăng nhập */}
      {isLoggedIn && <Navbar onLogout={handleLogout} />} 

      <Routes>
        {/* Trang Login chỉ hiển thị khi người dùng chưa đăng nhập */}
        <Route path="/" element={isLoggedIn ? <NewBoard /> : <LoginCard onLogin={handleLogin} />} />
        <Route path="/home" element={isLoggedIn ? <NewBoard /> : <LoginCard onLogin={handleLogin} />} />
        <Route path="/register" element={<RegisterCard />} />
        <Route path="/login" element={<LoginCard onLogin={handleLogin} />} />
        <Route path="/mission" element={isLoggedIn ? <MissionScreen /> : <LoginCard onLogin={handleLogin} />} />
        <Route path="/assets" element={isLoggedIn ? <AssetsScreen /> : <LoginCard onLogin={handleLogin} />} />
        <Route path="/detail/:id" element={isLoggedIn ? <NewDetail /> : <LoginCard onLogin={handleLogin} />} />
      </Routes>
    </Router>
  );
};

export default App;
