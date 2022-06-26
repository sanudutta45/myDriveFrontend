import React, { useState } from "react";
import { Link } from "react-router-dom";

//form
import SignUpForm from "./SignupForm";

//action
import { signupUser } from "../../actions/authAction";

//scss
import "./Signup.scss";

//compoonents
import SignUpHeader from "../../components/Header/SignUpHeader";
function Index(props) {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const { history } = props;

  const handleSubmit = async (values) => {
    try {
      setServerError("");
      setLoading(true);
      const res = await signupUser(values);
      setLoading(false);
      props.auth.setToken(res);
      history.push("/app/dashboard");
    } catch (error) {
      setServerError(error.message);
      setLoading(false);
    }
  };

  return (
    <section id="signup">
      <div className="container-fluid h-100">
        <div className="row h-25">
          <div className="col-md-12">
            <SignUpHeader />
          </div>
        </div>
        <div className="row h-50 justify-content-center align-items-center">
          <div className="col-md-4 m-4">
            <SignUpForm handleSubmit={handleSubmit} loading={loading} />
            <div className="text-center">
              Already Registered?{"  "}
              <Link to="/" className="login_popup">
                Login Here
              </Link>
            </div>
            {serverError && (
              <div className="text-center text-danger">{serverError}</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
export default Index;
