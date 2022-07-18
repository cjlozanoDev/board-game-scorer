import { DateTime } from "luxon";
import { date, Platform } from "quasar";
import {
  signInWithPopup,
  signInWithRedirect,
  signInWithEmailAndPassword,
  signOut,
  getRedirectResult,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
} from "firebase/auth";

import { doc, setDoc } from "firebase/firestore";

import { auth, db } from "../api/firebase";

const accessWithGoogleApi = () => {
  const provider = new GoogleAuthProvider();

  if (Platform.is.mobile) {
    window.sessionStorage.setItem("pending", 1);
  }

  return Platform.is.mobile
    ? signInWithRedirect(auth, provider)
    : signInWithPopup(auth, provider);
};

const createUserWithEmailAndPasswordApi = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

const signInWithEmailAndPasswordApi = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const getRedirectResultApi = () => {
  return getRedirectResult(auth);
};

const addUserInCollectionApi = (name, email, userUid) => {
  return setDoc(doc(db, "users", userUid), {
    name,
    email,
    uid: userUid,
    created_at: DateTime.now().toLocaleString(),
  });
};
const signOutApi = () => {
  return signOut(auth);
};

export {
  accessWithGoogleApi,
  createUserWithEmailAndPasswordApi,
  addUserInCollectionApi,
  getRedirectResultApi,
  signInWithEmailAndPasswordApi,
  signOutApi,
};
