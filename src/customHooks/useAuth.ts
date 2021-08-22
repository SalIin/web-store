import { auth } from "../firebase";

export const useAuth = () => {
  const signin = async (email: string, password: string) => {
    return await auth.signInWithEmailAndPassword(email, password);
  };
  const signup = async (email: string, password: string) => {
    return await auth.createUserWithEmailAndPassword(email, password);
  };
  const signout = async () => {
    await auth.signOut();
  };

  return { signin, signup, signout };
};
