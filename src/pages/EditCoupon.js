import React, { useEffect, useState } from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  message,
  Upload,
  Typography,
} from "antd";
import { RedoOutlined } from "@ant-design/icons";
import moment from "moment";
import CouponDataService from "../services/coupon.services";
import { storage } from "../firebase-config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useLocation, useNavigate } from "react-router-dom";

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
  const [prevCoupon, setPrevCoupon] = useState({});
  const [imgChanged, setImgChanged] = useState(false);
  const [fileList, setFileList] = useState([]);

  const [disableSubmit, setDisableSubmit] = useState(false);
  const [submitMsg, setSubmitMsg] = useState("수정");

  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.pathname.split("/").pop();

  const getCoupon = async (id) => {
    try {
      const json = await CouponDataService.getCoupon(id);
      form.setFieldsValue({
        title: json.data().title,
        expDate: moment(
          moment.unix(json.data().expDate).format("YYYY-MM-DD"),
          "YYYY-MM-DD"
        ),
      });
      setFileList([
        {
          url: json.data().imgUrl,
        },
      ]);
      setPrevCoupon(json.data());
    } catch (error) {
      if (error.code === "permission-denied") {
        alert("권한 없음");
      }
      console.log("edit에서 get할때 에러 발생: ", error);
    }
  };

  const onFinish = async (values) => {
    setDisableSubmit(true);
    setSubmitMsg("잠시만 기다려주세요");

    const { title, expDate, upload } = values;

    if (imgChanged) {
      // 이미지를 바꾸었을 경우
      if (!checkVal(upload[0].originFileObj)) {
        return false;
      } else {
        const imageRef = ref(storage, prevCoupon.imagePath);
        uploadBytes(imageRef, upload[0].originFileObj)
          .then(() => {
            console.log(`이미지 업로드가 성공하였습니다.`);
            getDownloadURL(imageRef)
              .then((url) => {
                const updatedCoupon = {
                  title: title,
                  currDate: moment().unix(),
                  expDate: expDate.unix(),
                  imgUrl: url,
                  used: prevCoupon.used,
                  imagePath: prevCoupon.imagePath,
                  userEmail: localStorage.getItem("userEmail"),
                };
                CouponDataService.updateCoupon(id, updatedCoupon)
                  .then(() => {
                    alert("수정되었습니다. (이미지 교체)");
                    navigate(`/view/${id}`);
                  })
                  .catch((error) => {
                    console.log("수정시 오류 발생 (새 이미지) : ", error);
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
    } else {
      // 기존 이미지를 유지했을 경우
      const updatedCoupon = {
        title: title,
        currDate: moment().unix(),
        expDate: expDate.unix(),
        imgUrl: prevCoupon.imgUrl,
        used: prevCoupon.used,
        imagePath: prevCoupon.imagePath,
        userEmail: localStorage.getItem("userEmail"),
      };
      CouponDataService.updateCoupon(id, updatedCoupon)
        .then(() => {
          alert("수정되었습니다. (이미지 유지)");
          navigate(`/view/${id}`);
        })
        .catch((error) => {
          console.log("수정시 오류 발생 (이미지 유지) : ", error);
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

    setImgChanged(true);
    return e?.fileList;
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  useEffect(() => {
    getCoupon(id);
  }, []);

  return (
    <>
      <Title level={1} align="center" style={{ marginTop: "0.5em" }}>
        쿠폰 수정
      </Title>
      <Form
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        style={{ padding: "1em" }}
      >
        <Form.Item
          name="upload"
          label="쿠폰 이미지 (최대 1장)"
          getValueFromEvent={normFile}
          rules={[
            {
              required: imgChanged,
              message: "사진은 반드시 첨부해야 합니다.",
            },
          ]}
        >
          <Upload
            fileList={fileList}
            name="logo"
            listType="picture-card"
            maxCount={1}
            onChange={handleChange}
          >
            <div>
              <RedoOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                다시 올리기
              </div>
            </div>
          </Upload>
        </Form.Item>

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
          <DatePicker placeholder="유효기간 선택" />
        </Form.Item>

        <Form.Item>
          <Button
            style={{
              backgroundColor: "#a0a0a0",
              color: "white",
              borderColor: "gray",
            }}
            onClick={() => {
              navigate(`/view/${id}`);
            }}
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
    </>
  );
}
