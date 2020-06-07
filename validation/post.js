const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePostInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.visitedDate = !isEmpty(data.visitedDate) ? data.visitedDate : "";

  if (!Validator.isLength(data.title, { min: 5, max: 100 })) {
    errors.title = "Post title must be between 5 and 100 characters";
  }

  if (Validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  }

  if (Validator.isEmpty(data.visitDate)) {
    errors.visitDate = "Visited date field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
