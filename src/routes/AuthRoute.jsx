import React from "react";
import { Redirect, Route } from "react-router";
import WithAuth from "./WithAuth";

export const AuthComponent = ({ component: Component }) => {
  return (
    <WithAuth>
      {(auth) => {
        return auth.isAuthenticated() ? (
          <Component auth={auth} />
        ) : (
          <Redirect to="/" />
        );
      }}
    </WithAuth>
  );
};

export const AuthRoute = ({ component: Component, ...rest }) => {
  return (
    <WithAuth>
      {(auth) => {
        return auth.isAuthenticated() ? (
          <Route
            {...rest}
            render={(props) => <Component {...props} auth={auth} />}
          />
        ) : (
          <Redirect to="/" />
        );
      }}
    </WithAuth>
  );
};

export const UserRoute = ({ component: Component, ...rest }) => {
  return (
    <WithAuth>
      {(auth) => {
        return (
          <Route
            {...rest}
            render={(props) => <Component {...props} auth={auth} />}
          />
        );
      }}
    </WithAuth>
  );
};

export const SignedInRoute = ({ component: Component, ...rest }) => {
  return (
    <WithAuth>
      {(auth) => {
        return auth.isAuthenticated() ? (
          <Redirect to="/app/dashboard" />
        ) : (
          <Route
            {...rest}
            render={(props) => <Component {...props} auth={auth} />}
          />
        );
      }}
    </WithAuth>
  );
};
