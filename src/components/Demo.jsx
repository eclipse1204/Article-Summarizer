import React, { useEffect, useState } from 'react';
import { copy, linkIcon, loader, tick } from "../assets";
import {setAllArticles,setArticle,setError,setCopied,setLoading,setArticleUrl} from '../Redux/Slices/articleSlice.js';
import Spinner from './Spinner.jsx';
import { useDispatch, useSelector } from 'react-redux';

const rapidApiKey = import.meta.env.VITE_RAPID_API_ARTICLE_KEY;
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': rapidApiKey,
    'X-RapidAPI-Host': 'article-extractor-and-summarizer.p.rapidapi.com'
  }
};

function Demo() {

  let article,allArticles,copied,loading,error;
  useSelector((state)=>{
    return {article,allArticles,copied,loading,error}=state.article;
  })

  const dispatch=useDispatch();

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );
    if (articlesFromLocalStorage) {
      dispatch(setAllArticles(articlesFromLocalStorage));
    }
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    dispatch(setLoading(true));
    dispatch(setError(false));

    //already present in the local storage or not
    const existingArticle = allArticles.find((item) => 
      item.url === article.url
    );

    if (existingArticle) {
      dispatch(setArticle(existingArticle));
      dispatch(setLoading(false));
      return;
    }

    try {
      const url = `https://article-extractor-and-summarizer.p.rapidapi.com/summarize?url=${article.url}&length=3`;
      const response = await fetch(url, options);
      const result = await response.json();
      if(result.summary)
      {
        const newArticle = { ...article, summary: result.summary };
        const updatedAllArticles = [newArticle, ...allArticles];
        dispatch(setArticle(newArticle));
        dispatch(setAllArticles(updatedAllArticles));
        localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
      }
      else
      {
        dispatch(setError(result.error));
      }
    } 
    catch (error) {
      dispatch(setError(error));
    }
    dispatch(setLoading(false));
  };

  function handleChange(event)
  {
    dispatch(setArticleUrl(event.target.value))
  }

  const handleCopy = (copyUrl) => {
    dispatch(setCopied(copyUrl));
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false), 3000);
  };

  function handleClick(item){
    dispatch(setArticle(item));
    dispatch(setError(false));
  }

  return (
    <section className='mt-16 w-full max-w-xl'>
      <div className='flex flex-col w-full gap-2'>
        <form
          className='relative flex justify-center items-center'
          onSubmit={handleSubmit}>
          <img
            src={linkIcon}
            alt='link-icon'
            className='absolute left-0 my-2 ml-3 w-5'/>
          <input
            type='url'
            placeholder='Paste the article link'
            value={article.url}
            onChange={handleChange}
            required
            className='url_input'/>
          <button
            type='submit'
            className='submit_btn'>
            <p className='absolute top-[1.5px]'>↵</p>
          </button>
        </form>

        {/* Show the previous results */}
        <div className='flex flex-col gap-1 max-h-60 overflow-y-auto'>
          {allArticles.map((item, index) => (
            <div
              key={index}
              className='link_card'>
              <div className='copy_btn' 
                onClick={() => handleCopy(item.url)}>
                <img
                  src={copied === item.url ? tick : copy}
                  alt="copy_icon"
                  className='w-[40%] h-[40%] object-contain'/>
              </div>
              <p onClick={() => handleClick(item)} 
                className='flex-1 font-satoshi text-blue-700 font-medium text-sm truncate'>
                {item.url}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className='my-10 max-w-full flex justify-center items-center'>
        {loading ? (
          <Spinner></Spinner>
        ) : error ? (
          <p className='font-inter font-bold text-black text-center'>
            Well, that wasn't supposed to happen...
            <br />
            <span className='font-satoshi font-normal text-gray-700'>
              {error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className='flex flex-col gap-3'>
              <h2 className='font-satoshi font-bold text-gray-600 text-xl'>
                Article <span className='blue_gradient'>Summary</span>
              </h2>
              <div className='summary_box'>
                <p className='font-inter font-medium text-sm text-gray-700'>
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  )
}

export default Demo