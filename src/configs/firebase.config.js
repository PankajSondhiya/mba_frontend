import { initializeApp } from "firebase/app";
import { createContext, useContext } from "react";
import {
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithCustomToken,
  signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBc8BGNJY8wP5IpUuvoLqfZr6LJKidXFKQ",
  authDomain: "movie-booking-applicatio-63d1e.firebaseapp.com",
  projectId: "movie-booking-applicatio-63d1e",
  storageBucket: "movie-booking-applicatio-63d1e.appspot.com",
  messagingSenderId: "51471419056",
  appId: "1:51471419056:web:e49c3b69aa4906d1835d75",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

const FirebaseContext = createContext(null);

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = ({ children }) => {
  const firebaseLogin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const firebaseSignup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const sendVerficationEmail = (email) => {
    return sendPasswordResetEmail(auth, email);
  };
  const resetPassword = (oobCode, newPassword) => {
    return confirmPasswordReset(auth, oobCode, newPassword);
  };
  return (
    <FirebaseContext.Provider
      value={{
        firebaseLogin,
        firebaseSignup,
        resetPassword,
        sendVerficationEmail,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
