import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import AccountMenu from "./AccountMenu/AccountMenu";
import "./Nav.scss";

const Nav = (props) => {
  const User = useContext(UserContext);

  return (
    <nav>
      <div id="nav" className="main-nav">
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
              <Link className="account-link" onClick={props.toggleModal}>
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
