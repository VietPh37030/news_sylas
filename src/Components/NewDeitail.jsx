import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../CSS/index.css';

const NewDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [countdown, setCountdown] = useState(15);
  const [pointsAdded, setPointsAdded] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/posts/get-post-by-id/${id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
          throw new Error(`Lỗi HTTP! Trạng thái: ${response.status}`);
        }

        const result = await response.json();
        setArticle(result.data);
      } catch (error) {
        console.error("Lỗi khi lấy bài viết:", error);
      }
    };

    fetchArticle();
  }, [id]);

  useEffect(() => {
    // Lấy userId từ localStorage
    const userId = localStorage.getItem('userId');

    if (!userId) {
      console.error("Không tìm thấy userId trong localStorage");
      return;
    }

    // Kiểm tra nếu bài viết đã đọc từ localStorage
    const readArticles = JSON.parse(localStorage.getItem('readArticles')) || [];
    if (readArticles.includes(id)) {
      setPointsAdded(true); // Đã nhận điểm cho bài viết này
      return;
    }

    // Đếm ngược
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    if (countdown === 0 && !pointsAdded) {
      addPointsToUser(userId);
    }

    return () => clearInterval(timer);
  }, [countdown, pointsAdded, id]);

  const addPointsToUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/users/${userId}/add-points`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ points: 1000 })
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Kết quả cộng điểm:", result);
        setPointsAdded(true);
        toast.success("Bạn đã nhận điểm thành công!");

        // Cập nhật danh sách bài viết đã đọc
        const readArticles = JSON.parse(localStorage.getItem('readArticles')) || [];
        localStorage.setItem('readArticles', JSON.stringify([...readArticles, id]));
      } else {
        console.error("Lỗi khi cộng điểm:", result);
        toast.error("Nhận điểm thất bại, vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Lỗi khi cộng điểm:", error);
      toast.error("Nhận điểm thất bại, vui lòng thử lại.");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).replace(',', '').replace(':', 'h');
  };

  return (
    <div className="container">
      {article ? (
        <div>
          <h1>{article.title}</h1>
          <h7>{formatDate(article.createdAt)}</h7>

          <div className="content-gallery">
            {article.content.split('\n').reduce((acc, paragraph) => {
              const currentParagraph = paragraph.trim();
              if (currentParagraph.length >= 250) {
                acc.push({ text: currentParagraph, hasImage: false });
              } else if (acc.length > 0) {
                acc[acc.length - 1].text += ' ' + currentParagraph;
              }
              return acc;
            }, []).map((validParagraph, paragraphIndex) => {
              const imgSrc = article.image && article.image[paragraphIndex] ? article.image[paragraphIndex] : null;
              if (imgSrc) {
                validParagraph.hasImage = true;
              }

              return (
                <React.Fragment key={paragraphIndex}>
                  <p className="content">{validParagraph.text}</p>
                  {validParagraph.hasImage && imgSrc && (
                    <img
                      src={imgSrc}
                      alt={`Image for paragraph ${paragraphIndex + 1}`}
                      className="image"
                      style={{ display: 'block', margin: '0 auto', maxWidth: '100%', height: 'auto' }}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Bong bóng đếm ngược */}
          <div className="countdown-bubble">
            {pointsAdded ? 'Bạn đã nhận điểm cho bài viết này.' : countdown > 0 ? `${countdown} giây còn lại` : 'Đã Hoàn thành 😍😍😍!'}
          </div>

          {/* ToastContainer cho thông báo */}
          <ToastContainer />
        </div>
      ) : (
        <p>Đang tải bài viết...</p>
      )}
    </div>
  );
};

export default NewDetail;
