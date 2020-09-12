import React, { useContext } from "react";
import { Comments as Utils } from "../../utils/Comments";
import { UserContext } from "../../App";
import { Routes } from "../../utils/constants";
import Comment from "./comment";
import "./Styles/comment_list.scss";

const CommentList = () => {
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
