import { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Constants } from "../utils/constants";

export const Users = {
  useAuthentication: () => {
    const [auth, setAuth] = useState({ Username: null, Token: null });

    useEffect(() => {
      const Token = localStorage.getItem(Constants.Users.Storage.Token);
      const Username = localStorage.getItem(Constants.Users.Storage.User);

      const fetchAuth = async () => {
        const response = await axios.post(
          `${Routes.Users.auth}`,
          { Username },
          {
            headers: { Authorization: Token },
          }
        );

        if (response) {
          setAuth({ Username: response.data.Username, Token });
        }
      };

      if (Token && Username) {
        fetchAuth();
      }
    }, []);
    return auth;
  },
  login: async (event, data, setErrors, History) => {
    if (event) {
      event.preventDefault();
    }

    let { Email, Password } = data;
    Email = Email || "";
    Password = Password || "";

    await axios
      .post(`${Routes.Users.login}`, {
        Email,
        Password,
      })
      .then((res) => {
        localStorage.setItem(Constants.Users.Storage.Token, res.data.token);
        localStorage.setItem(Constants.Users.Storage.User, res.data.Username);
        window.location.reload();
      })
      .catch((err) => {
        const { Email, Password } = err.response.data;
        setErrors({ Email, Password });
      });
  },
  logout: () => {
    localStorage.removeItem("thishub.token");
    localStorage.removeItem("thishub.user");
    window.location.reload();
  },
  register: async (event, data, setErrors, History) => {
    event.preventDefault();
    let { Username, Email, Email2, Password, Password2 } = data;
    Username = Username || "";
    Email = Email || "";
    Email2 = Email2 || "";
    Password = Password || "";
    Password2 = Password2 || "";
    await axios
      .post(`${Routes.Users.register}`, {
        Username,
        Email,
        Email2,
        Password,
        Password2,
      })
      .then(async () => {
        History.push("/");
      })
      .catch((err) => {
        const {
          Username,
          Email,
          Email2,
          Password,
          Password2,
        } = err.response.data;
        setErrors({ Username, Email, Email2, Password, Password2 });
      });
  },
  updateEmail: async (event, setErrors, inputs, User) => {
    event.preventDefault();

    await axios
      .post(Routes.Users.updateEmail, inputs, {
        headers: { Authorization: User.Token },
      })
      .then((res) => {
        // alert email change confirmation
      })
      .catch((err) => {
        const { Email, Email2 } = err.response.data;
        setErrors({ Email, Email2 });
      });
  },
  updatePassword: async (event, setErrors, inputs, User) => {
    event.preventDefault();

    await axios
      .post(Routes.Users.updatePassword, inputs, {
        headers: { Authorization: User.Token },
      })
      .then((res) => {
        // alert password change confirmation
      })
      .catch((err) => {
        const { Match, Password, Password2 } = err.response.data;
        setErrors({ Match, Password, Password2 });
      });
  },
  deleteAccount: async (event, setErrors, inputs, User) => {
    event.preventDefault();

    await axios
      .delete(Routes.Users.myAccount, {
        headers: { Authorization: User.Token },
        data: {
          Email: inputs.Email,
          Password: inputs.Password,
        },
      })
      .then((res) => {
        // redirect to root
      })
      .catch((err) => {
        const { Match, Email, Password } = err.response.data;
        setErrors({ Match, Email, Password });
      });
  },
  // Implement Authorized Fetch when adding frontend functionality.
};
