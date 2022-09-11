import React, { useState } from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  message,
  Upload,
  Typography,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import moment from "moment";
import CouponDataService from "../services/coupon.services";
import { v4 } from "uuid";

import { storage } from "../firebase-config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { sendMessage } from "../utils/sendMessage";
import notificationService from "../services/notification.service";

const { Title } = Typography;

const checkVal = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";

  if (!isJpgOrPng) {
    message.error("JPG 또는 PNG 파일만 업로드 가능합니다.");
  }

  const isLt1M = file.size / 1024 / 1024 < 1;

  if (!isLt1M) {
    message.error("이미지 사이즈가 1MB를 초과할 수 없습니다.");
  }

  return isJpgOrPng && isLt1M;
};

export default function AddCoupon() {
  const navigate = useNavigate();

  const [disableSubmit, setDisableSubmit] = useState(false);
  const [submitMsg, setSubmitMsg] = useState("저장");
  const [previewImage, setPreviewImage] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const onFinish = async (values) => {
    const { title, expDate, upload } = values;
    const uuid = v4();

    if (!checkVal(upload[0].originFileObj)) {
      return false;
    } else {
      setDisableSubmit(true);
      setSubmitMsg("잠시만 기다려주세요");
      const imageRef = ref(storage, `images/${uuid}`);
      uploadBytes(imageRef, upload[0].originFileObj)
        .then(() => {
          console.log(`이미지 업로드가 성공하였습니다.`);
          getDownloadURL(imageRef)
            .then((url) => {
              const newCoupon = {
                title: title,
                currDate: moment().unix(),
                expDate: expDate.unix(),
                imgUrl: url,
                used: false,
                imagePath: `images/${uuid}`,
                userEmail: localStorage.getItem("userEmail"),
              };
              CouponDataService.addCoupons(newCoupon)
                .then(() => {
                  console.log("저장되었습니다.");
                  alert("저장되었습니다.");
                  navigate("/unused/1");
                  sendMessage(
                    `쿠폰 추가 : ${title}`,
                    `수정인 : ${localStorage.getItem("userEmail")}`,
                    url,
                    JSON.parse(localStorage.getItem("tokens"))
                  );
                  notificationService
                    .addNotis({
                      date: moment().unix(),
                      type: "쿠폰 추가",
                      title: title,
                      userEmail: `수정인 : ${localStorage.getItem(
                        "userEmail"
                      )}`,
                      imgUrl: url,
                    })
                    .then((res) => {
                      console.log("noti succ add", res);
                    })
                    .catch((err) => console.log("noti error add", err));
                })
                .catch((error) => {
                  console.log("저장 오류 발생 : ", error);
                  // 저장된 이미지 삭제하기
                });
            })
            .catch((error) => {
              console.log("이미지 URL 가져오는 도중 에러발생 :", error);
            });
        })
        .catch((error) => {
          console.log(`이미지 업로드중 에러 발생 : ${error}`);
        });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const normFile = (e) => {
    console.log("Upload event:", e);
    getBase64(e.file.originFileObj, (url) => {
      setPreviewImage(url);
    });
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <>
      <Title level={1} align="center" style={{ marginTop: "0.5em" }}>
        새 쿠폰 추가
      </Title>
      <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        style={{ padding: "1em" }}
      >
        <Form.Item
          name="upload"
          label="쿠폰 이미지 (최대 1장)"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[
            {
              required: true,
              message: "사진은 반드시 첨부해야 합니다.",
            },
          ]}
        >
          <Upload name="logo" listType="picture-card" maxCount={1}>
            <div>
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                쿠폰 선택
              </div>
            </div>
          </Upload>
        </Form.Item>
        <Button
          style={{
            backgroundColor: "#fef957",
            color: "black",
            borderColor: "black",
            width: "50%",
            marginBottom: "2em",
          }}
          onClick={() => setOpenModal(true)}
          type="ghost"
        >
          쿠폰 이미지 미리보기
        </Button>
        <Form.Item
          label="제목"
          name="title"
          rules={[
            {
              required: true,
              message: "제목은 반드시 입력해야 합니다.",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="유효기간"
          name="expDate"
          rules={[
            {
              required: true,
              message: "유효기간은 반드시 입력해야 합니다.",
            },
          ]}
        >
          <DatePicker inputReadOnly placeholder="유효기간 선택" />
        </Form.Item>

        <Form.Item>
          <Button
            style={{
              backgroundColor: "#a0a0a0",
              color: "white",
              borderColor: "gray",
            }}
            onClick={() => navigate(-1)}
            type="ghost"
            block
          >
            이전
          </Button>
          <Button
            style={{ marginTop: "0.5em" }}
            type="primary"
            disabled={disableSubmit}
            block
            htmlType="submit"
          >
            {submitMsg}
          </Button>
        </Form.Item>
      </Form>

      {openModal && (
        <>
          <div
            onClick={() => {
              setOpenModal(false);
            }}
            style={{
              backgroundColor: "rgba(0,0,0,0.5)",
              position: "absolute",
              height: "100%",
              width: "100%",
              top: "0%",
              left: "0%",
              zIndex: "10",
            }}
          ></div>
          <div
            style={{
              backgroundColor: "rgba(255,255,255)",
              position: "absolute",
              height: "90%",
              width: "85%",
              top: "5%",
              left: "7.5%",
              padding: "0.5em",
              overflow: "auto",
              borderRadius: "0.5em",
              zIndex: "11",
            }}
          >
            <div>
              <img src={previewImage} style={{ width: "100%" }} />
            </div>
            <Button
              onClick={() => {
                setOpenModal(false);
              }}
              type="primary"
              block
              style={{ margin: "1em 0em" }}
            >
              닫기
            </Button>
          </div>
        </>
      )}
    </>
  );
}
