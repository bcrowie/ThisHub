import React from "react";
import AccountSidebar from "./Sidebar/SettingsSidebar";
import EmailForm from "./SettingsForms/Email";
import PasswordForm from "./SettingsForms/Password";
import PremiumForm from "./SettingsForms/Premium";
import DeleteAccount from "./SettingsForms/DeleteAccount";
import "./Settings.scss";

const Settings = (props) => {
  return (
    <div className="account-container">
      <AccountSidebar />
      <div className="account-settings">
        <h2>My Account</h2>
        <EmailForm />
        <PasswordForm />
        <PremiumForm />
        <DeleteAccount />
      </div>
    </div>
  );
};

export default Settings;
