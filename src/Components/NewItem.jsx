import React from 'react';
import { useNavigate } from 'react-router-dom';
import image from '../assets/news.png';

const NewItem = ({ title, description, src, url }) => {
  const navigate = useNavigate(); // Khai báo useNavigate

  const handleReadMore = () => {
    // Điều hướng đến trang chi tiết với title là id
    navigate(`/news/${encodeURIComponent(title)}`);
  };

  return (
    <div className="card bg-dark text-light mb-3 d-inline-block my-3 mx-3 px-2 py-2" style={{ maxWidth: "345px" }}>
      <img src={src ? src : image} style={{ height: "200px" }} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{title.slice(0, 50)}</h5>
        <p className="card-text">{description ? description.slice(0, 90) : ""}</p>
        <button onClick={handleReadMore} className="btn btn-primary">Read More</button>
      </div>
    </div>
  );
};

export default NewItem;
