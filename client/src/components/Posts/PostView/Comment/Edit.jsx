import React from "react";

const Edit = (props) => {
  const {
    commentBody,
    editRef,
    editing,
    setEditing,
    handleEdit,
    setInput,
  } = props;

  return (
    <div className="comment-edit">
      <textarea
        ref={editRef}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      >
        {commentBody}
      </textarea>
      <button onClick={handleEdit}>Submit</button>
      <button onClick={() => setEditing(() => !editing)}>Cancel</button>
    </div>
  );
};

export default Edit;
