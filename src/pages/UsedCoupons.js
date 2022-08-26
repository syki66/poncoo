import React, { useState } from "react";
import CouponList from "./CouponList";
import CouponDataService from "../services/coupon.services";
import { useLocation } from "react-router-dom";

const postPerPage = 4;

export default function UsedCoupons() {
  const [coupons, setCoupons] = useState([]);
  const [posts, setPosts] = useState([]);
  const location = useLocation();
  const [pageIndex, setPageIndex] = useState(
    Number(location.pathname.split("/").pop())
  );
  const [couponsLen, setCouponsLen] = useState({});

  const getCoupons = async () => {
    try {
      const data = await CouponDataService.getAllCoupons();
      const parsedData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      const sortedParsedData = parsedData.sort(function (a, b) {
        return b.currDate - a.currDate;
      });
      const filteredData = sortedParsedData.filter((cp) => cp.used === true);
      setCoupons(filteredData);
      setPosts(
        filteredData.slice(
          (pageIndex - 1) * postPerPage,
          (pageIndex - 1) * postPerPage + postPerPage
        )
      );
      setCouponsLen({
        totalLen: parsedData.length,
        unusedLen: parsedData.length - filteredData.length,
        usedLen: filteredData.length,
      });
    } catch (error) {
      console.log("쿠폰 리스트 불러오는 도중 에러 : ", error);
    }
  };
  return (
    <CouponList
      coupons={coupons}
      setCoupons={setCoupons}
      posts={posts}
      setPosts={setPosts}
      pageIndex={pageIndex}
      setPageIndex={setPageIndex}
      getCoupons={getCoupons}
      postPerPage={postPerPage}
      tabID={"used"}
      couponsLen={couponsLen}
    />
  );
}
