import React, { useContext } from "react";
import moment from "moment";
import { CommentConst } from "../../../../utils/constants";
import { UserContext } from "../../../../App";
import { Comments as Utils } from "../../../../utils/Comments";
import "./Comment.scss";

const Comment = (props) => {
  const User = useContext(UserContext);

  const styleLevel = (level) => {
    // Needs more cowbell
    switch (level) {
      case 1:
        return "blue";
      case 2:
        return "red";
      default:
        return "rgb(204, 204, 204)";
    }
  };

  return (
    <li
      key={props.comment.id}
      style={
        props.comment.ParentId && {
          marginLeft: `${props.comment.Level}rem`,
        }
      }
    >
      <div className="controls">
        <button className="mdi mdi-arrow-up-thick like-comment"></button>
        <p>{props.comment.Score}</p>
        <button className="mdi mdi-arrow-down-thick dislike-comment"></button>
      </div>
      <div
        className="comment-content"
        style={{ borderLeft: `1px ${styleLevel(props.comment.Level)} solid` }}
      >
        {props.comment.IsDeleted ? CommentConst.deleted : props.comment.Body}
        <p>
          {moment(props.comment.createdAt).fromNow()} by:{" "}
          {props.comment.IsDeleted
            ? CommentConst.deleted
            : props.comment.Username}
        </p>
        <div>
          <button>Reply</button>
          {User.Username === props.comment.Username && (
            <>
              <button
                onClick={(e) =>
                  Utils.delete(
                    props.comment,
                    props.comments,
                    props.post,
                    props.setComments,
                    User
                  )
                }
              >
                Delete
              </button>
              <button>Edit</button>
            </>
          )}
        </div>
      </div>
    </li>
  );
};
export default Comment;
