import React from "react";
import moment from "moment";
import "./Comment.scss";

const Author = ({ createdAt, IsDeleted, Score, Username }) => {
  return (
    <div className="age">
      <p>
        {IsDeleted ? <p>[Deleted]</p> : <strong>{Username}</strong>} {Score}{" "}
        points · {moment(createdAt).fromNow()}
      </p>
    </div>
  );
};

export default Author;
