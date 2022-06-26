import React from "react";

import {Router ,Route,Switch,Redirect} from "react-router-dom";
import Auth from "../service/Auth";

import Page404 from "./Page404";
import AppRoute from "./AppRoute";
import {AuthProvider} from "./AuthProvider";
import {SignedInRoute,UserRoute} from "./AuthRoute";

import history from "./history";

// auth components
import Signin from "../container/Signin";

import Signup from "../container/Signup";

const authService = new Auth();

const Root = () => {
    return(
        <AuthProvider service={authService}>
            <Router history={history}>
                <Switch>
                    <SignedInRoute exact path="/" component={Signin}/>
                    <UserRoute exact path="/signup" component={Signup}/>

                    {/* app route */}
                    <Route path="/app" component={AppRoute}/>
                    {/* 404 */}
                    <Route exact path="/404" component={Page404}/>
                    <Route path="*" render={()=><Redirect to="/404"/>}/>
                </Switch>
            </Router>

        </AuthProvider>
    )
}

export default Root;