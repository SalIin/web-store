import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

export const PrivateRoute: React.FC<RouteProps> = (props) => {
  const user = false;

  return user ? <Route {...props} /> : <Redirect to="/signin" />;
};
