import React, { useContext } from "react";
import moment from "moment";
import { Constants } from "../../../../utils/constants";
import { UserContext } from "../../../../App";
import { Comments as Utils } from "../../../../utils/Comments";
import "./Comment.scss";

const Comment = (props) => {
  const User = useContext(UserContext);

  return (
    <li key={props.comment.id}>
      <div className="controls">
        <button className="mdi mdi-arrow-up-thick like-comment"></button>
        <p>{props.comment.Score}</p>
        <button className="mdi mdi-arrow-down-thick dislike-comment"></button>
      </div>
      <div className="comment-content">
        <pre>
          {props.comment.IsDeleted
            ? Constants.Comments.deleted
            : props.comment.Body}
        </pre>
        <p>
          {moment(props.comment.createdAt).fromNow()} by:{" "}
          {props.comment.IsDeleted
            ? Constants.Comments.deleted
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
                    props.post.id,
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
