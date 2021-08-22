import React from "react";
import { useContext } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

export const PrivateRoute: React.FC<RouteProps> = (props) => {
  const { currentUser } = useContext(AuthContext);

  return currentUser ? <Route {...props} /> : <Redirect to="/signin" />;
};
