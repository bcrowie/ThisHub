import React, { useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import { UserContext } from "../../App";
import { Posts as Utils } from "../../utils/Posts";
import NewPostField from "./NewPostField/NewPostField";
import Post from "./Post/Post";
import Sidebar from "./Sidebar/Sidebar";
import "./PostList.scss";

const PostList = (props) => {
  const Location = useLocation();
  const User = useContext(UserContext);
  const [posts, setPosts] = Utils.useFetchPosts(props.route, User);

  if (!posts.length) {
    return (
      <div className="posts">
        <ul className="post-list">
          <NewPostField />
          <li key="0" className="no-post">
            <p className="post-title">
              No posts here! <Link to="/new-post">Create one!</Link>
            </p>
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
              deletePost={() =>
                Utils.delete(User.Token, props.showLogin, setPosts, post, posts)
              }
              like={() =>
                Utils.like(User.Token, props.showLogin, setPosts, post, posts)
              }
              dislike={() =>
                Utils.dislike(
                  User.Token,
                  props.showLogin,
                  setPosts,
                  post,
                  posts
                )
              }
            />
          ))}
        </ul>
        {Location.pathname !== "/my-account" && <Sidebar />}
      </div>
    );
  }
};

export default PostList;
