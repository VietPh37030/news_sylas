import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link từ react-router-dom
import '../CSS/index.css';

const Navbar = () => {
  const [activeLink, setActiveLink] = useState('home'); // State để theo dõi phần tử đang hoạt động

  const handleLinkClick = (link) => {
    setActiveLink(link); // Cập nhật phần tử đang hoạt động
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
                to="/" 
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
            <li className="nav-item">
              <a className="nav-link disabled" aria-disabled="true">Disabled</a>
            </li>
          </ul>
          <button className="btn btn-purple ms-auto">Connect</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
