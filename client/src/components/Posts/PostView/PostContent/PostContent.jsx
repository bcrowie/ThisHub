import React, { useContext, useEffect, useRef, useState } from "react";
import moment from "moment";
import EditForm from "./EditForm/EditForm";
import { LoginContext } from "../../../../App";
import { UserContext } from "../../../../App";
import { Posts as Utils } from "../../../../utils/Posts";
import "./PostContent.scss";

const PostContent = ({ post, showForm }) => {
  const { showLogin, setShowLogin } = useContext(LoginContext);
  const [edited, setEdited] = useState(false);
  const [editing, setEditing] = useState(false);
  const [input, setInput] = useState();
  const [postBody, setPostBody] = useState();
  const editRef = useRef(null);
  const User = useContext(UserContext);

  useEffect(() => {
    setPostBody(post.Body);
    if (edited) {
      setPostBody(() => input);
    }

    if (editing) {
      editRef.current.focus();
      editRef.current.select();
    }
  }, [edited, editing, input, post.Body]);

  const submitEdit = (data) => {
    post.Body = data;
    setInput(data);
    setEditing(false);
    setEdited(true);
    Utils.edit(User, { post, data });
  };

  return (
    <div className="post-main">
      <div className="post-controls">
        <button
          className="mdi mdi-arrow-up-thick like-post"
          onClick={() => setShowLogin((showLogin) => !showLogin)}
        ></button>
        <p className="score">{post.Score}</p>
        <button
          className="mdi mdi-arrow-down-thick dislike-post"
          onClick={() => setShowLogin((showLogin) => !showLogin)}
        ></button>
      </div>
      <div className="post-content">
        <h3>{post.Title}</h3>
        <p className="moment">
          {moment(post.createdAt).fromNow()} by {post.Username}
        </p>
        {editing ? (
          <EditForm
            editRef={editRef}
            submitEdit={submitEdit}
            input={input}
            postBody={postBody}
            setEditing={setEditing}
            setInput={setInput}
          />
        ) : (
          <p className="body">{postBody}</p>
        )}
        <div>
          <button
            onClick={
              User.Username ? showForm : () => setShowLogin(() => !showLogin)
            }
          >
            Reply
          </button>
          {User.Username === post.Username && (
            <button
              onClick={() => setEditing(!editing)}
              title={post.Title}
              body={post.Body}
            >
              Edit
            </button>
          )}
          {User.Username === post.Username && <button>Delete</button>}
        </div>
      </div>
    </div>
  );
};

export default PostContent;
