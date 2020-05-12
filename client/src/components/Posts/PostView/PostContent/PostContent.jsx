import React, { useContext } from "react";
import moment from "moment";
import { LoginContext } from "../../../../App";
import { UserContext } from "../../../../App";
import "./PostContent.scss";

const PostContent = (props) => {
  const { showLogin, setShowLogin } = useContext(LoginContext);
  const User = useContext(UserContext);

  return (
    <div className="post-main">
      <div className="post-controls">
        <button
          className="mdi mdi-arrow-up-thick like-post"
          onClick={() => setShowLogin((showLogin) => !showLogin)}
        ></button>
        <p className="score">{props.post.Score}</p>
        <button
          className="mdi mdi-arrow-down-thick dislike-post"
          onClick={() => setShowLogin((showLogin) => !showLogin)}
        ></button>
      </div>
      <div className="post-content">
        <h3>{props.post.Title}</h3>
        <p>
          {moment(props.post.createdAt).fromNow()} by {props.post.Username}
        </p>
        <pre>{props.post.Body}</pre>
        <div>
          <button
            onClick={
              User.Username
                ? props.showForm
                : () => setShowLogin((showLogin) => !showLogin)
            }
          >
            New Comment
          </button>
          {User.Username === props.post.Username && (
            <button
              onClick={props.showForm}
              title={props.post.Title}
              body={props.post.Body}
            >
              Edit
            </button>
          )}
          {User.Username === props.post.Username && <button>Delete</button>}
        </div>
      </div>
    </div>
  );
};

export default PostContent;
