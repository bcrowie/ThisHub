import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../App";
import { Posts as Utils } from "../../utils/Posts";
import Login from "../Nav/Login/Login";
import "./NewPost.scss";

const NewPost = () => {
  const [inputs, setInputs] = useState({ Title: null, Body: null });
  const [errors, setErrors] = useState({ Title: " ", Body: " " });
  const User = useContext(UserContext);
  const History = useHistory();

  return (
    <>
      <div className="new-post">
        <div className="form-container">
          <h2>Create a new post</h2>
          <form>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              onChange={(e) => setInputs({ ...inputs, Title: e.target.value })}
            />
            {errors.Title && <p className="error">{errors.Title}</p>}
            <label htmlFor="body">Self text:</label>
            <textarea
              name="body"
              id="body"
              cols="30"
              rows="10"
              onChange={(e) => setInputs({ ...inputs, Body: e.target.value })}
            ></textarea>
            {errors.Body && <p className="error">{errors.Body}</p>}
            <div className="buttons">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  Utils.create(User.Token, inputs, History, setErrors);
                }}
              >
                Submit
              </button>
              <button onClick={() => History.push("/")}>Close</button>
            </div>
          </form>
        </div>
        <div className="side-bar">
          <p>
            Sidebar: Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Soluta ipsam quos ducimus labore, temporibus officia? Reiciendis
            officia quasi, nesciunt exercitationem similique tenetur, vitae
            ipsum ducimus quos officiis dolorem, iste id!
          </p>
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
