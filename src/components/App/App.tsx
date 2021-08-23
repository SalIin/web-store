import React from "react";
import { Provider } from "react-redux";

import { AuthProvider } from "../../providers/AuthProvider";
import { AppRouter } from "../AppRouter/AppRouter";

import { store } from "../../redux";

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </AuthProvider>
  );
};
