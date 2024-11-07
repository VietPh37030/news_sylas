import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PublicKey } from '@solana/web3.js';
import '../CSS/index.css';

const Navbar = () => {
  const [activeLink, setActiveLink] = useState('home');
  const [walletAddress, setWalletAddress] = useState(null);

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  // Function để kết nối Phantom Wallet và lấy publicKey
  const connectWallet = async () => {
    if (window.solana && window.solana.isPhantom) {
      try {
        const response = await window.solana.connect();
        const publicKey = response.publicKey.toString();
        setWalletAddress(publicKey);

        // Gọi API để lưu publicKey vào hồ sơ người dùng
        await savePublicKey(publicKey);

        // Log thông tin chi tiết của ví
        console.log("Connected to wallet:", publicKey);
        console.log("Wallet details:", response);
      } catch (err) {
        console.error("Connection failed:", err);
      }
    } else {
      alert("Vui lòng cài đặt Phantom Wallet!");
    }
  };

  // Function để gửi publicKey đến server
  const savePublicKey = async (publicKey) => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/users/save-wallet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ publicKey })
      });
      if (response.ok) {
        alert("Kết nối ví thành công!");
      } else {
        alert("Lưu thông tin ví thất bại");
      }
    } catch (error) {
      console.error("Lỗi khi lưu ví:", error);
    }
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
          <button 
            className={`btn ms-auto ${walletAddress ? 'btn-connected' : 'btn-purple'}`} 
            onClick={connectWallet}
          >
            {walletAddress ? `Connected: ${walletAddress.substring(0, 4)}...${walletAddress.slice(-4)}` : 'Connect'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;