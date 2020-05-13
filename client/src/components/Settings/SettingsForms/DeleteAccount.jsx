import React, { useContext, useState } from "react";
import { UserContext } from "../../../App";
import { Utils } from "../../../utils/utils";

const DeleteAccount = (props) => {
  const [errors, setErrors] = useState({ Email: null, Password: null });
  const [inputs, setInputs] = useState({});
  const User = useContext(UserContext);

  return (
    <div id="delete">
      <h3>Delete Account</h3>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae minus
        amet corporis neque sint voluptate facilis vel nam, totam natus.
      </p>
      <form action="change">
        <label htmlFor="Email">Enter Email:</label>
        <input
          type="text"
          onChange={(e) => setInputs({ ...inputs, Email: e.target.value })}
        />
        {errors.Email && <p className="errors">{errors.Email}</p>}
        <label htmlFor="Password">Enter Password:</label>
        <input
          type="password"
          onChange={(e) => setInputs({ ...inputs, Password: e.target.value })}
        />
        {errors.Password && <p className="errors">{errors.Password}</p>}
        <button
          onClick={(e) => Utils.Users.deleteAccount(e, setErrors, inputs, User)}
        >
          Delete Account
        </button>
      </form>
    </div>
  );
};

export default DeleteAccount;
