const Validator = require("validator");
const validateEmail = require("./email");
const validatePassword = require("./password");
const isEmpty = require("./isEmpty");

const validateRegister = (data) => {
  let errors = {};
  const emailErrors = validateEmail(data);
  const passwordErrors = validatePassword(data);

  data.Username = !isEmpty(data.Username) ? data.Username : "";
  data.Password = !isEmpty(data.Password) ? data.Password : "";
  data.Password2 = !isEmpty(data.Password2) ? data.Password2 : "";
  emailErrors.Email ? (errors.Email = emailErrors.Email) : undefined;
  emailErrors.Email2 ? (errors.Email2 = emailErrors.Email2) : undefined;
  passwordErrors.Password
    ? (errors.Password = passwordErrors.Password)
    : undefined;
  passwordErrors.Password2
    ? (errors.Password2 = passwordErrors.Password2)
    : undefined;

  if (!Validator.isLength(data.Username, { min: 5, max: 30 })) {
    errors.Username = "Username must be between 5 and 30 characters.";
  }
  if (Validator.isEmpty(data.Username)) {
    errors.Username = "Username is required.";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateRegister;
