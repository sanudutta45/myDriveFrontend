import React, { Fragment } from "react";
import DashedBoard from "../container/Dashboard/DashedBoard";
import Profile from "../container/Profile";
import About from "../container/About";
import NavigationHeader from "../components/NavigationHeader/NavigationHeader";
import {
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { AuthRoute, AuthComponent } from "./AuthRoute";


function AppRoute(props) {
  const {match} = props;
  return (
    <Fragment>
        <AuthComponent component={NavigationHeader}/>

      <Switch>
        <AuthRoute exact path={`${match.url}/dashboard`} component={DashedBoard} />
        <AuthRoute exact path={`${match.url}/dashboard/folder/:folderId`} component={DashedBoard}/>
        <AuthRoute exact path={`${match.url}/profile`} component={Profile} />
        <AuthRoute exact path={`${match.url}/about`} component={About} />
        <Route path="*" render={() => <Redirect to="/404" />} />
      </Switch>
      </Fragment>
  );
}

export default AppRoute;
