import React from "react";
import { Button, DatePicker, Form, Input, message, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import moment from "moment";
import CouponDataService from "../services/coupon.services";
import { v4 } from "uuid";

import { storage } from "../firebase-config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Link, useNavigate } from "react-router-dom";

const checkVal = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";

  if (!isJpgOrPng) {
    message.error("JPG 또는 PNG 파일만 업로드 가능합니다.");
  }

  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isLt2M) {
    message.error("이미지 사이즈가 2MB를 초과할 수 없습니다.");
  }

  return isJpgOrPng && isLt2M;
};

export default function AddCoupon() {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    const { title, expDate, upload } = values;
    const uuid = v4();

    if (!checkVal(upload[0].originFileObj)) {
      return false;
    } else {
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
              };
              CouponDataService.addCoupons(newCoupon)
                .then(() => {
                  console.log("저장되었습니다.");
                  alert("저장되었습니다.");
                  navigate("/1");
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

  const normFile = (e) => {
    console.log("Upload event:", e);

    if (Array.isArray(e)) {
      return e;
    }

    return e?.fileList;
  };

  return (
    <Form
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      style={{ padding: "1em" }}
    >
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
        <DatePicker />
      </Form.Item>

      <Form.Item
        name="upload"
        label="Upload"
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
              Upload
            </div>
          </div>
        </Upload>
      </Form.Item>

      <Form.Item>
        <Link to="/1">
          <Button
            style={{
              backgroundColor: "#a0a0a0",
              color: "white",
              borderColor: "gray",
            }}
            type="ghost"
            block
          >
            이전
          </Button>
        </Link>
        <Button
          style={{ marginTop: "0.5em" }}
          type="primary"
          block
          htmlType="submit"
        >
          저장
        </Button>
      </Form.Item>
    </Form>
  );
}
