import React, { useEffect, useState } from 'react';
import NewItem from './NewItem';

const NewBoard = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        // Cập nhật URL API backend
        let url = `http://localhost:3000/api/v1/posts/get-all-post`;
        
        fetch(url)
            .then(response => response.json())
            .then(data => setArticles(data)); // Giả sử data là mảng bài viết từ backend
    }, []);

    return (
        <div>
            <h2 className='text-center'>
                Latest <span className="badge bg-danger">News</span>
            </h2>
            {articles.map((news, index) => {
                return (
                    <NewItem
                        key={news._id}
                        title={news.title}
                        description={news.content}
                        src={news.image && news.image[0]} // Đảm bảo ảnh đầu tiên được hiển thị
                        url={`/posts/${news._id}`} // Ví dụ đường dẫn tới chi tiết bài viết
                    />
                );
            })}
        </div>
    );
}

export default NewBoard;
