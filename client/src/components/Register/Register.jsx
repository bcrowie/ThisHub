import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Users as Utils } from "../../utils/Users";
import "./Register.scss";

const Register = (props) => {
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});
  const History = useHistory();

  return (
    <div className="register-modal">
      <div className="modal-content">
        <form>
          <h2>Register for an account</h2>
          <label htmlFor="Username">Username:</label>
          <input
            type="text"
            onChange={(e) => setInputs({ ...inputs, Username: e.target.value })}
          />
          {errors.Username && <p className="error">{errors.Username}</p>}
          <label htmlFor="Email">Email:</label>
          <input
            type="text"
            onChange={(e) => setInputs({ ...inputs, Email: e.target.value })}
          />
          {errors.Email && <p className="error">{errors.Email}</p>}
          <label htmlFor="Email2">Confirm email:</label>
          <input
            type="text"
            onChange={(e) => setInputs({ ...inputs, Email2: e.target.value })}
          />
          {errors.Email2 && <p className="error">{errors.Email2}</p>}
          <label htmlFor="Password">Password:</label>
          <input
            type="password"
            onChange={(e) => setInputs({ ...inputs, Password: e.target.value })}
          />
          {errors.Password && <p className="error">{errors.Password}</p>}
          <label htmlFor="Password2">Confirm password:</label>
          <input
            type="password"
            onChange={(e) =>
              setInputs({ ...inputs, Password2: e.target.value })
            }
          />
          {errors.Password2 && <p className="error">{errors.Password2}</p>}
          <label htmlFor="AWESOMENESS">
            <input type="checkbox" /> I agree to be absolutely awesome!
          </label>
          <div>
            <button
              onClick={(e) => {
                e.preventDefault();
                Utils.register(inputs, setErrors, History);
              }}
            >
              Submit
            </button>
            <button onClick={() => History.push("/")}>Close</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
