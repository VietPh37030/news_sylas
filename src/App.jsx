import React, { useEffect, useState } from "react";

const App = () => {
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
    <div>
      <h2 className="text-center">
        Latest <span className="badge bg-danger">News</span>
      </h2>
      <div>
        {articles.length > 0 ? (
          articles.map((news) => (
            <div key={news._id} style={{ borderBottom: "1px solid #ddd", padding: "10px" }}>
              <h3>{news.title}</h3>
              <p>{news.content}</p>
              {news.image && news.image.length > 0 && (
                <img src={news.image[0]} alt="News" style={{ width: "100%", height: "auto" }} />
              )}
            </div>
          ))
        ) : (
          <p>No news articles available.</p>
        )}
      </div>
    </div>
  );
};

export default App;
