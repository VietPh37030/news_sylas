import React, { useState } from 'react';

const VotingSection = ({ lotteryResults }) => {
  const [activeTab, setActiveTab] = useState('Thể thao');
  const [betPoints, setBetPoints] = useState('');
  const [selectedNumber, setSelectedNumber] = useState('');

  const handlePlaceBet = () => {
    // Logic to handle placing a bet with betPoints and selectedNumber
    alert(`Đã đặt cược ${betPoints} điểm cho số ${selectedNumber}`);
    setBetPoints(''); // Reset bet points after placing a bet
    setSelectedNumber(''); // Reset selected number
  };

  return (
    <div style={{ paddingLeft: 20 }}>
      <div>
        <button onClick={() => setActiveTab('Thể thao')} style={{ marginRight: 10 }}>
          Thể thao
        </button>
        <button onClick={() => setActiveTab('Sổ số')}>
          Sổ số
        </button>
      </div>

      {activeTab === 'Thể thao' && (
        <div style={{ marginTop: 20 }}>
          <h3>Thể thao - Lịch thi đấu</h3>
          <div style={{ marginBottom: 10 }}>
            <p>Trận đấu 1: Đội A vs Đội B</p>
            <button>Chọn Đội A</button>
            <button>Chọn Đội B</button>
          </div>
          <div style={{ marginBottom: 10 }}>
            <p>Trận đấu 2: Đội C vs Đội D</p>
            <button>Chọn Đội C</button>
            <button>Chọn Đội D</button>
          </div>
          <div style={{ marginTop: 20 }}>
            <input
              type="number"
              value={betPoints}
              onChange={(e) => setBetPoints(e.target.value)}
              placeholder="Nhập số điểm đặt cược"
              style={{ padding: 8, marginRight: 10 }}
            />
            <button onClick={handlePlaceBet}>Đặt cược</button>
          </div>
        </div>
      )}

      {activeTab === 'Sổ số' && (
        <div style={{ marginTop: 20 }}>
          <h3>Sổ số - Chọn số của bạn</h3>
          <input
            type="number"
            value={selectedNumber}
            onChange={(e) => setSelectedNumber(e.target.value)}
            placeholder="Nhập số may mắn"
            style={{ padding: 8, marginRight: 10 }}
          />
          <button onClick={handlePlaceBet}>Chọn số</button>

          <div style={{ marginTop: 20 }}>
            <h4>Kết quả sổ số hôm nay</h4>
            {lotteryResults.length > 0 ? (
              lotteryResults.map((result, index) => (
                <div key={index} style={{ marginBottom: 10 }}>
                  <h5>{result.title}</h5>
                  <p>{result.description}</p>
                  <p><strong>Ngày:</strong> {new Date(result.pubDate).toLocaleDateString()}</p>
                </div>
              ))
            ) : (
              <p>Đang tải kết quả...</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VotingSection;
