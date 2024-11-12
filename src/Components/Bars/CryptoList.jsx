import React, { useEffect, useState } from "react";
import "../../CSS/CryptoList.css";

const CryptoList = () => {
  const [cryptos, setCryptos] = useState([]);

  // Fetch dữ liệu từ CoinGecko API
  const fetchCryptos = async () => {
    try {
      const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false");
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const formattedData = data.map(crypto => ({
        name: crypto.symbol.toUpperCase(),
        fullName: crypto.name,
        price: `$${crypto.current_price.toLocaleString()}`,
        change: `${crypto.price_change_percentage_24h.toFixed(2)}%`,
        color: "#000000", // Bạn có thể thêm logic để chọn màu dựa trên symbol
        image: crypto.image // Lưu trữ URL hình ảnh
      }));

      setCryptos(formattedData);
    } catch (error) {
      console.error("Error fetching crypto data:", error);
    }
  };

  useEffect(() => {
    // Gọi hàm fetchCryptos khi component được mount
    fetchCryptos();

    // Thiết lập interval để gọi lại mỗi 5 phút
    const intervalId = setInterval(() => {
      fetchCryptos();
    }, 300000); // 300000 milliseconds = 5 phút

    // Dọn dẹp interval khi component bị unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="crypto-list-container">
      <div className="crypto-list-header">
        <span>Crytor</span>
        <span>Vàng</span>
        <a href="#">Xem tất cả &gt;</a>
      </div>
      <div className="crypto-list">
        {cryptos.length > 0 ? (
          cryptos.map((crypto) => (
            <div className="crypto-item" key={crypto.name}>
              <div className="crypto-name">
                {/* Hiển thị hình ảnh */}
                <img src={crypto.image} alt={crypto.fullName} className="crypto-icon" />
                <div>
                  <span className="crypto-symbol">{crypto.name}</span>
                  <span className="crypto-fullname">{crypto.fullName}</span>
                </div>
              </div>
              <div className="crypto-price">{crypto.price}</div>
              <div className="crypto-change" style={{ color: crypto.change.startsWith("+") ? "#00ff00" : "#ff0000" }}>
                {crypto.change}
              </div>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default CryptoList;
