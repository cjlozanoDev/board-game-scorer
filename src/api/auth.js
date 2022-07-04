import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
} from "firebase/auth";

import { doc, setDoc } from "firebase/firestore";

import { auth, db } from "../api/firebase";

const accessWithGoogleApi = () => {
  const provider = new GoogleAuthProvider();

  return signInWithPopup(auth, provider);
};

const createUserWithEmailAndPasswordApi = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
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
};
