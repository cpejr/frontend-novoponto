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
  apiKey: "AIzaSyDKITSVF0d3CrY09Xf2HuynmlMzEgf3NV0",
  authDomain: "ponto-cpe.firebaseapp.com",
  projectId: "ponto-cpe",
  storageBucket: "ponto-cpe.appspot.com",
  messagingSenderId: "927681508740",
  appId: "1:927681508740:web:84ebb90a0613589728d9d1",
  measurementId: "G-612XHC164X",
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
