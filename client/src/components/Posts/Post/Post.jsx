import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { UserContext } from "../../../App";
import { useEffect } from "react";
import "./Post.scss";

const Post = ({ key, data, deletePost, like, dislike }) => {
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

  const truncateTitle = (content) => {
    console.log(content.length);
    if (content.length > 300) {
      console.log(content.substring(0, 200));
      return content.substring(0, 300).concat("...");
    } else {
      return content;
    }
  };

  return (
    <li
      className={`post ${User.Username === data.Username && "owner"}`}
      key={data.id}
    >
      <div className="votes">
        <button
          className="mdi mdi-arrow-up-thick like-post"
          onClick={like}
        ></button>
        <p className="likes">{data.Score}</p>
        <button
          className="mdi mdi-arrow-down-thick dislike-post"
          onClick={dislike}
        ></button>
      </div>
      <div className="post-content">
        <div className="post-info">
          <p>
            Posted by: {data.Username} {moment(data.createdAt).fromNow()}
          </p>
        </div>
        <Link to={`/posts/${data.id}`} className="post-title">
          {data.Title}
        </Link>
        <Link to={`/posts/${data.id}`} className="post-preview">
          {truncateTitle(data.Body)}
        </Link>
        <div className="post-links">
          <Link to={`/posts/${data.id}`} className="comments">
            Comments
          </Link>
          <button
            className="mdi mdi-dots-vertical menu-button"
            onClick={(e) => togglePostMenu(e)}
          ></button>
          {showMenu && (
            <div className="post-menu-container">
              <div className="post-menu">
                <Link>View Profile</Link>
                {data.Username === User.Username && (
                  <Link onClick={deletePost}>Delete Post</Link>
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
