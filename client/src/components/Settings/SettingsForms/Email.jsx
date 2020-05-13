import React, { useContext, useState } from "react";
import { UserContext } from "../../../App";
import { Users as Utils } from "../../../utils/Users";

const EmailForm = (props) => {
  const [errors, setErrors] = useState({ Email: null, Email2: null });
  const [inputs, setInputs] = useState({});
  const User = useContext(UserContext);

  return (
    <div id="email">
      <h3>Email</h3>
      <form action="change">
        <label htmlFor="Email">New Email:</label>
        <input
          type="text"
          onChange={(e) => setInputs({ ...inputs, Email: e.target.value })}
        />
        {errors.Email && <p className="errors">{errors.Email}</p>}
        <label htmlFor="Email">Confirm New Email:</label>
        <input
          type="text"
          onChange={(e) => setInputs({ ...inputs, Email2: e.target.value })}
        />
        {errors.Email2 && <p className="errors">{errors.Email2}</p>}
        <button onClick={(e) => Utils.updateEmail(e, setErrors, inputs, User)}>
          Change Email
        </button>
      </form>
    </div>
  );
};

export default EmailForm;
