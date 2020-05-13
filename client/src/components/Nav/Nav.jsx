import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../../App";
import { UserContext } from "../../App";
import AccountMenu from "./AccountMenu/AccountMenu";
import "./Nav.scss";

const Nav = (props) => {
  const User = useContext(UserContext);
  const { showLogin, setShowLogin } = useContext(LoginContext);

  return (
    <nav>
      <div className="main-nav">
        <div className="nav-buttons">
          <Link id="logo" to="/">
            Thishub
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
