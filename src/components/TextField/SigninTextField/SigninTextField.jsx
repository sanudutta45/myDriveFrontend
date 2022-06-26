import React, { Fragment } from "react";
import PropTypes from "prop-types";
import "./SigninTextField.scss";

const SigninTextField = ({
  name,
  value,
  type,
  onBlur,
  onFocus,
  onChange,
  placeholder,
  iconClass,
  autofocus = false,
  isDisable,
  error,
  maxLength,
}) => (
  <Fragment>
    <section id="signin_text_field">
      <div className="wrapper">
        <div className="icon_wrapper">
          <i className={iconClass} />
        </div>
        <div className="iput_wrapper">
          <h5>{placeholder}</h5>
          <input
            className={`ss_input ${error ? "is-invalid" : ""}`}
            type={type || "text"}
            name={name}
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        </div>
      </div>
      {error && <div className="ss_error text-danger">{error}</div>}
    </section>
  </Fragment>
);

SigninTextField.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default SigninTextField;

// Ex: how to use
// <TextField
//   type="text"
//   value={amount}
//   name="amount"
//   onChange={this.handleInputChange}
// />
