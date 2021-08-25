import { auth } from "../firebase";

export const useAuth = () => {
  const signin = async (email: string, password: string) => {
    try {
      return await auth.signInWithEmailAndPassword(email, password);
    } catch (e) {
      return e;
    }
  };
  const signup = async (email: string, password: string) => {
    try {
      return await auth.createUserWithEmailAndPassword(email, password);
    } catch (e) {
      return e;
    }
  };
  const signout = async () => {
    await auth.signOut();
  };

  return { signin, signup, signout };
};
