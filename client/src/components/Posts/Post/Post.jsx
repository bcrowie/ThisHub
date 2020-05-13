import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { UserContext } from "../../../App";
import { useEffect } from "react";

const Post = (props) => {
  const [showMenu, setShowMenu] = useState();
  const User = useContext(UserContext);

  useEffect(() => {
    window.addEventListener("click", (e) => {
      e.stopPropagation();
      if (e.target.className !== "post-menu" && showMenu) {
        setShowMenu(!showMenu);
      }
    });
  }, [showMenu]);

  const togglePostMenu = (e) => {
    e.stopPropagation();
    setShowMenu((showMenu) => !showMenu);
  };

  return (
    <li
      className={`${User.Username === props.data.Username && "owner"}`}
      key={props.data.id}
    >
      <Link to={`/posts/${props.data.id}`} className="post-title">
        {props.data.Title}
      </Link>
      <div className="post-info">
        <p>by: {props.data.Username}</p>
        <p>{moment(props.data.createdAt).fromNow()}</p>
      </div>
      <div className="post-controls">
        <div>
          <p className="likes"> {props.data.Score} Likes</p>
          <button
            className="mdi mdi-arrow-up-thick like-post"
            onClick={props.like}
          ></button>
          <button
            className="mdi mdi-arrow-down-thick dislike-post"
            onClick={props.dislike}
          ></button>
          <Link to={`/posts/${props.data.id}`} className="comments">
            Comments
          </Link>
        </div>
        <div>
          <button
            className="mdi mdi-dots-vertical menu-button"
            onClick={(e) => togglePostMenu(e)}
          ></button>
          {showMenu && (
            <div className="post-menu-container">
              <div className="post-menu">
                <Link>View Profile</Link>
                <Link>Report</Link>
                {props.data.Username === User.Username && (
                  <Link onClick={props.delete}>Delete Post</Link>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </li>
  );
};

export default Post;
