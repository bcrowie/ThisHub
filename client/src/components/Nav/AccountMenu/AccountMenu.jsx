import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "@mdi/react";
import {
  mdiAccount,
  mdiAccountDetails,
  mdiChessKing,
  mdiCogs,
  mdiHome,
  mdiLogout,
} from "@mdi/js";
import { UserContext } from "../../../App";
import { Utils } from "../../../utils/utils";
import "./AccountMenu.scss";

const AccountMenu = () => {
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const User = useContext(UserContext);

  useEffect(() => {
    window.addEventListener("click", (e) => {
      e.stopPropagation();
      if (e.target.className !== "account-menu" && showAccountMenu) {
        setShowAccountMenu(!showAccountMenu);
      }
    });
  }, [showAccountMenu]);

  const toggleAccountMenu = (e) => {
    e.stopPropagation();
    setShowAccountMenu((showAccountMenu) => !showAccountMenu);
  };

  return (
    <div className="account-menu">
      <ul>
        <li>
          <Link
            className={`account-menu-link ${showAccountMenu && "link-active"}`}
            onClick={(e) => toggleAccountMenu(e)}
          >
            {User.Username}
            <Icon path={mdiAccount} title="Account menu" size={0.8} />
          </Link>
        </li>
        {showAccountMenu && (
          <>
            <li>
              <Link
                to="/"
                className={`account-menu-link ${
                  showAccountMenu && "link-active"
                }`}
              >
                Home
                <Icon path={mdiHome} title="Home" size={0.8} />
              </Link>
            </li>
            <li>
              <Link
                to="/my-account"
                className={`account-menu-link ${
                  showAccountMenu && "link-active"
                }`}
              >
                Account
                <Icon
                  path={mdiAccountDetails}
                  title="Account Details"
                  size={0.8}
                />
              </Link>
            </li>
            <li>
              <Link
                to="/my-account"
                className={`account-menu-link ${
                  showAccountMenu && "link-active"
                }`}
              >
                Settings
                <Icon path={mdiCogs} title="Account Settings" size={0.8} />
              </Link>
            </li>
            <li>
              <Link
                to="/premium"
                className={`account-menu-link ${
                  showAccountMenu && "link-active"
                }`}
              >
                Premium
                <Icon path={mdiChessKing} title="Premium" size={0.8} />
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className={`account-menu-link ${
                  showAccountMenu && "link-active"
                }`}
                onClick={() => Utils.Users.logout()}
              >
                Logout
                <Icon path={mdiLogout} title="logout" size={0.8} />
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default AccountMenu;
