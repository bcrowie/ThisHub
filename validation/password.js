const Validator = require("validator");
const isEmpty = require("./isEmpty");

const validatePassword = (data) => {
  let errors = {};

  data.Password = !isEmpty(data.Password) ? data.Password : "";
  data.Password2 = !isEmpty(data.Password2) ? data.Password2 : "";

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
    isValid: isEmpty(errors),
  };
};

module.exports = validatePassword;
