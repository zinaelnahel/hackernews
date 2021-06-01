import axios from "axios";
//import "./styles.css";
// import hackernews from "./hackernews";
import Card from "./Card";
import React, { useState, useEffect, useCallback } from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import Pagination from "./Pagination";

// console.log(hackernews);
const userInput = "react";
export default function App() {
  const [news, setNews] = useState([]);

  //const [isFetching, changeFetchStatus] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [filteredNews, setFilteredNews] = useState();
  console.log(filteredNews);
  const [currentPage, setCurrentPage] = useState();
  const [newsPerPage] = useState(4);
  const getNews = useCallback(() => {
    setIsFetching(true);
    axios
      .get(`https://hn.algolia.com/api/v1/search_by_date?query=${userInput}`)
      .then((res) => {
        //res && alert();
        setIsFetching(false);
        const news = res.data.hits;
        setNews(news);
        setFilteredNews([...news]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = news.slice(indexOfFirstNews, indexOfLastNews);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    getNews();
  }, [getNews]);

  useEffect(() => {
    let interval = setInterval(() => getNews(), 5000);
    return () => clearInterval(interval);
  }, [news, getNews]);

  // filter the news data based on the search term
  useEffect(() => {
    let filteredNews = news;
    console.log(searchString.toLowerCase());
    if (searchString && news.length > 0) {
      filteredNews = news.filter(
        (news_item) =>
          news_item.story_title !== null &&
          news_item.story_title
            .toLowerCase()
            .includes(searchString.toLowerCase())
      );
    }

    setFilteredNews(filteredNews);
  }, [searchString, news]);

  return (
    <>
      <div className="row justify-between">
      <div className="App col p-5">
        <p className="fs-2">Hacker News</p>
        <p className="fs-4">by group1</p>
      </div>
      <div className="col align-self-end">
        {isFetching && (
            <div className="col ">
              <Loader
                visible={isFetching}
                type="ThreeDots"
                color="#00BFFF"
                height={80}
                width={80}
              />
            </div>
          )}
      </div>
      </div>
      <form className="row-auto">
        <input
          autoFocus
          type="text"
          name="searchBar"
          id="searchBar"
          placeholder="type your search term"
          size="40"
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
          className="ms-5 border-1"
        />
      </form>

      <div className="Container justify-content-center">
        <div className="row p-5 result">
          

          {currentNews.map((story) => (
            <Card content={story} key={story.objectID} />
          ))}
          <Pagination
            newsPerPage={newsPerPage}
            totalNews={news.length}
            paginate={paginate}
          />
        </div>
      </div>
    </>
  );
}
