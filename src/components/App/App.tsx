import React from "react";

import { AuthProvider } from "../../providers/AuthProvider";
import { AppRouter } from "../AppRouter/AppRouter";

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
};
