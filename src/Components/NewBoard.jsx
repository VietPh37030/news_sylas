import React, { useEffect, useState } from "react";
import NewItem from "./NewItem"; // Đảm bảo đường dẫn đúng với vị trí của NewItem
import CryptoList from "./Bars/CryptoList";
import FootballList from "./Bars/FootballList";

const NewBoard = () => {
  const [articles, setArticles] = useState([]);

  // Fetch dữ liệu từ API khi component được render
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/posts/get-all-post', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result); // Kiểm tra dữ liệu nhận được
        setArticles(result.data); // Lưu trữ dữ liệu từ `data` vào state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchArticles();
  }, []);

  return (

    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
      <div style={{ flex: 1 }}>
        <h2 className="text-center">
          Latest <span className="badge bg-danger">News</span>
        </h2>
        <div className="d-flex flex-wrap justify-content-center">
          {articles.length > 0 ? (
            articles.map((news) => (
              <NewItem 
                key={news._id}
                title={news.title}
                content={news.content} // Truyền content vào NewItem
                src={news.image && news.image.length > 0 ? news.image[0] : null} // Lấy ảnh đầu tiên
                id={news._id} // Truyền id của bài viết
              />
            ))
          ) : (
            <p>No news articles available.</p>
          )}
        </div>
      </div>
      <div style={{ width: '300px', marginLeft: '20px' }}> {/* Đặt kích thước cho CryptoList */}
        <CryptoList />
      </div>
    </div>
  );
};


export default NewBoard;
