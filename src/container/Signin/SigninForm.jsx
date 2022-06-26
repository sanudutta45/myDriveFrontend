import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";

//components
import SigninTextField from "../../components/TextField/SigninTextField/SigninTextField";
import Button from "../../components/Button/Button";

const schema = Yup.object().shape({
  email: Yup.string().required("Username is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const SignupForm = (props) => (
  <Formik
    initialValues={{
      email: "",
      password: "",
    }}
    validationSchema={schema}
    onSubmit={(values) => {
      props.handleSubmit(values);
    }}
  >
    {({ handleSubmit, handleBlur, handleChange, values, errors, touched }) => (
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-0">
          <SigninTextField
            type="text"
            iconClass="fa fa-user"
            name="email"
            value={values.userName}
            placeholder="Username"
            error={errors.email && touched.email ? errors.email : null}
            onChange={handleChange}
            onBlur={(e) => {
              props.focusHandler(e);
              handleBlur(e);
            }}
            onFocus={props.focusHandler}
          />
        </div>
        <div className="form-group mb-3">
          <SigninTextField
            type="Password"
            iconClass="fa fa-lock"
            name="password"
            value={values.password}
            placeholder="Password"
            error={errors.password && touched.password ? errors.password : null}
            onChange={handleChange}
            onBlur={(e) => {
              props.focusHandler(e);
              handleBlur(e);
            }}
            onFocus={props.focusHandler}
          />
        </div>

        <span
          className="pass_lost"
          onClick={() => alert("Sorry we dont have this funtionality")}
        >
          Forget Password?
        </span>

        <Button type="submit" text="Login" isDisable={props.loading} />
      </form>
    )}
  </Formik>
);

export default SignupForm;
