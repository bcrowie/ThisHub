import React, { useContext, useState } from "react";
import moment from "moment";
import { Constants } from "../../../../utils/constants";
import { UserContext } from "../../../../App";
import { Comments as Utils } from "../../../../utils/Comments";
import "./Comment.scss";

const Comment = ({ comment, comments, post, setComments }) => {
  const User = useContext(UserContext);
  const [replyOpen, setReplyOpen] = useState(false);
  const { createdAt, id, Score, IsDeleted, Body, Username } = comment;

  return (
    <li key={id}>
      <div className="controls">
        <button className="mdi mdi-arrow-up-thick like-comment"></button>
        <p>{Score}</p>
        <button className="mdi mdi-arrow-down-thick dislike-comment"></button>
      </div>
      <div className="comment-content">
        <pre>{IsDeleted ? Constants.Comments.deleted : Body}</pre>
        <p>
          {moment(createdAt).fromNow()} by:{" "}
          {IsDeleted ? Constants.Comments.deleted : Username}
        </p>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              setReplyOpen(() => !replyOpen);
            }}
          >
            Reply
          </button>
          {User.Username === Username && (
            <>
              <button
                onClick={(e) =>
                  Utils.delete(comment, comments, post.id, setComments, User)
                }
              >
                Delete
              </button>
              <button>Edit</button>
            </>
          )}
        </div>
        {replyOpen && (
          <div className="comment-reply">
            <textarea
              name="comment-reply"
              id="comment-reply"
              cols="30"
              rows="10"
            ></textarea>
            <button>Submit</button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setReplyOpen(() => !replyOpen);
              }}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </li>
  );
};
export default Comment;
