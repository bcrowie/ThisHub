const Validator = require("validator");
const isEmpty = require("./isEmpty");

const validatePaymentInfo = data => {
  let errors = {};
  Object.entries(data).forEach(key => {
    if (isEmpty(key[1])) data[key][1] = "";
  });
  if (Validator.isEmpty(data.FirstName)) {
    errors.FirstName = "Please enter first name";
  }
  if (Validator.isEmpty(data.LastName)) {
    errors.LastName = "Please enter last name";
  }
  if (Validator.isEmpty(data.StreetNumber)) {
    errors.StreetNumber = "Please enter street number";
  }
  if (Validator.isEmpty(data.StreetName)) {
    errors.StreetName = "Please enter street name";
  }
  if (Validator.isEmpty(data.Zip)) {
    errors.Zip = "Please enter zip code";
  }
  if (Validator.isEmpty(data.City)) {
    errors.City = "Please enter city";
  }
  if (Validator.isEmpty(data.State)) {
    errors.State = "Please enter state";
  }
  if (Validator.isEmpty(data.CardNumber)) {
    errors.CardNumber = "Please enter card number";
  }
  if (Validator.isEmpty(data.Expiration)) {
    errors.Expiration = "Please enter card expiration";
  }
  if (!Validator.isLength(data.Zip, 5)) {
    errors.Zip = "Please enter a valid zip code";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validatePaymentInfo;
