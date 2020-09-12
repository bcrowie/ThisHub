import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Users as Utils } from "../../utils/Users";
import { Constants } from "../../utils/constants";
import { useEffect } from "react";
import { useRef } from "react";
import "./Styles/login.scss";

const Login = (props) => {
  const [inputs, setInputs] = useState(Constants.Users.LoginInitial);
  const [errors, setErrors] = useState(Constants.Users.LoginInitial);
  const inputRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();

    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        props.hideModal();
        document.removeEventListener("mousedown", handleOutsideClick);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
  }, [inputRef, modalRef]);

  return (
    <div className="modal-content" ref={modalRef}>
      <h2>Login to Thishub</h2>
      <form className="login-form">
        <label htmlFor="Email">Email:</label>
        <input
          type="text"
          ref={inputRef}
          onChange={(e) => setInputs({ ...inputs, Email: e.target.value })}
        />
        {errors.Email && <p className="error">{errors.Email}</p>}
        <label htmlFor="Password">Password:</label>
        <input
          type="password"
          onChange={(e) => setInputs({ ...inputs, Password: e.target.value })}
        />
        {errors.Password && <p className="error">{errors.Password}</p>}
        <div className="login-buttons">
          <button
            onClick={(e) => {
              e.preventDefault();
              Utils.login(inputs, setErrors);
            }}
          >
            Submit
          </button>
          <button onClick={props.hideModal}>Close</button>
        </div>
      </form>
      <Link className="link" to="/register">
        Register for an account!
      </Link>
    </div>
  );
};

export default Login;
