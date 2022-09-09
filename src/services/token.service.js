import { db } from "../firebase-config";

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const tokenCollectionRef = collection(db, "tokens");
class TokenDataService {
  addTokens = (newToken) => {
    return addDoc(tokenCollectionRef, newToken);
  };

  getAllTokens = () => {
    return getDocs(tokenCollectionRef);
  };
}

export default new TokenDataService();
