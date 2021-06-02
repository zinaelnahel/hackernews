import React from "react";


const Card = (props) => {

let url;
if(props.content.url){
url=new URL(props.content.url);
}else{
  url=new URL("https://www.google.com")
}
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
  displayedTime = `${Math.floor((Date.now()/1000-props.content.created_at_i)/172800)} days `
}
  return (
    <div className="cardContainer col-md-12 col-xl-6 col-sm-12">
      <div className="border-2 border rounded-3 p-2 mb-4 shadow">
        <div className="title row">
          <div className="titleAndSource">
            <div className="row align-items-baseline ps-2">
            <a className="col-auto" href={props.content.url} target="_blank" role="button" rel="noopener noreferrer" style={{textDecoration:"none", color:"black" }}><b>{props.index +1}.</b> {props.content.title}</a>
             <a className="col-auto url text-wrap btn btn-light text-black-50 m-1 p-1"  href={`${props.content.url}`} target="_blank" rel="noreferrer noopener">{url.hostname ? url.hostname : props.content.url}</a>
            
            </div>
            
           
          </div>
        </div>
        <div className="time row align-items-baseline ps-2">
          <div className="col-auto points">
          {props.content.points} points
          </div>
          <div className=" col-auto  text-secondary border authors m-2">by {props.content.author}</div>
          <div className=" col-auto  text-secondary  authors m-2">{props.content.num_comments} comments</div>
          <div className="col text-success text-end">{displayedTime} ago</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
