import { Button } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CouponDataService from "../services/coupon.services";
import { Typography } from "antd";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { sendMessage } from "../utils/sendMessage";
import notificationService from "../services/notification.service";
import { getAuth } from "firebase/auth";

const auth = getAuth();

const { Title } = Typography;

export default function ViewCoupon() {
  const [coupon, setCoupon] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const storage = getStorage();
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
        userEmail: localStorage.getItem("userEmail"),
      };
      setCoupon(updatedCoupon);
      await CouponDataService.updateCoupon(id, updatedCoupon);

      if (used) {
        localStorage.setItem("lastPath", "/used/1");
        alert('"사용 완료" 처리되었습니다.');
        sendMessage(
          `[사용] ${coupon.title}`,
          `${localStorage.getItem("userEmail")}`,
          coupon.imgUrl,
          JSON.parse(localStorage.getItem("tokens"))
        );
        notificationService
          .addNotis({
            date: moment().unix(),
            type: "쿠폰 사용",
            title: coupon.title,
            userEmail: `수정인 : ${localStorage.getItem("userEmail")}`,
            imgUrl: coupon.imgUrl,
          })
          .then((res) => {
            console.log("noti succ compl");
          })
          .catch((err) => console.log("noti error compl", err));
      } else {
        localStorage.setItem("lastPath", "/unused/1");
        alert('"사용 복구" 처리 되었습니다.');
        sendMessage(
          `[복구] ${coupon.title}`,
          `${localStorage.getItem("userEmail")}`,
          coupon.imgUrl,
          JSON.parse(localStorage.getItem("tokens"))
        );
        notificationService
          .addNotis({
            date: moment().unix(),
            type: "쿠폰 복구",
            title: coupon.title,
            userEmail: `수정인 : ${localStorage.getItem("userEmail")}`,
            imgUrl: coupon.imgUrl,
          })
          .then((res) => {
            console.log("noti succ unCompl", res);
          })
          .catch((err) => console.log("noti error unCompl", err));
      }
    } catch (error) {
      console.log("사용 완료(복구) 처리중 에러 : ", error);
    }
  };

  const deleteImage = () => {
    const desertRef = ref(storage, coupon.imagePath);
    deleteObject(desertRef)
      .then(() => {
        console.log("이미지가 삭제되었습니다.");
      })
      .catch((error) => {
        console.log("쿠폰 이미지 삭제중 에러발생 :", error);
      });
  };

  const deleteCoupon = async () => {
    const result = window.confirm(
      '정말 쿠폰을 "삭제" 하시겠습니까? \n\n ※이 작업은 되돌릴 수 없습니다※'
    );
    if (!result) {
      return false;
    }
    try {
      deleteImage();
      await CouponDataService.deleteCoupon(id);
      alert("삭제되었습니다.");
      navigate(`/used/1`);
      sendMessage(
        `[삭제] ${coupon.title}`,
        `${localStorage.getItem("userEmail")}`,
        coupon.imgUrl,
        JSON.parse(localStorage.getItem("tokens"))
      );
      notificationService
        .addNotis({
          date: moment().unix(),
          type: "쿠폰 삭제",
          title: coupon.title,
          userEmail: `수정인 : ${localStorage.getItem("userEmail")}`,
          imgUrl: coupon.imgUrl,
        })
        .then((res) => {
          console.log("noti succ del", res);
        })
        .catch((err) => console.log("noti error del", err));
    } catch (error) {
      console.log("쿠폰 데이터 삭제시 에러 : ", error);
    }
  };

  const init = async (id) => {
    try {
      const json = await CouponDataService.getCoupon(id);
      setCoupon({
        ...json.data(),
      });
    } catch (error) {
      if (error.code === "permission-denied") {
        alert("권한 없음");
      }
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
            marginBottom: "0em",
          }}
        >
          수정일 : {moment.unix(coupon.currDate).format("YYYY-MM-DD")}
        </Title>
        <Title
          level={5}
          align="right"
          style={{
            color: "lightGray",
            marginTop: "0em",
          }}
        >
          수정인 : {coupon.userEmail}
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
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  zIndex: "100",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    width: "90%",
                    aspectRatio: "1 / 1",
                    border: "4vw solid red",
                    borderRadius: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "red",
                    fontWeight: "1000",
                    fontSize: "20vw",
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
            </div>
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
              <>
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

                <Title
                  type="danger"
                  style={{
                    marginTop: "10em",
                  }}
                  align="center"
                >
                  ※주의※
                </Title>
                <Title level={5} align="center" type="danger">
                  삭제되면 복구가 불가능합니다.
                </Title>
                <Button
                  type="primary"
                  danger
                  block
                  onClick={(e) => deleteCoupon()}
                  style={{
                    zIndex: "1000",
                  }}
                >
                  삭제
                </Button>
              </>
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
