import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';

// Đăng ký các thành phần ChartJS cần thiết
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const SolanaChart = () => {
  // Dữ liệu biểu đồ
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'], // Các tháng
    datasets: [
      {
        label: 'SOL Price (USD)', // Tên đường đầu tiên
        data: [100, 120, 140, 130, 160, 180, 170], // Dữ liệu cho SOL (ví dụ)
        fill: false, // Không tô màu dưới đường
        borderColor: 'rgba(75,192,192,1)', // Màu xanh cho đường
        tension: 0.1, // Độ cong của đường
      },
      {
        label: 'SOL Trading Volume', // Tên đường thứ hai
        data: [2000, 2500, 2800, 2700, 3200, 3500, 3400], // Dữ liệu cho trading volume (ví dụ)
        fill: false, // Không tô màu dưới đường
        borderColor: 'rgba(255,99,132,1)', // Màu đỏ cho đường
        tension: 0.1, // Độ cong của đường
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: false,
        text: 'SOL Price & Trading Volume',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Month',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Value',
        },
      },
    },
  };

  return (
    <div>
      <h2>Solana Price & Trading Volume Chart</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default SolanaChart;
