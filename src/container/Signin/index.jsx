import React, { Fragment, useState } from "react";

//actions
import { signinUser } from "../../actions/authAction";

//scss
import "./signin.scss";

import Signin from "./Signin";

const Index = (props) => {
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const { history, match } = props;

  const handleSubmit = async (values) => {
    try {
      setServerError("");
      setLoading(true);
      const res = await signinUser(values);
      setLoading(false);
      props.auth.setToken(res);
      history.push(`${match.url}/dashboard`);
    } catch (error) {
      setServerError(error.message);
      setLoading(false);
    }
  };

  const focusHandler = (event) => {
    event.target.parentNode.parentNode.classList.add("focus");
    if (event.type === "blur") {
      if (event.target.value === "") {
        event.target.parentNode.parentNode.classList.remove("focus");
      }
    }
  };
  return (
    <Fragment>
      <Signin
        focusHandler={focusHandler}
        serverError={serverError}
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </Fragment>
  );
};

export default Index;
