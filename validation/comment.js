const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePostInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : "";

  if (!Validator.isLength(data.text, { min: 1, max: 600 })) {
    errors.comment = "Comment must be between 5 and 600 characters";
  }

  if (Validator.isEmpty(data.text)) {
    errors.comment = "Cannot make an empty comment";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
