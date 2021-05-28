import React from "react";

const Card = (props) => {
  console.log(props.content);
  return (
    <div className="cardContainer">
      <div className="card">
        <div className="title">
          <div className="rank">
            <h4>rank</h4>
          </div>
          <div className="titleAndSource">
            <h5>
              {props.content.title} - {props.content.author}
            </h5>
            <h6>
              <a href={props.content.url}>Link</a>
            </h6>
          </div>
        </div>
        <div className="time">
          <div>posted .... {props.content.created_at} ago</div>
          <div>posted on "date"</div>
        </div>
      </div>
      <div className="storyPreview">
        <p>{props.content.story_text}</p>
      </div>
    </div>
  );
};

export default Card;
