import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../../App";

const EditForm = ({ editRef, postBody, setEditing, submitEdit }) => {
  const User = useContext(UserContext);
  const [input, setInput] = useState();
  const [error, setError] = useState();

  return (
    <div className="edit-form">
      <textarea
        ref={editRef}
        name="edit"
        id="edit-post"
        cols="30"
        rows="10"
        onChange={(e) => setInput(e.target.value)}
      >
        {postBody}
      </textarea>
      {error && <p className="error">{error}</p>}
      <div>
        <button
          onClick={() => {
            if (!input) {
              setError("Post body cannot be empty.");
            } else {
              submitEdit(input);
            }
          }}
        >
          Submit
        </button>
        <button onClick={() => setEditing(false)}>Cancel</button>
      </div>
    </div>
  );
};

export default EditForm;
