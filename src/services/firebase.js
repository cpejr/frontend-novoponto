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
  apiKey: "AIzaSyAx_1dKxlOtqKX8BjE6ylKkFBMhWcoD-lA",
  authDomain: "doti-mult.firebaseapp.com",
  projectId: "doti-mult",
  storageBucket: "doti-mult.appspot.com",
  messagingSenderId: "198156251035",
  appId: "1:198156251035:web:45608072744f1cd0093b3e",
  measurementId: "G-B3T5QKTLMS",
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
