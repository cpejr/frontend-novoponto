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
  apiKey: "AIzaSyAIIrImhuMTYMroZX2xe0g5rscd7RmHZls",
  authDomain: "doti-equilibrio.firebaseapp.com",
  projectId: "doti-equilibrio",
  storageBucket: "doti-equilibrio.appspot.com",
  messagingSenderId: "1035802938687",
  appId: "1:1035802938687:web:1f72ca19ef479509e8578a",
  measurementId: "G-M4TCXQ4FTK",
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
