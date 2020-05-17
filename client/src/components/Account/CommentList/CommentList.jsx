import React, { useContext } from "react";
import { Comments as Utils } from "../../../utils/Comments";
import { UserContext } from "../../../App";
import { Routes } from "../../../utils/constants";
import Comment from "./Comment/Comment";
import "./CommentList.scss";

const CommentList = (props) => {
  const User = useContext(UserContext);
  const [comments, setComments] = Utils.useFetchComments(
    Routes.Users.userComments,
    User.Token
  );

  return (
    <ul>
      {comments.map((comment) => {
        return (
          <Comment
            comment={comment}
            comments={comments}
            postId={comment.PostId}
            setComments={setComments}
          />
        );
      })}
    </ul>
  );
};

export default CommentList;
