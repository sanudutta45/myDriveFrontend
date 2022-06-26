import React, { Fragment } from "react";
import PropTypes from "prop-types";
import "./TextField.css";

const TextField = ({
  name,
  value,
  type,
  onBlur,
  onChange,
  placeholder,
  isDisable,
  error,
  maxLength,
}) => (
  <Fragment>
    <input
      className={`ss_input form-control ${error ? "is-invalid" : ""}`}
      type={type || "text"}
      name={name}
      value={value}
      placeholder={placeholder || ""}
      onBlur={onBlur}
      onChange={onChange}
      disabled={isDisable}
      maxLength={maxLength}
    />
    {error && <span className="invalid-feedback">{error}</span>}
  </Fragment>
);

TextField.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default TextField;

// Ex: how to use
// <TextField
//   type="text"
//   value={amount}
//   name="amount"
//   onChange={this.handleInputChange}
// />
