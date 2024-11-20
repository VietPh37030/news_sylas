import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PublicKey, Connection } from '@solana/web3.js';
import '../CSS/index.css';

const Navbar = () => {
  const [activeLink, setActiveLink] = useState('home');
  const [user, setUser] = useState(null);
  
  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  useEffect(() => {
    // Lấy userId từ localStorage hoặc token nếu có
    const userId = localStorage.getItem('userId');
    if (userId) {
      // Gọi API để lấy thông tin người dùng
      fetchUserData(userId);
    }
  }, []);

  // Gọi API để lấy thông tin người dùng
  const fetchUserData = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/users/get-user-by-id/${userId}`);
      const data = await response.json();
      console.log("Dữ liệu All",data);
      
      if (data.status === 200) {
        setUser(data.data); // Lưu thông tin người dùng vào state
      } else {
        console.error('Lỗi lấy thông tin người dùng:', data.message);
      }
    } catch (error) {
      console.error('Lỗi gọi API:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    setUser(null);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand custom-navbar-brand" to="/">Sylas Newspp</Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link 
                className={`nav-link ${activeLink === 'home' ? 'text-purple' : ''}`} 
                aria-current="page" 
                to="/home" 
                onClick={() => handleLinkClick('home')}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${activeLink === 'Mission' ? 'text-purple' : ''}`} 
                to="/mission" 
                onClick={() => handleLinkClick('Mission')}
              >
                Mission
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${activeLink === 'Assets' ? 'text-purple' : ''}`} 
                to="/assets" 
                onClick={() => handleLinkClick('Assets')}
              >
                Assets
              </Link>
            </li>
          </ul>
          {user ? (
            <button 
              className="btn btn-connected ms-auto" 
              onClick={handleLogout}
            >
              Logout ({user.username})
            </button>
          ) : (
            <Link to="/login" className="btn btn-purple ms-auto">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
