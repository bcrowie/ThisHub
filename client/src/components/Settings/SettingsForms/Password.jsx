import React, { useContext, useState } from "react";
import { Utils } from "../../../utils/utils";
import { UserContext } from "../../../App";

const PasswordForm = (props) => {
  const [errors, setErrors] = useState({
    Match: null,
    Password: null,
    Password2: null,
  });
  const [inputs, setInputs] = useState({});
  const User = useContext(UserContext);

  return (
    <div id="password">
      <h3>Password</h3>
      <form action="change">
        <label htmlFor="Email">Old Password:</label>
        <input
          type="password"
          onChange={(e) => setInputs({ ...inputs, Old: e.target.value })}
        />
        {errors.Match && <p className="errors">{errors.Match}</p>}
        <label htmlFor="Email">New Password:</label>
        <input
          type="password"
          onChange={(e) => setInputs({ ...inputs, Password: e.target.value })}
        />
        {errors.Password && <p className="errors">{errors.Password}</p>}
        <label htmlFor="Email">Confirm New Password:</label>
        <input
          type="password"
          onChange={(e) => setInputs({ ...inputs, Password2: e.target.value })}
        />
        {errors.Password2 && <p className="errors">{errors.Password2}</p>}
        <button
          onClick={(e) =>
            Utils.Users.updatePassword(e, setErrors, inputs, User)
          }
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default PasswordForm;
