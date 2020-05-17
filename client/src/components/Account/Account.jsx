import React, { useContext } from "react";
import { UserContext } from "../../App";
import AccountSidebar from "./AccountSidebar";
import CommentList from "./CommentList/CommentList";
import PostList from "../Posts/PostList";
import "./Account.scss";
import { Routes } from "../../utils/constants";
import { useState } from "react";

const Account = () => {
  const [route, setRoute] = useState(Routes.Users.userPosts);
  const User = useContext(UserContext);

  if (User.Token) {
    return (
      <div className="account-container">
        <AccountSidebar setRoute={setRoute} />
        <div className="account-content">
          <h2>{User.Username}'s Activity</h2>
          {route === Routes.Users.userPosts && (
            <>
              <h3>Posts</h3>
              <PostList route={route} />
            </>
          )}
          {route === Routes.Users.userComments && (
            <>
              <h3>Comments</h3>
              <CommentList route={route} />
            </>
          )}
          {route === Routes.Users.userLikes && (
            <>
              <h3>Liked Posts</h3>
              <PostList route={route} />
            </>
          )}
          {route === Routes.Users.userDislikes && (
            <>
              <h3>Disliked</h3>
              <PostList route={route} />
            </>
          )}
        </div>
      </div>
    );
  } else {
    return <p>Unauthorized</p>;
  }
};

export default Account;
