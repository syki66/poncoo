import { Button } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CouponDataService from "../services/coupon.services";
import { Typography } from "antd";

const { Title } = Typography;

export default function ViewCoupon() {
  const [coupon, setCoupon] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
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
      await CouponDataService.updateCoupon(id, updatedCoupon);

      used
        ? alert('"사용 완료" 처리되었습니다.')
        : alert('"사용 복구" 처리 되었습니다.');
    } catch (error) {
      console.log("사용 완료(복구) 처리중 에러 : ", error);
    }
  };

  const init = async (id) => {
    try {
      const json = await CouponDataService.getCoupon(id);
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
        <Title level={1}>{coupon.title}</Title>
        <Title
          level={5}
          align="right"
          style={{
            color: "lightGray",
          }}
        >
          생성일 : {moment.unix(coupon.currDate).format("YYYY-MM-DD")}
        </Title>
        <Title
          align="center"
          level={3}
          style={{
            color: "#ff6961",
          }}
        >
          {moment.unix(coupon.expDate).format("YYYY년 MM월 DD일")} 까지
        </Title>

        <img
          style={{
            width: "100%",
            border: "solid",
          }}
          alt="gifticon"
          src={coupon.imgUrl}
        />
        <Button
          style={{
            backgroundColor: "#a0a0a0",
            color: "white",
            borderColor: "gray",
            marginTop: "1em",
          }}
          onClick={() => {
            const lastPageNum = localStorage.getItem("lastPageNum");
            if (!lastPageNum) {
              navigate("/1");
            } else {
              navigate(`/${lastPageNum}`);
            }
          }}
          type="ghost"
          block
        >
          이전
        </Button>
        <Button
          style={{
            marginTop: "0.5em",
          }}
          onClick={() => {
            navigate(`/edit/${id}`);
          }}
          type="primary"
          block
        >
          편집
        </Button>
        {coupon.used
          ? coupon.used !== undefined && (
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
            )
          : coupon.used !== undefined && (
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
