import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import { Posts as PostUtils } from "../../utils/Posts";
import { Routes } from "../../utils/constants";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import "./Styles/post_history.scss";
import Post from "../Posts/post";

const PostHistory = () => {
  const User = useContext(UserContext);
  const [posts, setPosts] = PostUtils.useFetchPosts(
    Routes.Users.userPosts,
    User
  );

  const deletePost = () => {
    console.log("delete");
  };

  console.log(posts);
  return (
    <ul className="post-list">
      {posts.map((data) => (
        <Post data={data} deletePost={deletePost} />
      ))}
    </ul>
  );
};

export default PostHistory;
