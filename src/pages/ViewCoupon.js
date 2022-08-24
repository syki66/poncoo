import { Button } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import couponServices from "../services/coupon.services";

export default function ViewCoupon() {
  const [coupon, setCoupon] = useState({});
  const location = useLocation();
  const id = location.pathname.split("/").pop();

  const doComplete = async (used) => {
    if (used) {
      const result = window.confirm('정말 "사용완료" 처리할까요?');
      if (!result) {
        return false;
      }
    }
    try {
      const updatedCoupon = {
        ...coupon,
        used: used,
      };
      setCoupon(updatedCoupon);
      await couponServices.updateCoupon(id, updatedCoupon);

      used
        ? alert('"사용 완료" 처리되었습니다.')
        : alert('"사용 복구" 처리 되었습니다.');
    } catch (error) {
      console.log("사용 완료(복구) 처리중 에러 : ", error);
    }
  };

  const init = async (id) => {
    try {
      const json = await couponServices.getCoupon(id);
      setCoupon({
        ...json.data(),
      });
    } catch (error) {
      console.log("view get에서 에러발생: ", error);
    }
  };
  useEffect(() => {
    init(id);
  }, []);
  return (
    <>
      <div
        style={{
          padding: "0.5em",
        }}
      >
        <div>{coupon.title}</div>
        <div>{moment.unix(coupon.expDate).format("YYYY년 MM월 DD일")}</div>
        <div>{moment.unix(coupon.currDate).format("YYYY-MM-DD")}</div>
        <img
          style={{
            width: "100%",
            border: "solid",
          }}
          alt="gifticon"
          src={coupon.imgUrl}
        />
        <Link to="/">
          <Button
            style={{
              backgroundColor: "#a0a0a0",
              color: "white",
              borderColor: "gray",
              marginTop: "1em",
            }}
            type="ghost"
            block
          >
            이전
          </Button>
        </Link>
        <Link to={`/edit/${id}`}>
          <Button
            style={{
              marginTop: "0.5em",
            }}
            type="primary"
            block
          >
            편집
          </Button>
        </Link>
        {coupon.used ? (
          <Button
            type="ghost"
            block
            onClick={(e) => doComplete(false)}
            style={{
              backgroundColor: "#55ab55",
              color: "white",
              padding: "0.5em",
              marginTop: "0.5em",
            }}
          >
            복구
          </Button>
        ) : (
          <Button
            type="ghost"
            block
            onClick={(e) => doComplete(true)}
            style={{
              backgroundColor: "#ff4081",
              color: "white",
              padding: "0.5em",
              marginTop: "0.5em",
            }}
          >
            사용 완료
          </Button>
        )}
      </div>
    </>
  );
}
