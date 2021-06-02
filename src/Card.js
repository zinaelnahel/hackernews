import React from "react";


const Card = (props) => {
console.log(props);
const url = new URL(props.content.url)
//  function truncate(str, n){ //shorten the url
//   return (str.length > n) ? str.substr(0, n-1) + ' ...' : str;
// };
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
displayedTime = `${Math.floor((Date.now()/1000-props.content.created_at_i)/86400)} day `
}else{
  displayedTime = `${Math.floor((Date.now()/1000-props.content.created_at_i)/86400)} days `
}
  return (
    <div className="cardContainer col-md-12 col-xl-6 col-sm-12">
      <div className="border-2 border rounded-3 p-2 mb-4 shadow">
        <div className="title">
          <div className="titleAndSource">
            <div className="row justify-content-between align-items-end p-2">
            <a class="col-auto" href={props.content.url} role="button" rel="noopener noreferrer" style={{textDecoration:"none", color:"black" }}><b>{props.index +1}.</b> {props.content.title}</a>
            <p className="fs-6 col-auto align-baseline text-secondary border  m-2">- {props.content.author}</p>
            </div>
            
            <a className="url text-wrap btn btn-light text-black-50 m-1 "  href={`${props.content.url}`} target="_blank" rel="noreferrer noopener">{url &&url.hostname}</a>
          </div>
        </div>
        <div className="time row">
          <div className="col points">
          {props.content.points} points
          </div>
          <div className="col text-success text-end">{displayedTime} ago</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
