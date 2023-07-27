import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useContext, useState } from "react";
import { SessionContext } from "../context/SessionProvider";

const firebaseConfig = {
  apiKey: "AIzaSyAKucPiyPlRRVj1ED95AgaADXv9WtQJZUE",
  authDomain: "doti-apical.firebaseapp.com",
  projectId: "doti-apical",
  storageBucket: "doti-apical.appspot.com",
  messagingSenderId: "708898702174",
  appId: "1:708898702174:web:3986269d14acfbf70f45cf",
  measurementId: "G-5RZV4H7QP0"
};

export default function useGoogleAuth() {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const [isLoading, setIsLoading] = useState(false);
  const { login, logout } = useContext(SessionContext);

  const googleLogin = async () => {
    try {
      setIsLoading(true);
      const res = await signInWithPopup(auth, googleProvider);
      const { uid, email, photoURL } = res.user;
      login({ uid, email, photoURL });
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const googleLogout = async () => {
    try {
      setIsLoading(true);
      await signOut(auth);
      logout();
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { googleLogin, googleLogout, isLoading };
}
