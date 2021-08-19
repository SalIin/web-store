import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { GoodsPage } from "../../pages/GoodsPage/GoodsPage";
import { SigninPage } from "../../pages/SigninPage/SigninPage";
import { SignupPage } from "../../pages/SignupPage/SignupPage";

import { PrivateRoute } from "../PrivateRoute/PrivateRoute";

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/signup" component={SignupPage} />
        <Route path="/signin" component={SigninPage} />
        <PrivateRoute path="/" component={GoodsPage} exact />
      </Switch>
    </BrowserRouter>
  );
};
