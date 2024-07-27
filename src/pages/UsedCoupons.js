import React, { useState } from 'react';
import CouponList from './CouponList';
import CouponDataService from '../services/coupon.services';
import { useLocation } from 'react-router-dom';

const postPerPage = 4;

export default function UsedCoupons() {
  const [coupons, setCoupons] = useState([]);
  const [posts, setPosts] = useState([]);
  const location = useLocation();
  const [pageIndex, setPageIndex] = useState(
    Number(location.pathname.split('/').pop())
  );
  const [couponsLen, setCouponsLen] = useState({});

  const sortCoupons = (sortedParsedData) => {
    if (localStorage.getItem('sortOption') === 'curr_descending') {
      sortedParsedData.sort(function (a, b) {
        return b.currDate - a.currDate;
      });
    } else if (localStorage.getItem('sortOption') === 'curr_ascending') {
      sortedParsedData.sort(function (a, b) {
        return a.currDate - b.currDate;
      });
    } else if (localStorage.getItem('sortOption') === 'exp_ascending') {
      sortedParsedData.sort(function (a, b) {
        return a.expDate - b.expDate;
      });
    } else if (localStorage.getItem('sortOption') === 'exp_descending') {
      sortedParsedData.sort(function (a, b) {
        return b.expDate - a.expDate;
      });
    } else {
      console.log('정렬과정 중 에러 발생');
    }
  };

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
      sortCoupons(sortedParsedData);
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
      if (error.code === 'permission-denied') {
        alert('권한 없음');
      }
      console.log('쿠폰 리스트 불러오는 도중 에러 : ', error);
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
      tabID={'used'}
      couponsLen={couponsLen}
    />
  );
}
