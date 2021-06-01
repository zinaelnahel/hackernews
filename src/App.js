import axios from "axios";
//import "./styles.css";
// import hackernews from "./hackernews";
import Card from "./Card";
import React, { useState, useEffect, useCallback } from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import Pagination from "./Pagination";

// console.log(hackernews);
// const userInput = "react";
export default function App() {
  const [news, setNews] = useState([]);

  //const [isFetching, changeFetchStatus] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  // const [searchString, setSearchString] = useState("");
  // const [filteredNews, setFilteredNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [newsPerPage] = useState(10);
  const [userInput, setUserInput] = useState("");
  const getNews = useCallback(() => {
    setIsFetching(true);
    axios
      .get(
        `https://hn.algolia.com/api/v1/search_by_date?query=${userInput}&restrictSearchableAttributes=title`
      )
      .then((res) => {
        //res && alert();
        setIsFetching(false);
        const news = res.data.hits;
        setNews(news);
        //setFilteredNews([...news]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userInput]);
  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = news.slice(indexOfFirstNews, indexOfLastNews);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    getNews();
  }, [getNews]);

  useEffect(() => {
    let interval = setInterval(() => getNews(), 30000);
    return () => clearInterval(interval);
  }, [news, getNews]);

  console.log(news);

  // filter the news data based on the search term
  // useEffect(() => {
  //   let filteredNews = news;
  //   console.log(searchString.toLowerCase());
  //   if (searchString && news.length > 0) {
  //     filteredNews = news.filter(
  //       (news_item) =>
  //         news_item.story_title !== null &&
  //         news_item.story_title
  //           .toLowerCase()
  //           .includes(searchString.toLowerCase())
  //     );
  //   }

  //   setFilteredNews(filteredNews);
  // }, [searchString, news]);

  const handleSubmit = (event) => {
    //alert(event.target.searchBar.value);
    setUserInput(event.target.searchBar.value);
    event.preventDefault();
  };

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
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="searchBar"
          id="searchBar"
          placeholder="type your search term"
          style={{ marginLeft: 50 }}
          size="40"
          defaultValue={userInput}
          //onChange={(e) => {setUserInput(e.target.value)}}
          // value={searchString}
          // onChange={(e) => setSearchString(e.target.value)}
        />
        <input type="submit" value="Get News" />
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
