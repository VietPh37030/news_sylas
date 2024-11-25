import React, { useState, useEffect, useCallback } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import VotingSection from './VotingSection';

const MissionScreen = () => {
  const [checkedDays, setCheckedDays] = useState([false, false, false, false, false, false, false]);
  const points = 10;
  const currentDay = new Date().getDay();
  const checkedCount = checkedDays.filter(day => day).length;
  const userId = localStorage.getItem('userId');
  const [lotteryResults, setLotteryResults] = useState([]);

  const fetchCheckInStatus = useCallback(async () => {
    if (!userId) {
      toast.error("Vui lòng đăng nhập để sử dụng tính năng điểm danh.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/v1/checkins/checkin/${userId}`);
      const data = await response.json();

      if (response.ok) {
        const daysOfWeek = ["CN", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];
        const updatedCheckedDays = Array(7).fill(false); // Khởi tạo mảng trạng thái false

        // Đánh dấu các ngày đã điểm danh
        data.checkedDays.forEach(day => {
          const dayIndex = daysOfWeek.indexOf(day);
          if (dayIndex !== -1) updatedCheckedDays[dayIndex] = true;
        });

        setCheckedDays(updatedCheckedDays);

        // Kiểm tra nếu đã điểm danh hôm nay
        if (!updatedCheckedDays[currentDay]) {
          toast.warn("Bạn chưa điểm danh hôm nay.");
        }

      } else {
        toast.warn(data.message); // Hiển thị thông báo từ server
      }
    } catch (error) {
      console.error('Lỗi khi lấy trạng thái điểm danh:', error);
      toast.error("Không thể tải trạng thái điểm danh.");
    }
  }, [userId]);



  // Gọi API điểm danh
  const handleCheckIn = useCallback(async (dayIndex) => {
    if (dayIndex !== currentDay) {
      toast.warn("Bạn chỉ có thể điểm danh vào ngày hôm nay.");
      return;
    }

    if (!userId) {
      toast.error("Vui lòng đăng nhập để điểm danh.");
      return;
    }

    try {
      // Gọi API điểm danh
      const checkInResponse = await checkInUser(userId);
      if (!checkInResponse.ok) {
        toast.error(checkInResponse.message);
        return;
      }

      // Cập nhật trạng thái điểm danh
      setCheckedDays(prevDays =>
        prevDays.map((checked, index) => (index === dayIndex ? true : checked))
      );

      // Gọi API cộng điểm
      const addPointsResponse = await addPointsToUser(userId);
      if (addPointsResponse.ok) {
        toast.success("Bạn đã điểm danh và nhận điểm thành công!");
      } else {
        toast.error("Nhận điểm thất bại, vui lòng thử lại.");
      }

    } catch (error) {
      console.error('Lỗi khi điểm danh:', error);
      toast.error("Đã xảy ra lỗi khi điểm danh.");
    }
  }, [userId, currentDay]);

  // Hàm xử lý API điểm danh
  const checkInUser = async (userId) => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/checkins/checkin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
      const data = await response.json();
      return { ok: response.ok, message: data.message };
    } catch (error) {
      console.error("Lỗi khi gọi API điểm danh:", error);
      return { ok: false, message: "Không thể điểm danh, vui lòng thử lại." };
    }
  };

  // Hàm xử lý API cộng điểm
  const addPointsToUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/users/${userId}/add-points-checkin`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ points: 1000 }),
      });
      const result = await response.json();
      return { ok: response.ok, message: result.message };
    } catch (error) {
      console.error("Lỗi khi cộng điểm:", error);
      return { ok: false, message: "Không thể cộng điểm, vui lòng thử lại." };
    }
  };


  // Fetch kết quả xổ số
  const fetchLotteryResults = useCallback(async () => {
    try {
      const response = await fetch('https://xskt.com.vn/rss-feed/mien-bac-xsmb.rss');
      const text = await response.text();
      const parser = new DOMParser();
      const xml = parser.parseFromString(text, 'text/xml');
      const items = xml.getElementsByTagName('item');

      const results = Array.from(items).map(item => ({
        title: item.getElementsByTagName('title')[0].textContent,
        description: item.getElementsByTagName('description')[0].textContent,
        pubDate: item.getElementsByTagName('pubDate')[0].textContent,
      }));

      setLotteryResults(results);
    } catch (error) {
      console.error('Lỗi khi lấy kết quả xổ số:', error);
    }
  }, []);

  // Lấy trạng thái điểm danh khi component được tải
  useEffect(() => {
    fetchCheckInStatus();
    fetchLotteryResults();
  }, [fetchCheckInStatus, fetchLotteryResults]);

  return (
    <div style={{ display: 'flex', padding: 20 }}>
      <div style={{ flex: 1, textAlign: 'center' }}>
        <h1>Điểm danh 7 ngày</h1>
        <p>Số ngày đã điểm danh: {checkedCount}</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 20 }}>
          {checkedDays.map((checked, index) => (
            <div
              key={index}
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: checked ? 'green' : 'lightgray',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                position: 'relative',
              }}
              onClick={() => handleCheckIn(index)}
            >
              <span style={{ color: 'white' }}>
                {index === 0 ? 'CN' : `Thứ ${index + 1}`}
              </span>
              {checked && (
                <span style={{
                  position: 'absolute',
                  bottom: 4,
                  right: 4,
                  color: 'white',
                  fontSize: 24,
                  fontWeight: 'bold',
                }}>✓</span>
              )}
              <span style={{ color: 'white', fontSize: 14, marginTop: 8 }}>
                {points}đ
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Voting Section */}
      <div style={{ flex: 0.5 }}>
        <VotingSection lotteryResults={lotteryResults} />
      </div>
      <ToastContainer />
    </div>
  );
};

export default MissionScreen;
