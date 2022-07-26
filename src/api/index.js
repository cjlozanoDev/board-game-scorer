import {
  doc,
  getDoc,
  updateDoc,
  addDoc,
  collection,
  arrayUnion,
} from "firebase/firestore";
import { auth, db } from "../api/firebase";

const getUser = () => {
  const docRef = doc(db, "users", auth.currentUser.uid);
  return getDoc(docRef);
};

const addLocalUserApi = (localUser) => {
  return addDoc(collection(db, "localUsers"), {
    name: localUser.name,
    nickName: localUser.nickName,
    creatorUid: auth.currentUser.uid,
  });
};

const addLocalUserInsideUserApi = (localUser, localUserId) => {
  const docRef = doc(db, "users", auth.currentUser.uid);
  const objectLocalUser = {
    ...localUser,
    uid: localUserId,
  };
  return updateDoc(docRef, {
    localUsers: arrayUnion(objectLocalUser),
  });
};

export { getUser, addLocalUserApi, addLocalUserInsideUserApi };
