import {
  doc,
  getDoc,
  updateDoc,
  addDoc,
  deleteDoc,
  collection,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { auth, db } from "../api/firebase";
import { DateTime } from "luxon";

const getUser = () => {
  const docRef = doc(db, "users", auth.currentUser.uid);
  return getDoc(docRef);
};

const addLocalUserApi = (localUser) => {
  return addDoc(collection(db, "localUsers"), {
    name: localUser.name,
    nickName: localUser.nickName,
    creatorUid: auth.currentUser.uid,
    created_at: DateTime.now().toLocaleString(DateTime.DATETIME_FULL),
  });
};

const removeLocalUserApi = (localUserId) => {
  return deleteDoc(doc(db, "localUsers", localUserId));
};

const removeLocalUserInsideUserApi = (localUser) => {
  const docRef = doc(db, "users", auth.currentUser.uid);
  return updateDoc(docRef, {
    localUsers: arrayRemove(localUser),
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

const updateLocalUsersInsideUserApi = (localUsers) => {
  const docRef = doc(db, "users", auth.currentUser.uid);
  return updateDoc(docRef, {
    localUsers,
  });
};

const updateLocalUserApi = (localUser) => {
  const docRef = doc(db, "localUsers", localUser.uid);
  return updateDoc(docRef, {
    name: localUser.name,
    nickName: localUser.nickName,
  });
};

export {
  getUser,
  addLocalUserApi,
  addLocalUserInsideUserApi,
  updateLocalUsersInsideUserApi,
  removeLocalUserInsideUserApi,
  updateLocalUserApi,
  removeLocalUserApi,
};
