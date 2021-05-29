import React from "react";

const Card = (props) => {
 // console.log(props.content);
  return (
    <div className="cardContainer">
      <div className="card">
        <div className="title">
          <div className="rank">
            <h4>{props.content.points}</h4>
          </div>
          <div className="titleAndSource">
            <h5>
              {props.content.story_title} - {props.content.author}
            </h5>
            <h6>
              <a href={props.content.url}>{props.content.story_url}</a>
            </h6>
          </div>
        </div>
        <div className="time">
          <div>{props.content.created_at}</div>
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
