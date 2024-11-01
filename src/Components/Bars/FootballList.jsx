import React, { useEffect, useState } from "react";
import "../../CSS/FootballList.css"; // Đảm bảo bạn đã tạo file CSS này

const FootballList = () => {
  const [fixtures, setFixtures] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hàm lấy dữ liệu từ Football-Data API
  const fetchFixtures = async () => {
    try {
      const response = await fetch("https://api.football-data.org/v4/matches?dateFrom=2024-11-01&dateTo=2024-11-02", {
        method: "GET",
        headers: {
          "X-Auth-Token": "cba9d6f3273c40068e429a23c39b6034", // Thay thế bằng API key của bạn
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data); // Log dữ liệu ra console để kiểm tra
      setFixtures(data.matches || []); // Cập nhật state với dữ liệu trận đấu, mặc định là mảng rỗng nếu không có matches
      setLoading(false);
    } catch (error) {
      console.error("Error fetching football fixtures:", error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFixtures();
  }, []);

  return (
    <div className="football-list-container">
      <div className="football-list-header">
        <span>Lịch Thi Đấu Bóng Đá</span>
        <a href="#">Xem tất cả trận đấu &gt;</a>
      </div>
      <div className="football-list">
        {loading ? (
          <p>Loading...</p>
        ) : fixtures.length > 0 ? (
          fixtures.map((fixture) => (
            <div className="football-item" key={fixture.id}>
              <div className="football-teams">
                <span className="football-team">{fixture.homeTeam.name}</span>
                <span className="football-vs">vs</span>
                <span className="football-team">{fixture.awayTeam.name}</span>
              </div>
              <div className="football-date">{new Date(fixture.utcDate).toLocaleString()}</div>
            </div>
          ))
        ) : (
          <p>No fixtures available</p>
        )}
      </div>
    </div>
  );
};

export default FootballList;
