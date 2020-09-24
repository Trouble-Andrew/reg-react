import React, { useReducer } from "react";
import { Context } from "./stateContext";
import { Reducer } from "./stateReducer";
import {
  HIDE_MESSAGE,
  SHOW_SIGN_UP_MESSAGE,
  SHOW_SIGN_IN_MESSAGE,
} from "./types";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

firebase.initializeApp({
  apiKey: "AIzaSyCB6I2bWEYn4GKOC0_BBVGzCsARYO9dWDo",
  authDomain: "reg-form-ac1b7.firebaseapp.com ",
  databaseURL: "https://reg-form-ac1b7.firebaseio.com/",
  projectId: "reg-form-ac1b7",
  storageBucket: "",
  messagingSenderId: "",
});

export const State = ({ children }) => {
  const initialState = {
    users: [],
    loading: false,
    messageScreen: "",
  };
  const [state, dispatch] = useReducer(Reducer, initialState);

  const showSignUpMessage = (type = "success") => {
    dispatch({
      type: SHOW_SIGN_UP_MESSAGE,
      payload: type,
    });
  };

  const showSignInMessage = (type = "authorized") => {
    dispatch({
      type: SHOW_SIGN_IN_MESSAGE,
      payload: type,
    });
  };

  const hideMessage = () => dispatch({ type: HIDE_MESSAGE });

  const signIn = async (userData) => {
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(userData.email, userData.password);
    } catch (e) {
      throw new Error(e.message);
    }
  };

  const signUp = async (userData) => {
    const newUser = {
      phone: userData.phone,
      name: userData.name,
      nickName: userData.nickName,
      email: userData.email,
    };
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(userData.email, userData.password);

      let uid = getCurrentUser();
      await firebase.database().ref(`/users/${uid}`).set(newUser);
    } catch (e) {
      throw new Error(e.message);
    }
  };

  const getCurrentUser = () => {
    let user = firebase.auth().currentUser;
    return user ? user.uid : null;
  };

  return (
    <Context.Provider
      value={{
        showSignUpMessage,
        showSignInMessage,
        hideMessage,
        signUp,
        signIn,
        state: state,
      }}
    >
      {children}
    </Context.Provider>
  );
};
