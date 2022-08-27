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
        currDate: moment().unix(),
        used: used,
      };
      setCoupon(updatedCoupon);
      await CouponDataService.updateCoupon(id, updatedCoupon);

      if (used) {
        localStorage.setItem("lastPath", "/used/1");
        alert('"사용 완료" 처리되었습니다.');
      } else {
        localStorage.setItem("lastPath", "/unused/1");
        alert('"사용 복구" 처리 되었습니다.');
      }
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

        {coupon.used ? (
          <>
            <div
              style={{
                position: "absolute",
                width: "100%",
                aspectRatio: "1 / 1",
                zIndex: "100",
              }}
            >
              <div
                style={{
                  height: "50%",
                  width: "50%",
                  marginLeft: "5%",
                  marginTop: "5%",
                  border: "3vw solid red",
                  borderRadius: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "red",
                  fontWeight: "1000",
                  fontSize: "12vw",
                  transform: "rotate(-22.5deg)",
                }}
              >
                사용
                <br />
                완료
              </div>
            </div>

            <img
              style={{
                width: "100%",
                border: "solid",
                opacity: "0.5",
              }}
              alt="gifticon"
              src={coupon.imgUrl}
            />
          </>
        ) : (
          <img
            style={{
              width: "100%",
              border: "solid",
            }}
            alt="gifticon"
            src={coupon.imgUrl}
          />
        )}
        <Button
          style={{
            backgroundColor: "#a0a0a0",
            color: "white",
            borderColor: "gray",
            marginTop: "1em",
            zIndex: "1000",
          }}
          onClick={() => {
            const lastPath = localStorage.getItem("lastPath");

            if (!lastPath) {
              navigate("/unused/1");
            } else {
              navigate(lastPath);
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
            zIndex: "1000",
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
                  zIndex: "1000",
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
                  zIndex: "1000",
                }}
              >
                사용 완료
              </Button>
            )}
      </div>
    </>
  );
}
