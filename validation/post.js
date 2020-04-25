const Validator = require("validator");
const isEmpty = require("./isEmpty");

const validatePost = data => {
  let errors = {};

  data.Title = !isEmpty(data.Title) ? data.Title : "";
  data.Body = !isEmpty(data.Body) ? data.Body : "";

  if (Validator.isEmpty(data.Title)) {
    errors.Title = "Title cannot be empty";
  }
  if (!Validator.isLength(data.Title, { min: 1, max: 160 })) {
    errors.Title = "Title must be between 1 and 160 characters";
  }
  if (Validator.isEmpty(data.Body)) {
    errors.Body = "Post body must not be empty";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validatePost;
