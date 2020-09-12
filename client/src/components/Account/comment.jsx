import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import { Routes } from "../../utils/constants";
import { Comments as Utils } from "../../utils/Comments";

const Comment = (props) => {
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
    <li className="comment">
      <div>
        <pre>
          <Link to={Routes.Posts.getPostWithId(props.PostId)}>
            {props.comment.Body}
          </Link>
        </pre>
      </div>
      <div className="controls">
        <p>
          {moment(props.comment.createdAt).fromNow()} by{" "}
          {props.comment.Username}
        </p>
        <div>
          <button
            className="mdi mdi-dots-vertical menu-button"
            onClick={(e) => togglePostMenu(e)}
          ></button>
          {showMenu && (
            <div className="comment-menu-container">
              <div className="comment-menu">
                <Link>View Profile</Link>
                <Link>Report</Link>
                {props.comment.Username === User.Username && (
                  <Link
                    onClick={() =>
                      Utils.delete(
                        props.comment,
                        props.comments,
                        props.PostId,
                        props.setComments,
                        User
                      )
                    }
                  >
                    Delete Comment
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </li>
  );
};

export default Comment;
