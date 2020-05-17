import React from "react";
import SettingsSidebar from "./Sidebar/SettingsSidebar";
import EmailForm from "./SettingsForms/Email";
import PasswordForm from "./SettingsForms/Password";
import PremiumForm from "./SettingsForms/Premium";
import DeleteAccount from "./SettingsForms/DeleteAccount";
import "./Settings.scss";

const Settings = (props) => {
  return (
    <div className="settings-container">
      <SettingsSidebar />
      <div className="settings">
        <h2>Account Settings</h2>
        <EmailForm />
        <PasswordForm />
        <PremiumForm />
        <DeleteAccount />
      </div>
    </div>
  );
};

export default Settings;
