import React, { useState, useEffect } from "react";
import firebase from "firebase";
import { auth } from "../firebase";

interface IAuthContext {
  currentUser: firebase.User | null;
}

export const AuthContext = React.createContext<IAuthContext>({
  currentUser: null,
});

export const AuthProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
