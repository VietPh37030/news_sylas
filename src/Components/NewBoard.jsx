import React, { useEffect, useState } from 'react'
import NewItem from './NewItem';

const NewBoard = ({category}) => {
    const [articles,setArticles] = useState([]);
    useEffect(()=>{
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${import.meta.env.VITE_API_KEY}`;
        fetch(url).then(response => response.json()).then(data =>setArticles(data.articles));
    },[category])
  return (
    <div>
      <h2 className='text-center'>Latest <span className="badge bg-danger">News</span></h2>
      {articles.map((news,index)=>{
            return <NewItem key={index} title ={news.title} description ={news.description} src={news.urlToImage} url={news.url}  />
      })}
      {articles.length ? (
        articles.map((news, index) => (
          <NewItem key={index} title={news.title} description={news.description} src={news.urlToImage} url={news.url} />
        ))
      ) : (
        <p>No articles found for this category.</p>
      )}

    </div>

  )
}

export default NewBoard
