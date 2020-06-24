import React, { useContext, useEffect, useRef, useState } from "react";
import Age from "./Age/Age";
import Controls from "./Controls/Controls";
import Edit from "./Edit/Edit";
import Reply from "./Reply/Reply";
import Vote from "./Vote/Vote";
import { Constants } from "../../../../utils/constants";
import { UserContext } from "../../../../App";
import { Comments as Utils } from "../../../../utils/Comments";
import "./Comment.scss";

const Comment = ({ comment, comments, post, setComments }) => {
  const User = useContext(UserContext);
  const editRef = useRef(null);
  const [editing, setEditing] = useState(false);
  const [input, setInput] = useState();
  const [replyOpen, setReplyOpen] = useState(false);
  let { createdAt, id, Score, IsDeleted, Body, Username } = comment;

  useEffect(() => {
    if (editing) {
      editRef.current.focus();
    }
  }, [editing]);

  const handleEdit = () => {
    editRef.current.innerHTML = input;
    setEditing(() => !editing);
  };

  return (
    <li key={id}>
      <Vote Score={Score} />
      <div className="comment-content">
        {editing ? (
          <Edit
            editRef={editRef}
            Body={Body}
            editing={editing}
            setEditing={setEditing}
            handleEdit={handleEdit}
            setInput={setInput}
          />
        ) : (
          <pre>{IsDeleted ? Constants.Comments.deleted : Body}</pre>
        )}
        <Age createdAt={createdAt} IsDeleted={IsDeleted} Username={Username} />
        <div>
          {!IsDeleted && (
            <Controls
              User={User}
              Username={Username}
              setReplyOpen={setReplyOpen}
              replyOpen={replyOpen}
              comment={Comment}
              setEditing={setEditing}
              editing={editing}
              handleDelete={() => {
                Utils.delete(comment, comments, post.id, setComments, User);
              }}
            />
          )}
        </div>
        {replyOpen && (
          <Reply
            handleReply={(replyInput) => {
              console.log(replyInput);
              Utils.reply(User, comment, post, replyInput);
            }}
            input={input}
            setInput={input}
            replyOpen={replyOpen}
            setReplyOpen={setReplyOpen}
          />
        )}
      </div>
    </li>
  );
};
export default Comment;
