import React, { useContext, useState } from "react";
import { UserContext, LoginContext } from "../../../../App";
import { Comments as CommentUtils } from "../../../../utils/Comments";
import { userLoggedIn } from "../../../../utils/Utils";
import "./CommentForm.scss";

const CommentForm = ({ comments, post, setComments, showForm }) => {
  const { showLogin, setShowLogin } = useContext(LoginContext);
  const [input, setInput] = useState();
  const [error, setError] = useState();
  const User = useContext(UserContext);

  const params = {
    User,
    input,
    post,
  };

  const handleCreate = async () => {
    if (userLoggedIn(User)) {
      if (!input) {
        setError("Comment must contain atleast 1 character");
      } else {
        const newComment = await CommentUtils.create(params);
        newComment.Score = 1;
        const newComments = comments.unshift(newComment);
        setComments(newComments);
        showForm();
      }
    } else {
      setShowLogin(!showLogin);
    }
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
        <button onClick={handleCreate}>Submit</button>
        <button onClick={showForm}>Cancel</button>
      </div>
    </div>
  );
};

export default CommentForm;
