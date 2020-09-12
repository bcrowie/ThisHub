import React from "react";

const SettingsSidebar = () => {
  return (
    <div className="settings-sidebar">
      <ul>
        <li>
          <a href="#nav">Email</a>
        </li>
        <li>
          <a href="#password">Password</a>
        </li>
        <li>
          <a href="#premium">Premium</a>
        </li>
        <li>
          <a href="#delete">Delete Account</a>
        </li>
      </ul>
    </div>
  );
};

export default SettingsSidebar;
