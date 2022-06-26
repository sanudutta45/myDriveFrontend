import React from "react";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";

//components
import TextField from "../../components/TextField/TextField";
import Button from "../../components/Button/Button";

const schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Email is invalid").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const SignupForm = (props) => (
  <Formik
    initialValues={{
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    }}
    validationSchema={schema}
    onSubmit={(values) => {
      props.handleSubmit(values);
    }}
  >
    {({ handleSubmit, handleBlur, handleChange, values, errors, touched }) => (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <TextField
            placeholder="Full name"
            name="name"
            type="text"
            value={values.name}
            onBlur={handleBlur}
            onChange={handleChange}
            error={errors.name && touched.name ? errors.name : null}
          />
        </div>
        <div className="form-group mt-4">
          <TextField
            placeholder="Email"
            name="email"
            type="email"
            value={values.email}
            onBlur={handleBlur}
            onChange={handleChange}
            error={errors.email && touched.email ? errors.email : null}
          />
        </div>

        <div className="form-group mt-4">
          <TextField
            placeholder="Password"
            name="password"
            type="password"
            value={values.password}
            onBlur={handleBlur}
            onChange={handleChange}
            error={errors.password && touched.password ? errors.password : null}
          />
        </div>

        <div className="form-group mt-4">
          <TextField
            placeholder="Confirm password"
            name="confirmPassword"
            type="password"
            value={values.confirmPassword}
            onBlur={handleBlur}
            onChange={handleChange}
            error={
              errors.confirmPassword && touched.confirmPassword
                ? errors.confirmPassword
                : null
            }
          />
        </div>

        <div className="t_and_c_text">
          By clicking Sign Up, you agree to our {" "}
          <Link to="terms_and_condition" target="_blank">
            <span>Terms &amp; Conditions.</span>
          </Link>
        </div>

        <div className="mt-3 mt-5">
          <Button type="submit" text="Sign up" isDisable={props.loading}/>
        </div>
      </form>
    )}
  </Formik>
);

export default SignupForm;
