import React, { useState } from "react";
import { Button, DatePicker, Form, Input, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import moment from "moment";
import CouponDataService from "../services/coupon.services";

const expDateFormat = "YYYY-MM-DD";

export default function AddCoupon() {
  //   const [title, setTitle] = useState("assad");
  //   const [expDate, setExpDate] = useState("");
  //   const [currDate, setCurrDate] = useState("");
  //   const [imgUrl, setImgUrl] = useState("");

  const onFinish = async (values) => {
    const { title, expDate, upload } = values;
    // console.log("Success:", values);

    console.log(upload[0].name);
    const newCoupon = {
      title: title,
      currDate: moment().unix(),
      expDate: expDate.format(expDateFormat),
      img: upload[0].name,
    };
    console.log(newCoupon);

    try {
      await CouponDataService.addCoupons(newCoupon);
      console.log("성공하였습니다.");
    } catch (error) {
      console.log("에러 발생", error);
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
        <Upload name="logo" action="/upload.do" listType="picture">
          <Button icon={<UploadOutlined />}>쿠폰 사진 첨부</Button>
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button htmlType="submit">저장하기</Button>
      </Form.Item>
    </Form>
  );
}
