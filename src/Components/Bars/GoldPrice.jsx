// GoldPrice.js
import React, { useEffect, useState } from "react";

const GoldPrice = () => {
  const [goldPrice, setGoldPrice] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchGoldPrice = async () => {
    try {
      const response = await fetch("https://www.gold-price-api.com/api/gold-price");
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setGoldPrice(data.price); // Điều chỉnh theo cấu trúc dữ liệu của API
      setLoading(false);
    } catch (error) {
      console.error("Error fetching gold price:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoldPrice();
    const intervalId = setInterval(() => {
      fetchGoldPrice();
    }, 300000); // 300000 milliseconds = 5 phút

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h2>Giá Vàng</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <p>Giá vàng 24K: ${goldPrice ? goldPrice.toLocaleString() : "N/A"}</p>
      )}
    </div>
  );
};

export default GoldPrice;
