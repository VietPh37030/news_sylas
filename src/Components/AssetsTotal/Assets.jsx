import React, { useState, useEffect } from 'react';
import '../../CSS/Asset.css';
import { PublicKey, Connection } from '@solana/web3.js';  // Import required
import SolanaChart from '../Bars/SolanaChart ';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Assets = () => {
  const [userPoints, setUserPoints] = useState(null); // Lưu điểm người dùng
  const [walletAddress, setWalletAddress] = useState(null);
  const [pointsToSwap, setPointsToSwap] = useState(''); // Số điểm người dùng muốn đổi
  const [solAmount, setSolAmount] = useState(0); // Số SOL tính được

  // Tỷ lệ chuyển đổi: 100 điểm = 0.0001 SOL
  const POINTS_TO_SOL_RATE = 0.0001;

  // Lấy userId từ localStorage hoặc token nếu có
  const userId = localStorage.getItem('userId');

  // Hàm gọi API để lấy điểm người dùng
  const fetchUserData = async () => {
    if (userId) {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/users/get-user-by-id/${userId}`);
        const data = await response.json();
        
        if (data.status === 200) {
          setUserPoints(data.data.point); // Lưu điểm vào state
          
        } else {
          console.error('Lỗi lấy điểm người dùng:', data.message);
        }
      } catch (error) {
        console.error('Lỗi gọi API:', error);
      }
    }
  };

  // Hàm kết nối Phantom Wallet và lấy publicKey
  const connectWallet = async () => {
    if (window.solana && window.solana.isPhantom) {
      try {
        const response = await window.solana.connect();
        const publicKey = response.publicKey.toString();
        setWalletAddress(publicKey);
        console.log("Connected to wallet:", publicKey);
        toast.success("Bạn đã kết nối ví thành công",publicKey);
      } catch (err) {
        console.error("Connection failed:", err);
      }
    } else {
      alert("Please install Phantom Wallet!");
    }
  };

  // Tính toán số SOL từ số điểm
  const handlePointsChange = (e) => {
    const points = e.target.value;
    setPointsToSwap(points);
    const sol = (points * POINTS_TO_SOL_RATE).toFixed(4); // Chuyển đổi điểm thành SOL
    setSolAmount(sol);
  };

  // Hàm gọi API chuyển đổi điểm thành SOL
 
  const handleSwap = async () => {
    // Kiểm tra xem ví đã được kết nối hay chưa
    if (!walletAddress) {
      toast.error("Vui lòng kết nối ví trước khi thực hiện giao dịch.");
      console.log("Wallet not connected.");
      return;
    }
  
    // Kiểm tra nếu số điểm người dùng nhập <= 0
    if (pointsToSwap <= 0) {
      toast.error("Số điểm không hợp lệ. Vui lòng nhập số lớn hơn 0.");
      console.log("Invalid points amount: must be greater than 0.");
      return;
    }
  
    // Kiểm tra nếu số điểm muốn đổi lớn hơn số điểm hiện có
    if (pointsToSwap > userPoints) {
      toast.error("Số lượng điểm không đủ. Vui lòng nhập số nhỏ hơn hoặc bằng số điểm hiện có.");
      console.log(
        `Insufficient points: tried to swap ${pointsToSwap} but only ${userPoints} available.`
      );
      return;
    }
  
    // Gửi yêu cầu chuyển đổi lên API
    try {
      const response = await fetch('http://localhost:3000/api/v1/tokens/convert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          points: pointsToSwap, // Gửi số điểm cần chuyển đổi
        }),
      });
      const data = await response.json();
  
      if (data.status === 200) {
        alert("Chuyển đổi thành công!");
        console.log("Swap successful:", data);
        toast.success('Bạn đã đổi điểm thành công')
        // Cập nhật lại điểm trong state và gọi lại API để làm mới dữ liệu
        setUserPoints(userPoints - pointsToSwap); // Trừ điểm đã swap
        fetchUserData(); // Gọi lại API để cập nhật dữ liệu từ server
      } else {
        toast.error("Không thể thực hiện chuyển đổi: " + data.message);
        console.error("Swap failed:", data.message);
      }
    } catch (error) {
      console.error("Lỗi trong quá trình chuyển đổi:", error);
      alert("Đã xảy ra lỗi khi thực hiện chuyển đổi. Vui lòng thử lại sau.");
    }
  };
  
  


  // Gọi API khi component mount
  useEffect(() => {
    fetchUserData();
  }, []); // Chỉ gọi khi component được render lần đầu tiên

  return (
    <div className="assets-container">
      {/* Navigation Tabs */}
      <div className="tabs">
        <h7 className="tab active">Số point hiện tại:</h7>
        <button className="tab">{userPoints !== null ? userPoints : 'Loading...'}</button>
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
            <input 
              type="number" 
              value={pointsToSwap} 
              onChange={handlePointsChange} 
              placeholder="0.00" 
              className="amount-input" 
            />
          </div>
        </div>

        {/* Swap Icon */}
        <div className="swap-icon">↕</div>

        {/* To Section */}
        <div className="swap-section">
          <div className="label">To</div>
          <div className="token-input">
            <div className="token">
              <img src="https://cryptologos.cc/logos/solana-sol-logo.png?v=035" alt="SOL" className="token-icon" />
              SOL
            </div>
            <input type="number" value={solAmount} readOnly className="amount-input" />
          </div>
        </div>

        {/* Connect Wallet / Swap Button */}
        <button 
          className={`connect-wallet ${walletAddress ? 'btn-swap' : 'btn-connect'}`} 
          onClick={walletAddress ? handleSwap : connectWallet}
        >
          {walletAddress ? 'Swap Now' : 'Connect Wallet'}
        </button>
      </div>
      <SolanaChart/>
      <ToastContainer />
    </div>
  );
};

export default Assets;
