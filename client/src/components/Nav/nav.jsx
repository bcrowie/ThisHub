import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LoginContext, UserContext } from "../../App";
import AccountMenu from "./account_menu";
import "./Styles/nav.scss";

const Nav = () => {
  const User = useContext(UserContext);
  const { showLogin, setShowLogin } = useContext(LoginContext);

  return (
    <nav>
      <div id="nav" className="main-nav">
        <div className="nav-buttons">
          <Link id="logo" to="/">
            ThisHub
          </Link>
        </div>
        <div className="nav-buttons account">
          {User.Username ? (
            <AccountMenu />
          ) : (
            <>
              <Link className="register" to="/register">
                Register
              </Link>
              <Link
                className="account-link"
                onClick={() => setShowLogin((showLogin) => !showLogin)}
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
