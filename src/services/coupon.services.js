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

const couponCollectionRef = collection(db, "coupons");
class CouponDataService {
  addCoupons = (newCoupon) => {
    return addDoc(couponCollectionRef, newCoupon);
  };

  updateCoupon = (id, updatedCoupon) => {
    const couponDoc = doc(db, "coupons", id);
    return updateDoc(couponDoc, updatedCoupon);
  };

  deleteCoupon = (id) => {
    const couponDoc = doc(db, "coupons", id);
    return deleteDoc(couponDoc);
  };

  getAllCoupons = () => {
    return getDocs(couponCollectionRef);
  };

  getCoupon = (id) => {
    const couponDoc = doc(db, "coupons", id);
    return getDoc(couponDoc);
  };
}

export default new CouponDataService();
