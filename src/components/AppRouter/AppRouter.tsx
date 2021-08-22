import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { GoodsPage } from "../../pages/GoodsPage/GoodsPage";
import { SigninPage } from "../../pages/SigninPage/SigninPage";
import { SignupPage } from "../../pages/SignupPage/SignupPage";
import { NewProductPage } from "../../pages/NewProductPage/NewProductPage";

import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "../../routes";

import { PrivateRoute } from "../PrivateRoute/PrivateRoute";

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={PUBLIC_ROUTES.SIGNUP} component={SignupPage} />
        <Route path={PUBLIC_ROUTES.SIGNIN} component={SigninPage} />
        <PrivateRoute path={PRIVATE_ROUTES.GOODS} component={GoodsPage} exact />
        <PrivateRoute
          path={PRIVATE_ROUTES.CREATE_PRODUCT}
          component={NewProductPage}
          exact
        />
      </Switch>
    </BrowserRouter>
  );
};
