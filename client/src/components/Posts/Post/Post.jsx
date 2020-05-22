import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import Icon from "@mdi/react";
import { mdiMicrophoneVariant } from "@mdi/js";
import { UserContext } from "../../../App";
import { useEffect } from "react";

const Post = (props) => {
  const [showMenu, setShowMenu] = useState();
  const User = useContext(UserContext);
  const [owner] = useState(User.Username === props.data.Username);

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
    <li className={`${owner && "owner"}`} key={props.data.id}>
      <Link to={`/posts/${props.data.id}`} className="post-title">
        {owner && (
          <Icon path={mdiMicrophoneVariant} title="Account menu" size={0.8} />
        )}
        {props.data.Title}
      </Link>
      <div className="post-info">
        <p>by: {props.data.Username}</p>
        <p>{moment(props.data.createdAt).fromNow()}</p>
      </div>
      <div className="post-controls">
        <div>
          <p
            className={`likes ${
              (props.data.PostLikes.length && "liked") ||
              (props.data.PostDislikes.length && "disliked")
            }`}
          >
            {" "}
            {props.data.Score} Likes
          </p>
          <button
            className={`mdi mdi-arrow-up-thick like-post ${
              props.data.PostLikes.length > 0 && "liked"
            }`}
            onClick={props.like}
          ></button>
          <button
            className={`mdi mdi-arrow-down-thick dislike-post ${
              props.data.PostDislikes.length > 0 && "disliked"
            }`}
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
