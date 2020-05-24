import React, { useContext, useState } from "react";
import { UserContext } from "../../../../App";
import { Comments as Utils } from "../../../../utils/Comments";
import "./CommentForm.scss";

const CommentForm = (props) => {
  const [Input, setInput] = useState();
  const [error, setError] = useState();
  const User = useContext(UserContext);

  const Args = {
    Comments: props.comments,
    Input,
    Post: props.post,
    setComments: props.setComments,
    setError,
    showForm: props.showForm,
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
            Utils.create(Args);
          }}
        >
          Submit
        </button>
        <button onClick={props.showForm}>Cancel</button>
      </div>
    </div>
  );
};

export default CommentForm;
