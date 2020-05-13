import React, { useContext } from "react";
import { UserContext } from "../../App";
import { Posts as Utils } from "../../utils/Posts";
import Post from "./Post/Post";
import "./PostList.scss";

const PostList = (props) => {
  const [posts, setPosts] = Utils.useFetchPosts();
  const User = useContext(UserContext);

  if (!posts.length) {
    return (
      <div>
        <ul className="post-list">
          <li key="0">
            <p className="post-title">No posts here!</p>
          </li>
        </ul>
      </div>
    );
  } else {
    return (
      <div>
        <ul className="post-list">
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
      </div>
    );
  }
};

export default PostList;
