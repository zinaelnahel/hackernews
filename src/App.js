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
  const [currentPage, setCurrentPage] = useState(1);

  const [newsPerPage] = useState(20);
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState()
  const getNews = useCallback(() => {
    setIsFetching(true);
    setError();
    if(userInput==="")
    {axios
      .get(
        `https://hn.algolia.com/api/v1/search?tags=front_page`
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
        setError(err.message)
      });}else{
        axios
      .get(
        `https://hn.algolia.com/api/v1/search_by_date?query=${userInput}&restrictSearchableAttributes=title&hitsPerPage=100`
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
        setError(err.message);
      });
      }
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

  const handleSubmit = (event) => {
    //alert(event.target.searchBar.value);
    let b = event.target.searchBar.value;
    if (b === "" || b.split(" ").join("") === "") {
      alert("Please enter a valid search term");
    } else {
      setUserInput(b);
      event.preventDefault();
    }
  };

  return (
    <>
      <div className="row justify-between">
        <div className="App col p-5">
          <p className="fs-2 ps-3">Hacker News</p>
          <p className="fs-4 ps-3">by group1</p>
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
        />
        <input type="submit" value="Get News" />
      </form>

      <div className="Container justify-content-center">
        
        <div className="row p-5 result">
          {error && <h5>Ooops...</h5>}
          {!isFetching && currentNews.length === 0 &&<h5>No news match your search</h5> }
          {!isFetching && currentNews.length >=1 && currentNews.map((story,index) => (<Card content={story} key={story.objectID} index={index} />))}
              
          {/* {currentNews.length >= 1 ? (

              currentNews.map((story,index) => (<Card content={story} key={story.objectID} index={index} />)))
              :(<h5>No news match your search</h5>)
          } */}

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
