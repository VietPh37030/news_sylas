import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PublicKey, Connection } from '@solana/web3.js';  // Import required Solana libraries

import '../CSS/index.css';

const Navbar = () => {
  const [activeLink, setActiveLink] = useState('home');
  const [walletAddress, setWalletAddress] = useState(null);

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  // Function to connect Phantom Wallet and get publicKey
  const connectWallet = async () => {
    if (window.solana && window.solana.isPhantom) {
      try {
        const response = await window.solana.connect();
        const publicKey = response.publicKey.toString();
        setWalletAddress(publicKey);

        // Get the Solana token balance after wallet connection
        const tokenBalance = await getSolanaTokenBalance(publicKey);
        console.log("Token balance:", tokenBalance);

        // Call the API to save the publicKey in the backend
        await savePublicKey(publicKey);

        console.log("Connected to wallet:", publicKey);
        console.log("Wallet details:", response);
      } catch (err) {
        console.error("Connection failed:", err);
      }
    } else {
      alert("Please install Phantom Wallet!");
    }
  };

  const getSolanaTokenBalance = async (publicKey) => {
    try {
      const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
      const walletPublicKey = new PublicKey(publicKey);

      // Get all token accounts by owner (the wallet address)
      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(walletPublicKey, { programId: TokenInstructions.TOKEN_PROGRAM_ID });

      // If no token accounts exist, return null
      if (tokenAccounts.value.length === 0) {
        throw new Error("No token accounts found for this wallet.");
      }

      // Extract balance information from token accounts
      const balance = tokenAccounts.value.reduce((total, { account }) => {
        const tokenAmount = account.data.parsed.info.tokenAmount.uiAmount;
        return total + tokenAmount;
      }, 0);

      console.log("Total token balance:", balance);
      return balance;
    } catch (error) {
      console.error("Error getting Solana token balance:", error);
      return null;
    }
  };


  // Function to send the publicKey to the server to save it
  const savePublicKey = async (publicKey) => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/users/save-wallet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ publicKey })
      });

      const responseData = await response.json();
      console.log("API response:", responseData);  // Check response

      if (response.ok) {
        alert("Wallet connected successfully!");
      } else {
        console.error("API error:", responseData);
        alert(`Failed to save wallet info: ${responseData.message}`);
      }
    } catch (error) {
      console.error("Error sending request:", error);
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