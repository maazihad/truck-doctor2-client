import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import { app } from '../firebase/firebase.config';
import axios from 'axios';

export const AuthContext = createContext(null);

const auth = getAuth(app);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      // auth step-4
      const userEmail = currentUser?.email || user?.email;
      const loggedUser = { email: userEmail };
      setUser(currentUser);
      setLoading(false);
      // ‍auth step-3
      if (currentUser) {
        axios
          .post('http://localhost:5001/jwt', loggedUser, {
            withCredentials: true,
          })
          .then((response) => {
            console.log('token response', response.data);
          })
          .catch((error) => {
            console.log(error.message);
          });
        // auth step-6 (step 7 সার্ভার সাইটে cookie parser install করতে হবে )
      } else {
        axios
          .post('http://localhost:5001/logout', loggedUser, {
            withCredentials: true,
          })
          .then((response) => {
            console.log('token response from logout', response.data);
          })
          .catch((error) => {
            console.log(error.message);
          });
      }
    });
    return () => {
      return unSubscribe();
    };
  }, [user?.email]);

  const authInfo = { user, createUser, signIn, logOut, loading };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
