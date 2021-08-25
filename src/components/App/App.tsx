import React from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import { AuthProvider } from "../../providers/AuthProvider";
import { AppRouter } from "../AppRouter/AppRouter";

import { store } from "../../redux";

import "react-toastify/dist/ReactToastify.css";

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <Provider store={store}>
        <AppRouter />
        <ToastContainer style={{ marginTop: "60px" }} />
      </Provider>
    </AuthProvider>
  );
};
