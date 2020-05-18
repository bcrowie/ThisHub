import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "../../App";
import { Posts as Utils } from "../../utils/Posts";
import NewPostField from "./NewPostField/NewPostField";
import Post from "./Post/Post";
import Sidebar from "./Sidebar/Sidebar";
import "./PostList.scss";

const PostList = (props) => {
  const Location = useLocation();
  const User = useContext(UserContext);
  const [posts, setPosts] = Utils.useFetchPosts(props.route, User.Token);

  if (!posts.length) {
    return (
      <div className="posts">
        <NewPostField />
        <ul className="post-list">
          <li key="1">
            <p className="post-title">No posts here!</p>
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
              delete={() =>
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
