import React, { useEffect, useState } from "react";

import {
  createUserWithEmailAndPassword,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile
} from "firebase/auth";
import { app } from "../../firebase/firebase.init";

// create context

export const authContext = React.createContext();

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export default function AuthContext({ children }) {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);


  // sign up functionality

  const signUp = (email, password) => {
    setIsLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // sign in user's profile upload functionality

  const updateProfileNameImg = (name, photoURL) => {
    return updateProfile(auth.currentUser, { displayName: name, photoURL });
  };

  // sign in functionality

  const signIn = (email, password) => {
    setIsLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // logout functionality
  const logOut = () => {
    setIsLoading(true)
    return signOut(auth);
  };

  // login with goole function

  const loginWithgoogle = () => {
    setIsLoading(true);
    const Provider = new GoogleAuthProvider();
    return signInWithPopup(auth, Provider);
  };

  // login with github functionality

  const loginWithGithub = () => {
    setIsLoading(true);
    const Provider = new GithubAuthProvider();
    return signInWithPopup(auth, Provider);
  };

  // check user change or not

  useEffect(() => {
    const subs = onAuthStateChanged(auth, (userinfo) => {
      if (userinfo) {
        setIsLoading(false);
        setUser(userinfo);
      } else {
        setIsLoading(false);
        setUser({});
      }
    });
    return () => {
      subs();
    };
  }, []);

  // value that pass through context api
  const value = {
    signUp,
    updateProfileNameImg,
    logOut,
    user,
    isLoading,
    setIsLoading,
    signIn,
    loginWithGithub,
    loginWithgoogle,
  };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}
