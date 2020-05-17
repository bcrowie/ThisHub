const Validator = require("validator");
const isEmpty = require("./isEmpty");

const validateLogin = (data) => {
  let errors = {};
  data.Email = !isEmpty(data.Email) ? data.Email : "";
  data.Password = !isEmpty(data.Password) ? data.Password : "";

  if (!Validator.isEmail(data.Email)) {
    errors.Email = "Please enter a valid email address";
  }
  if (Validator.isEmpty(data.Email)) {
    errors.Email = "Please enter an email address.";
  }
  if (Validator.isEmpty(data.Password)) {
    errors.Password = "Please enter a password.";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateLogin;
