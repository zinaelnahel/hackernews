import React from "react";


const Card = (props) => {
 // console.log(props.content);
 function truncate(str, n){ //shorten the url
  return (str.length > n) ? str.substr(0, n-1) + ' ...' : str;
};
const howLongAgoInSeconds = Math.floor((Date.now()/1000-props.content.created_at_i));
let displayedTime
if(howLongAgoInSeconds <60){
displayedTime = "< 1min "
}else if(howLongAgoInSeconds <120){
displayedTime = "1min "
}
else if(howLongAgoInSeconds<3600){
  displayedTime = `${Math.floor((Date.now()/1000-props.content.created_at_i)/60)} minutes `
}else if(howLongAgoInSeconds<7200){
displayedTime = `${Math.floor((Date.now()/1000-props.content.created_at_i)/3600)} hour `
}else if(howLongAgoInSeconds<86400){
  displayedTime = `${Math.floor((Date.now()/1000-props.content.created_at_i)/3600)} hours `
}else if(howLongAgoInSeconds<31557600){
displayedTime = `${Math.floor((Date.now()/1000-props.content.created_at_i)/86400)} days `
}
  return (
    <div className="cardContainer col-6 ">
      <div className="border-2 border rounded-3 p-3 mb-4">
        <div className="title">
          <div className="rank">
            <h4>{props.content.points}</h4>
          </div>
          <div className="titleAndSource">
            <div className="row justify-content-between align-items-end p-2">
              <p className="col-auto fs-5">
              {props.content.story_title} 
            </p>
            <p className="fs-6 col-auto align-baseline text-secondary border">- {props.content.author}</p>
            </div>
            <a className="btn btn-light text-black-50 m-1 fs-6 " data-bs-toggle="offcanvas" href={props.content.url} role="button" aria-controls="offcanvasExample">{truncate(`${props.content.story_url}`,25)}</a>
              
            
          </div>
        </div>
        <div className="time">
          <div className="text-success text-end">{displayedTime} ago</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
