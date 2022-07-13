import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../api/firebase";

const getUser = () => {
  const docRef = doc(db, "users", auth.currentUser.uid);
  return getDoc(docRef);
};

export { getUser };
