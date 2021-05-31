import axios from "axios";
//import "./styles.css";
// import hackernews from "./hackernews";
import Card from "./Card";
import React, { useState, useEffect } from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

// console.log(hackernews);
const userInput = "react";
export default function App() {
  const [news, setNews] = useState([]);

  //const [isFetching, changeFetchStatus] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [filteredNews, setFilteredNews] = useState([]);

  useEffect(() => {
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
    let interval = setInterval(() => {
      // setNews([])
      axios
        .get(`https://hn.algolia.com/api/v1/search_by_date?query=${userInput}`)
        .then((res) => {
          //res && alert();
          setNews(res.data.hits);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 500000);

    return () => clearInterval(interval);
  }, []);

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
      <div className="App row p-5">
        <p class="fs-2">Hacker News</p>
        <p class="fs-4">by group1</p>
      </div>

      <form>
        <input
          type="text"
          name="searchBar"
          id="searchBar"
          placeholder="type your search term"
          size="40"
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
        />
      </form>

      <div className="Container">
        <div className="row p-5 result">
          {isFetching && (
            <div className="col justify-content-center">
              <Loader
                visible={isFetching}
                type="ThreeDots"
                color="#00BFFF"
                height={80}
                width={80}
              />
            </div>
          )}

          {filteredNews.map((story) => (
            <Card content={story} key={story.objectID} />
          ))}
        </div>
      </div>
    </>
  );
}
