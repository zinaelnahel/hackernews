import React from "react";

const Card = (props) => {
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
   
  return (
    <div className="cardContainer col-6 ">

      <div className="border-2 border rounded-3 p-3 mb-4">

        <div className="title">

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

        </div>

        <div className="time">
          <div class="text-success text-end">{displayedTime} ago</div>
        </div>

      </div>

    </div>
  );
};

export default Card;
