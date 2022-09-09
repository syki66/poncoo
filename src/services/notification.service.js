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

const notiCollectionRef = collection(db, "notification");
class NotiDataService {
  addNotis = (newNoti) => {
    return addDoc(notiCollectionRef, newNoti);
  };

  getAllNotis = () => {
    return getDocs(notiCollectionRef);
  };
}

export default new NotiDataService();
