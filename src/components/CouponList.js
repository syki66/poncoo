import { doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import couponServices from "../services/coupon.services";

export default function CouponList() {
  const [coupons, setCoupons] = useState([]);

  const getCoupons = async () => {
    const data = await couponServices.getAllCoupons();
    // console.log(data.docs);
    setCoupons(
      data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
    );
  };

  useEffect(() => {
    getCoupons();
  }, []);
  return (
    <>
      <div>
        <div>{}</div>
        <div>{}</div>
        <div>{}</div>
        <div>{}</div>
      </div>
      {/* <div className="container">
        {card.map((e) => (
          <div className="card">{e}</div>
        ))}
      </div> */}
    </>
  );
}
