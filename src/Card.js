import React from "react";


const Card = (props) => {
<<<<<<< HEAD
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
=======
  // console.log(props.content);

  // dateSec: how long ago in seconds.
  const dateSec = Math.floor(
    Date.now() / 1000 - props.content.created_at_i);

  let displayedTime;
  
  if (dateSec < 60) {
    displayedTime = "< 1min ";
  } else if (dateSec < 120) {
    displayedTime = "1min ";
  } else if (dateSec < 3600) {
    displayedTime = `${Math.floor(
      (Date.now() / 1000 - props.content.created_at_i) / 60
    )} minutes `;
  } else if (dateSec < 7200) {
    displayedTime = `${Math.floor(
      (Date.now() / 1000 - props.content.created_at_i) / 3600
    )} hour `;
  } else if (dateSec < 86400) {
    displayedTime = `${Math.floor(
      (Date.now() / 1000 - props.content.created_at_i) / 3600
    )} hours `;
  } else if (dateSec < 31557600) {
    displayedTime = `${Math.floor(
      (Date.now() / 1000 - props.content.created_at_i) / 86400
    )} days `;
  }
   
>>>>>>> 73297c754496b0a05283698a2af0a50962ff7130
  return (
    <div className="cardContainer col-6 ">

      <div className="border-2 border rounded-3 p-3 mb-4">

        <div className="title">
<<<<<<< HEAD
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
=======

            <div className="titleAndSource">
                  <div class="row justify-content-between align-items-end p-2">
                    <p class="col-auto fs-5">{props.content.title}</p>
                    <p class="fs-6 col-auto align-baseline text-secondary border">
                      by {props.content.author}
                    </p>
                  </div>

                  <a
                    class="btn btn-light text-black-50 m-1 fs-6 "
                    data-bs-toggle="offcanvas"
                    href={props.content.url}
                    role="button"
                    aria-controls="offcanvasExample"
                  >
                    {props.content.story_url}
                  </a>

                  <div className="rank">
                    <h6>Votes : {props.content.points}</h6>
                  </div>

            </div>

>>>>>>> 73297c754496b0a05283698a2af0a50962ff7130
        </div>

        <div className="time">
<<<<<<< HEAD
          <div className="text-success text-end">{displayedTime} ago</div>
        </div>
      </div>
=======
          <div class="text-success text-end">{displayedTime} ago</div>
        </div>

      </div>

>>>>>>> 73297c754496b0a05283698a2af0a50962ff7130
    </div>
  );
};

export default Card;
