import React from "react";
import SettingsSidebar from "./settings_sidebar";
import EmailForm from "./SettingsForms/email";
import PasswordForm from "./SettingsForms/password";
import PremiumForm from "./SettingsForms/premium";
import DeleteAccount from "./SettingsForms/delete_account";
import GoBack from "../go_back";
import "./Styles/settings.scss";

const Settings = () => {
  return (
    <div className="settings-container">
      <GoBack />
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
