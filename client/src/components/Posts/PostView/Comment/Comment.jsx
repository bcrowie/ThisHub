import React, { useContext, useEffect, useRef, useState } from "react";
import Author from "./Author";
import Controls from "./Controls";
import Edit from "./Edit";
import { Constants } from "../../../../utils/constants";
import { UserContext } from "../../../../App";
import { Comments as Utils } from "../../../../utils/Comments";
import "./Comment.scss";

const Comment = ({ comment, post }) => {
  const User = useContext(UserContext);
  const editRef = useRef(null);
  const [commentBody, setCommentBody] = useState();
  const [editing, setEditing] = useState(false);
  const [edited, setEdited] = useState(false);
  const [input, setInput] = useState();
  const [deleted, setDeleted] = useState(false);
  let { createdAt, id, Score, IsDeleted, Body, Username } = comment;
  const params = {
    comment,
    post,
    User,
    input,
  };

  useEffect(() => {
    setCommentBody(Body);
    if (edited) {
      setCommentBody(() => input);
    }

    if (editing) {
      editRef.current.focus();
      editRef.current.select();
    }

    if (IsDeleted) {
      setDeleted(true);
    }
  }, [deleted, editing, IsDeleted]);

  const handleEdit = () => {
    Body = input;
    setEditing(() => !editing);
    setEdited(true);
    Utils.edit(params);
  };

  const handleDelete = () => {
    setDeleted(true);
    Utils.delete(params);
  };

  return (
    <>
      <li className="comment-item" key={id}>
        <div className="votes">
          <button
            className="mdi mdi-arrow-up-thick like-post"
            onClick={() => Utils.like(params)}
          ></button>
          <p className="score">{Score}</p>
          <button
            className="mdi mdi-arrow-down-thick dislike-post"
            onClick={() => Utils.dislike(params)}
          ></button>
        </div>
        <div className="comment-content">
          <Author
            createdAt={createdAt}
            IsDeleted={deleted}
            Score={Score}
            Username={Username}
          />
          {editing ? (
            <Edit
              commentBody={commentBody}
              editRef={editRef}
              editing={editing}
              handleEdit={handleEdit}
              setEditing={setEditing}
              setInput={setInput}
            />
          ) : (
            <pre>{deleted ? Constants.Comments.deleted : commentBody}</pre>
          )}
          <Controls
            deleted={deleted}
            editing={editing}
            handleDelete={handleDelete}
            setEditing={setEditing}
            Username={Username}
          />
        </div>
      </li>
    </>
  );
};
export default Comment;
