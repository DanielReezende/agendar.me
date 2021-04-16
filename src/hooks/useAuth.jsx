import { createContext, useEffect, useState, useContext } from "react";
import { firebaseClient, persistenceMode } from "../config/firebase/client";

import axios from 'axios';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({ loading: true, user: false });

  async function login(email, password) {
    firebaseClient.auth().setPersistence(persistenceMode);
    try {
      await firebaseClient.auth().signInWithEmailAndPassword(email, password);
      return firebaseClient.auth().currentUser;
    } catch (error) {
      console.log('LOGIN ERROR: ', error)
    }
  }

  function logout() {
    try {
      firebaseClient.auth().signOut();
    } catch (error) {
      console.log('LOGOUT ERROR: ', error)
    }

  }

  async function signUp(email, password, username) {
    try {
      await firebaseClient.auth().createUserWithEmailAndPassword(email, password);

      const user = await login(email, password);
      const token = await user.getIdToken();

      const { data } = await axios({
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        url: '/api/profile',
        data: {
          username: username
        }
      })

    } catch (error) {
      console.log('SIGNUP ERROR: ', error)
    }
  }

  useEffect(() => {
    const unsubscribe = firebaseClient.auth().onAuthStateChanged(user => {
      setAuth({
        loading: false,
        user
      })
    })

    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ auth, login, logout, signUp }}>
      { children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}