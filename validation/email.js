const Validator = require("validator");
const isEmpty = require("./isEmpty");

const validateEmail = (data) => {
  let errors = {};

  data.Email = !isEmpty(data.Email) ? data.Email : "";
  data.Email2 = !isEmpty(data.Email2) ? data.Email2 : "";

  if (Validator.isEmpty(data.Email)) {
    errors.Email = "Email address is required.";
  }
  if (Validator.isEmpty(data.Email2)) {
    errors.Email2 = "Email address is required.";
  }
  if (!Validator.equals(data.Email, data.Email2)) {
    errors.Email2 = "Email addresses do not match.";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateEmail;
