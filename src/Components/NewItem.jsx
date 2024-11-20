import React from 'react';
import { useNavigate } from 'react-router-dom';
import image from '../assets/news.png';
import tokenAnimation from '../assets/lottie/token.json'; // Đường dẫn đến tệp Lottie
import Lottie from 'lottie-react';
const NewItem = ({ title, content, src, id, tokens }) => {
  const navigate = useNavigate(); // Khởi tạo useNavigate

  const handleReadMore = () => {
    navigate(`/detail/${id}`); // Điều hướng đến NewDetail với id của bài viết
  };

  return (
    <div className="card bg-dark text-light mb-3 d-inline-block my-3 mx-3 px-2 py-2" style={{ maxWidth: "345px" }}>
      <img src={src ? src : image} style={{ height: "200px" }} className="card-img-top" alt={title} />
      <div className="card-body">
        <h5 className="card-title">{title.slice(0, 50)}</h5>
        <p className="card-text">{content ? content.slice(0, 90) : ""}</p>
        <div className="d-flex justify-content-between align-items-center"> {/* Thay đổi ở đây */}
          <button className="btn btn-primary" onClick={handleReadMore}>Read More</button>
          <span className="ms-3">{tokens} 500 POINTS</span> {/* Hiển thị số lượng token */}
          <div className="ms-3" style={{ width: '40px', height: '40px' }}>
            <Lottie animationData={tokenAnimation} loop={true} /> {/* Lottie animation */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewItem;
