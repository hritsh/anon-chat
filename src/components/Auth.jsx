import { auth, provider } from "../firebase-config";
import {
  signInWithPopup,
  signInAnonymously,
  updateProfile,
} from "firebase/auth";
import "../styles/auth.css";

import Cookies from "universal-cookie";
const cookies = new Cookies();

export const Auth = ({ setIsAuth }) => {
  const signIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
    } catch (err) {
      console.log(err);
    }
  };
  const signInAnon = async () => {
    try {
      const result = await signInAnonymously(auth);
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
      // set username for anon user
      const username = document.getElementById("username").value;
      if (username) {
        await updateProfile(auth.currentUser, {
          displayName: username,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="auth">
      <p>Sign In with Google to Continue</p>
      <button onClick={signIn}>Sign In</button>
      <p>Or Sign In with a Username</p>
      <input id="username" type="text" />
      <button onClick={signInAnon}>Sign In</button>
    </div>
  );
};
