import React from "react";
import { Routes } from "../../utils/constants";

const AccountSidebar = (props) => {
  return (
    <div className="account-sidebar">
      <ul>
        <li>
          <button onClick={() => props.setRoute(Routes.Users.userPosts)}>
            Posts
          </button>
        </li>
        <li>
          <button onClick={() => props.setRoute(Routes.Users.userComments)}>
            Comments
          </button>
        </li>
        <li>
          <button onClick={() => props.setRoute(Routes.Users.userLikes)}>
            Likes
          </button>
        </li>
        <li>
          <button onClick={() => props.setRoute(Routes.Users.userDislikes)}>
            Dislikes
          </button>
        </li>
      </ul>
    </div>
  );
};

export default AccountSidebar;
