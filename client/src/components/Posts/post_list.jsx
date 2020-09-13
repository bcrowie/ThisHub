import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext, LoginContext } from "../../App";
import { Posts as PostUtils } from "../../utils/Posts";
import { handleDelete, handleDislike, handleLike } from "./utils";
import NewPostField from "./new_post_field";
import Post from "./post";
import Sidebar from "./sidebar";
import "./Styles/post_list.scss";

const PostList = ({ route }) => {
  const User = useContext(UserContext);
  const { showLogin, setShowLogin } = useContext(LoginContext);
  const [posts, setPosts] = PostUtils.useFetchPosts(route, User);

  const genArgs = (post) => {
    return {
      post,
      posts,
      setPosts,
      showLogin,
      setShowLogin,
      User,
    };
  };

  if (!posts.length) {
    return (
      <div className="posts">
        <ul className="post-list">
          <NewPostField />
          <li key="0" className="no-post">
            <pre className="post-title">
              No posts here! <Link to="/new-post">Create one!</Link>
            </pre>
          </li>
        </ul>
        <Sidebar />
      </div>
    );
  } else {
    return (
      <div className="posts">
        <ul className="post-list">
          <NewPostField />
          {posts.map((post) => (
            <Post
              key={post.id}
              data={post}
              deletePost={() => handleDelete(genArgs(post))}
              like={() => handleLike(genArgs(post))}
              dislike={() => handleDislike(genArgs(post))}
            />
          ))}
        </ul>
        <Sidebar />
      </div>
    );
  }
};

export default PostList;
