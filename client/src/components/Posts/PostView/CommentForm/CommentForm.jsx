import React, { useContext, useState } from "react";
import { UserContext } from "../../../../App";
import { Comments as Utils } from "../../../../utils/Comments";
import "./CommentForm.scss";

const CommentForm = ({ comments, post, setComments, showForm }) => {
  const [input, setInput] = useState();
  const [error, setError] = useState();
  const User = useContext(UserContext);

  const params = {
    comments,
    input,
    post,
    setComments,
    setError,
    showForm,
    User,
  };

  return (
    <div className="comment-form">
      <form>
        <label htmlFor="comment">Comment:</label>
        <textarea
          name="comment"
          id="comment"
          cols="30"
          rows="10"
          onChange={(e) => setInput(e.target.value)}
        ></textarea>
      </form>
      {error && <p className="error">{error}</p>}
      <div>
        <button
          onClick={(e) => {
            e.preventDefault();
            Utils.create(params);
          }}
        >
          Submit
        </button>
        <button onClick={showForm}>Cancel</button>
      </div>
    </div>
  );
};

export default CommentForm;
