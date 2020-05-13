import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Users as Utils } from "../../../utils/Users";
import { UserConst } from "../../../utils/constants";
import "./Login.scss";

const Login = (props) => {
  const [inputs, setInputs] = useState(UserConst.LoginDefault);
  const [errors, setErrors] = useState(UserConst.LoginDefault);

  return (
    <div className="modal-content">
      <h2>Login to Thishub</h2>
      <form className="login-form">
        <label htmlFor="Email">Email:</label>
        <input
          type="text"
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
          <button onClick={(e) => Utils.Users.login(e, inputs, setErrors)}>
            Submit
          </button>
          <button onClick={props.hideModal}>Close</button>
        </div>
      </form>
      <Link to="/register">Register for an account!</Link>
    </div>
  );
};

export default Login;
