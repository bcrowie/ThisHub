import React, { useEffect, useState } from "react";
import axios from "axios";
import Comment from "./Comment/Comment";
import PostContent from "./PostContent/PostContent";
import "./PostView.scss";
import CommentForm from "./CommentForm/CommentForm";
import EditForm from "../EditForm/EditForm";
import GoBack from "../../goBack";

const PostView = ({ match }) => {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const {
    params: { postId },
  } = match;

  useEffect(() => {
    (async () => {
      await axios.get(`/posts/${postId}/comments`).then((res) => {
        setPost(res.data.Post);
        setComments(res.data.Comments);
      });
    })();
  }, [postId, comments, setPost]);

  return (
    <div className="post-container">
      <GoBack />
      <PostContent
        post={post}
        setPost={setPost}
        showForm={() => setShowCommentForm(true)}
      />
      {showCommentForm && (
        <CommentForm
          showForm={() => setShowCommentForm(false)}
          post={post}
          comments={comments}
          setComments={setComments}
        />
      )}
      {showEdit && <EditForm showEdit={() => setShowEdit(!showEdit)} />}
      <p className="comments">Comments:</p>
      <ul className="comments-list">
        {comments.length > 0 ? (
          comments.map((comment) => {
            return (
              <Comment
                comment={comment}
                comments={comments}
                post={post}
                setComments={setComments}
              />
            );
          })
        ) : (
          <li key={0}>
            <p style={{ margin: "2rem 0 2rem 2.8rem" }}>
              There are no comments...
            </p>
          </li>
        )}
      </ul>
    </div>
  );
};

export default PostView;
