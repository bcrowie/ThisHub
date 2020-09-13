import React from "react";
import { Link } from "react-router-dom";
import { Posts as Utils } from "../../utils/Posts";
import { truncateTitle } from "./utils";
import { Routes } from "../../utils/constants";
import "./Styles/sidebar.scss";

const Sidebar = () => {
  const [posts] = Utils.useFetchPosts(Routes.Posts.random);

  return (
    <div className="sidebar">
      <div className="post-sidebar">
        <div className="sidebar-header">
          <p>Today's Top Posts</p>
        </div>
        <ol className="top-posts" type="1">
          {posts.map((post) => (
            <li key={post.id} className="top-posts-items">
              <Link to={`/posts/${post.id}`} className="post-title">
                {truncateTitle(post.Title)}
              </Link>
            </li>
          ))}
        </ol>
      </div>
      <div className="info-sidebar">
        <p>Thishub &copy; 2020. All Rights Reserved</p>
      </div>
    </div>
  );
};

export default Sidebar;
