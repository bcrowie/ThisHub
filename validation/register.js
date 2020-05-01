const Validator = require("validator");
const isEmpty = require("./isEmpty");

const validateRegister = data => {
  let errors = {};

  data.Username = !isEmpty(data.Username) ? data.Username : "";
  data.Email = !isEmpty(data.Email) ? data.Email : "";
  data.Email = !isEmpty(data.Email2) ? data.Email : "";
  data.Password = !isEmpty(data.Password) ? data.Password : "";
  data.Password2 = !isEmpty(data.Password2) ? data.Password2 : "";

  if (!Validator.isLength(data.Username, { min: 5, max: 30 })) {
    errors.Username = "Username must be between 5 and 30 characters.";
  }
  if (Validator.isEmpty(data.Username)) {
    errors.Username = "Username is required.";
  }
  if (Validator.isEmpty(data.Email)) {
    errors.Email = "Email address is required.";
  }
  if (Validator.isEmpty(data.Email2)) {
    errors.Email2 = "Email address is required.";
  }
  if(!Validator.equals(data.Email, data.Email2)) {
    errors.Email2 = "Email addresses do not match."
  }
  if (!Validator.isLength(data.Password, { min: 8, max: 30 })) {
    errors.Password = "Password must be between 8 and 30 characters.";
  }
  if (Validator.isEmpty(data.Password)) {
    errors.Password = "Password is required.";
  }
  if (!Validator.equals(data.Password, data.Password2)) {
    errors.Password2 = "Passwords do not match.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateRegister;
