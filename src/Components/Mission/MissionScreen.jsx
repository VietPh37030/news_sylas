import React, { useState, useEffect } from 'react';
import VotingSection from './VotingSection';

const MissionScreen = () => {
  const [checkedDays, setCheckedDays] = useState([false, false, false, false, false, false, false]);
  const currentDay = new Date().getDay();
  const checkedCount = checkedDays.filter(day => day).length;

  const [tasks, setTasks] = useState([
    { id: 1, title: 'Nhiệm vụ 1', reward: 50, status: 'Chưa hoàn thành', image: 'https://via.placeholder.com/50' },
    { id: 2, title: 'Nhiệm vụ 2', reward: 30, status: 'Chưa hoàn thành', image: 'https://via.placeholder.com/50' },
    { id: 3, title: 'Nhiệm vụ 3', reward: 40, status: 'Chưa hoàn thành', image: 'https://via.placeholder.com/50' },
    { id: 4, title: 'Nhiệm vụ 4', reward: 20, status: 'Chưa hoàn thành', image: 'https://via.placeholder.com/50' },
    { id: 5, title: 'Nhiệm vụ 5', reward: 60, status: 'Chưa hoàn thành', image: 'https://via.placeholder.com/50' },
  ]);

  const [lotteryResults, setLotteryResults] = useState([]);

  const fetchLotteryResults = async () => {
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
      console.error('Error fetching lottery results:', error);
    }
  };

  useEffect(() => {
    fetchLotteryResults();
  }, []);

  const handleCheckIn = (dayIndex) => {
    if (dayIndex === currentDay && !checkedDays[dayIndex]) {
      setCheckedDays(prevDays =>
        prevDays.map((checked, index) => (index === dayIndex ? true : checked))
      );
    } else if (dayIndex !== currentDay) {
      alert("Bạn chỉ có thể điểm danh vào ngày hôm nay.");
    } else {
      alert("Bạn đã điểm danh ngày này rồi.");
    }
  };

  const handleCompleteTask = (taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

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
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                position: 'relative',
              }}
              onClick={() => handleCheckIn(index)}
            >
              <span style={{ color: 'white' }}>{`Thứ ${index === 0 ? 'CN' : index + 1}`}</span>
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
            </div>
          ))}
        </div>

        <h2 style={{ marginTop: 40 }}>Danh sách nhiệm vụ</h2>
        <div style={{ marginTop: 20 }}>
          {tasks.map(task => (
            <div
              key={task.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: 10,
                border: '1px solid lightgray',
                borderRadius: 8,
                marginBottom: 10,
                gap: 10,
              }}
            >
              <img src={task.image} alt={task.title} style={{ width: 50, height: 50, borderRadius: 8 }} />
              <div style={{ flex: 1 }}>
                <h3>{task.title}</h3>
                <p>Phần thưởng: {task.reward} điểm</p>
                <p style={{ color: task.status === 'Chưa hoàn thành' ? 'red' : 'green' }}>
                  Trạng thái: {task.status}
                </p>
              </div>
              <button onClick={() => handleCompleteTask(task.id)} style={{ padding: '6px 12px' }}>
                Hoàn thành
              </button>
            </div>
          ))}
          {tasks.length === 0 && <p>Tất cả nhiệm vụ đã hoàn thành!</p>}
        </div>
      </div>

      {/* Voting Section */}
      <div style={{flex:0.5}}>
      <VotingSection lotteryResults={lotteryResults} />
      </div>
     
    </div>
  );
};

export default MissionScreen;
