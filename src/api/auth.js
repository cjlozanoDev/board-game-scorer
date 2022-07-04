import { Platform } from "quasar";
import {
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
} from "firebase/auth";

import { doc, setDoc } from "firebase/firestore";

import { auth, db } from "../api/firebase";

const accessWithGoogleApi = () => {
  const provider = new GoogleAuthProvider();

  return Platform.is.mobile
    ? signInWithRedirect(auth, provider)
    : signInWithPopup(auth, provider);
};

const createUserWithEmailAndPasswordApi = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

const getRedirectResultApi = () => {
  return getRedirectResult(auth);
};

const addUserInCollection = (name, email, userUid) => {
  return setDoc(doc(db, "users", userUid), {
    name,
    email,
    uid: userUid,
  });
};

export {
  accessWithGoogleApi,
  createUserWithEmailAndPasswordApi,
  addUserInCollection,
  getRedirectResultApi,
};
