import React, { useState } from "react";
import "./Styles/edit_form.scss";

const EditForm = ({ setInput, showEdit }) => {
  const [error, setError] = useState();

  return (
    <div className="edit-form">
      <form>
        <label htmlFor="edit">Edit post:</label>
        <textarea
          name="edit"
          id="edit"
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
            if (!e.target.value) {
              setError("Body must not be empty.");
            }
          }}
        >
          Submit
        </button>
        <button onClick={showEdit}>Cancel</button>
      </div>
    </div>
  );
};

export default EditForm;
