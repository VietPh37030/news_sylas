import React from 'react';
import '../../CSS/Asset.css';

const Assets = () => {
  return (
    <div className="assets-container">
      {/* Navigation Tabs */}
      <div className="tabs">
        <h7 className="tab active">Số point hiện tại:</h7>
        <button className="tab">1000</button>
        <div className="settings-icon">⚙️</div>
      </div>

      {/* Swap Box */}
      <div className="swap-box">
        {/* From Section */}
        <div className="swap-section">
          <div className="label">From</div>
          <div className="token-input">
            <div className="token">
              
              POINT
            </div>
            <input type="number" placeholder="0.00" className="amount-input" />
          </div>
        </div>

        {/* Swap Icon */}
        <div className="swap-icon">↕</div>

        {/* To Section */}
        <div className="swap-section">
          <div className="label">To</div>
          <div className="token-input">
            <div className="token">
              <img src="https://cryptologos.cc/logos/solana-sol-logo.png?v=035" alt="CAKE" className="token-icon" />
              SOL
            </div>
            <input type="number" placeholder="0.00" className="amount-input" />
          </div>
        </div>

        {/* Connect Wallet Button */}
        <button className="connect-wallet">Connect Wallet</button>
      </div>
    </div>
  );
};

export default Assets;
