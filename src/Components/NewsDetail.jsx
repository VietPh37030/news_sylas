import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const NewsDetail = () => {
    const { id } = useParams(); // Lấy id từ URL
    const [article, setArticle] = useState(null);

    useEffect(() => {
        const fetchArticle = async () => {
            const url = `https://newsapi.org/v2/everything?q=${id}&apiKey=${import.meta.env.VITE_API_KEY}`;
            const response = await fetch(url);
            const data = await response.json();
            setArticle(data.articles[0]); // Giả định bài báo đầu tiên là kết quả mong muốn
        };

        fetchArticle();
    }, [id]);

    if (!article) return <p>Loading...</p>;

    return (
        <div className="container my-5">
            <h2 className="text-center">{article.title}</h2>
            <img src={article.urlToImage} alt="article" className="img-fluid my-3" />
            <p><strong>Author:</strong> {article.author ? article.author : "Unknown"}</p>
            <p><strong>Published at:</strong> {new Date(article.publishedAt).toLocaleString()}</p>
            <p><strong>Description:</strong> {article.description}</p>
            <p><strong>Content:</strong> {article.content}</p>
            <p><strong>Source:</strong> <a href={article.source?.url} target="_blank" rel="noopener noreferrer">{article.source?.name}</a></p>
            <a href={article.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Read full article</a>
        </div>
    );
};

export default NewsDetail;
