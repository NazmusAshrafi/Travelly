import React from "react";
import PropTypes from "prop-types";

// MUI Stuff
import TextField from "@material-ui/core/TextField";

const TextFieldGroup = ({
  name,
  placeholder,
  value,
  label,
  error,
  errortext,
  info,
  type,
  onChange,
  disabled,
  className,
}) => {
  return (
    <TextField
      id="email"
      name={name}
      type={type}
      label={placeholder}
      helperText={errortext}
      error={error}
      className={className}
      value={value}
      onChange={onChange}
      disabled={disabled}
      fullWidth
    />
  );
};

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  errortext: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string,
  className: PropTypes.string,
};

TextFieldGroup.defaultProps = {
  type: "text",
};

export default TextFieldGroup;

{
  /* <TextFieldGroup
              placeholder="Email"
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
              error={errors.email ? true : false}
              errortext={errors.email}
            /> */
}
