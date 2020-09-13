import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../App";
import { handleSubmit } from "./utils";
import { Constants } from "../../utils/constants";
import Login from "../Nav/login";
import "./Styles/new_post.scss";

const NewPost = () => {
  const [inputs, setInputs] = useState({ Title: null, Body: null });
  const [errors, setErrors] = useState({ Title: " ", Body: " " });
  const User = useContext(UserContext);
  const History = useHistory();
  const inputRef = useRef(null);

  const genArgs = (e) => {
    return {
      e,
      inputs,
      History,
      setErrors,
      User,
    };
  };

  useEffect(() => {
    inputRef.current.focus();
  }, [inputRef]);

  return (
    <>
      <div className="new-post">
        <div className="form-container">
          <h2>Create a new post</h2>
          <form>
            <label htmlFor="title">Title:</label>
            <input
              ref={inputRef}
              type="text"
              onChange={(e) => setInputs({ ...inputs, Title: e.target.value })}
            />
            {errors.Title && <p className="error">{errors.Title}</p>}
            <label htmlFor="body">Text:</label>
            <textarea
              name="body"
              id="body"
              cols="30"
              rows="10"
              onChange={(e) => setInputs({ ...inputs, Body: e.target.value })}
            ></textarea>
            {errors.Body && <p className="error">{errors.Body}</p>}
            <div className="buttons">
              <button onClick={(e) => handleSubmit(genArgs(e))}>Submit</button>
              <button onClick={() => History.push("/")}>Close</button>
            </div>
          </form>
        </div>
        <div className="side-bar">
          <div className="sidebar-header">
            <p>Rules:</p>
          </div>
          <div className="rules">{Constants.Posts.rules}</div>
        </div>
      </div>
      {!User.Username && (
        <div className="login-modal">
          <Login hideModal={() => History.push("/")} />
        </div>
      )}
    </>
  );
};

export default NewPost;
