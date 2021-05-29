import axios from "axios";
//import "./styles.css";
// import hackernews from "./hackernews";
import Card from "./Card";
import React, { useState, useEffect } from "react";

// console.log(hackernews);
const userInput = "react";
export default function App() {
  const [news, setNews] = useState([]);
  const [isFetching, changeFetchStatus] = useState(false);
  const [update, startUpdate] = useState(false)
  useEffect(() => {
    axios
      .get(`https://hn.algolia.com/api/v1/search_by_date?query=${userInput}`)
      .then((res) => {
        //res && alert();
        setNews(res.data.hits);
      })
      .catch((err) => {
        console.log(err);
      });
    let interval = setInterval(()=> {
      // setNews([])
         axios
      .get(`https://hn.algolia.com/api/v1/search_by_date?query=${userInput}`)
      .then((res) => {
        //res && alert();
        setNews(res.data.hits);
      })
      .catch((err) => {
        console.log(err);
      });},5000);
       
       return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="App">
        <h1>Hacker News</h1>
        <h5>by group1</h5>
      </div>
      <div className="Container">
      <div className="result">
      {news.map((story) => {
        // console.log(story);
        return <Card content={story} key={story.objectID} />;
      })}
      </div>
      </div>
    </>
  );
}

// import BeatLoader from "react-spinners/BeatLoader";
