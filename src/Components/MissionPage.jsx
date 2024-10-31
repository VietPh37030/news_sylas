import React, { useState } from 'react';
import './MissionPage.css'; // Nhập tệp CSS

const MissionPage = () => {
  const [missions, setMissions] = useState([
    { id: 1, title: "Nhiệm vụ 1", completed: false },
    { id: 2, title: "Nhiệm vụ 2", completed: false },
    { id: 3, title: "Nhiệm vụ 3", completed: false },
    { id: 4, title: "Nhiệm vụ 4", completed: false },
    { id: 5, title: "Nhiệm vụ 5", completed: false },
    { id: 6, title: "Nhiệm vụ 6", completed: false },
    { id: 7, title: "Nhiệm vụ 7", completed: false },
    { id: 8, title: "Nhiệm vụ 8", completed: false },
    { id: 9, title: "Nhiệm vụ 9", completed: false },
    { id: 10, title: "Nhiệm vụ 10", completed: false },
  ]);

  const handleComplete = (id) => {
    setMissions((prevMissions) =>
      prevMissions.map((mission) =>
        mission.id === id ? { ...mission, completed: true } : mission
      )
    );
  };

  return (
    <div className="mission-container">
      <h1 className="mission-title">Nhiệm vụ</h1>
      <ul className="mission-list">
        {missions.map((mission) => (
          <li key={mission.id} className="mission-item">
            <span className={`mission-title ${mission.completed ? 'completed' : ''}`}>
              {mission.title}
            </span>
            <button
              onClick={() => handleComplete(mission.id)}
              disabled={mission.completed}
              className="mission-button"
            >
              {mission.completed ? 'Đã hoàn thành' : 'Thực hiện'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MissionPage;
