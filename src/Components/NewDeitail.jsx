import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../CSS/index.css'; // Import file CSS

const NewDeitail = () => {
  const { id } = useParams(); // Lấy id từ URL
  const [article, setArticle] = useState(null);
  const [countdown, setCountdown] = useState(15); // Trạng thái cho đếm ngược
  const [inactive, setInactive] = useState(false); // Trạng thái để kiểm tra không hoạt động

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/posts/get-post-by-id/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setArticle(result.data); // Lưu trữ dữ liệu bài viết
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };

    fetchArticle();
  }, [id]);

  useEffect(() => {
    // Khởi tạo đếm ngược
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer); // Dọn dẹp interval khi component bị gỡ bỏ
    }
  }, [countdown]);

  useEffect(() => {
    const handleUserActivity = () => {
      setInactive(false); // Người dùng hoạt động
      setCountdown(15); // Reset đếm ngược
    };

    // Theo dõi hoạt động của người dùng
    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('keydown', handleUserActivity);
    window.addEventListener('scroll', handleUserActivity);

    return () => {
      // Dọn dẹp các sự kiện
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('keydown', handleUserActivity);
      window.removeEventListener('scroll', handleUserActivity);
    };
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      setInactive(true); // Đặt trạng thái không hoạt động khi đếm ngược về 0
    }
  }, [countdown]);

  // Hàm định dạng ngày tháng
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false, // 12-hour or 24-hour format
    };

    // Chuyển đổi thành định dạng mong muốn
    return date.toLocaleString('vi-VN', options).replace(',', '').replace(':', 'h');
  };

  return (
    <div className="container"> {/* Thêm class cho container */}
      {article ? (
        <div>
          <h1>{article.title}</h1>
          <h7>{formatDate(article.createdAt)}</h7> {/* Hiển thị ngày giờ đã định dạng */}

          <div className="content-gallery">
            {article.content.split('\n').reduce((acc, paragraph) => {
              // Kiểm tra độ dài đoạn văn
              const currentParagraph = paragraph.trim();
              if (currentParagraph.length >= 250) {
                acc.push({ text: currentParagraph, hasImage: false }); // Thêm một đối tượng chứa văn bản và trạng thái hình ảnh
              } else if (acc.length > 0) {
                // Nếu có đoạn văn trước đó và không có hình ảnh
                acc[acc.length - 1].text += ' ' + currentParagraph; // Nối đoạn văn
              }
              return acc;
            }, []).map((validParagraph, paragraphIndex) => {
              // Chỉ hiển thị hình ảnh tương ứng với đoạn văn
              const imgSrc = article.image && article.image[paragraphIndex] ? article.image[paragraphIndex] : null;
              if (imgSrc) {
                validParagraph.hasImage = true; // Đánh dấu rằng đã sử dụng hình ảnh
              }

              return (
                <React.Fragment key={paragraphIndex}>
                  <p className="content">{validParagraph.text}</p>
                  {validParagraph.hasImage && imgSrc && (
                    <img
                      src={imgSrc}
                      alt={`Image for paragraph ${paragraphIndex + 1}`}
                      className="image" // Thêm class cho hình ảnh
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Bong bóng đếm ngược */}
          <div className="countdown-bubble">
            {countdown > 0 ? `${countdown} giây còn lại` : 'Đã Hoàn thành 😍😍😍!'}
          </div>

          {/* Thông báo không hoạt động */}
          {inactive && (
            <div className="inactive-dialog">
              Bạn đang không hoạt động!
            </div>
          )}
        </div>
      ) : (
        <p>Loading article...</p>
      )}
    </div>
  );
};

export default NewDeitail;
