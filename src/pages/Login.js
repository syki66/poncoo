import React, { useEffect, useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Typography } from "antd";
import { useNavigate } from "react-router-dom";

import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

// import ViewToken from "../components/ViewToken";

const { Title } = Typography;

export default function Login() {
  const [currUser, setCurrUser] = useState({});
  const navigate = useNavigate();
  const auth = getAuth();

  const login = async (email, password) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("userEmail", user.user.email);
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        alert("유효하지 않은 이메일입니다.");
      } else if (error.code === "auth/user-not-found") {
        alert("존재하지 않는 이메일입니다.");
      } else if (error.code === "auth/wrong-password") {
        alert("비밀번호가 틀렸습니다.");
      }
      console.log(error.code);
      // console.log(error.message);
    }
  };

  const onFinish = (values) => {
    login(values.email, values.password);
  };

  useEffect(() => {
    // state 값을 받아오기 위해 존재. 없어도 로그인은 유지됨
    onAuthStateChanged(auth, (currentUser) => {
      setCurrUser(currentUser);
    });
    if (currUser?.email) {
      navigate("/unused/1");
    }
  }, [currUser]);

  return (
    <>
      <div style={{ textAlign: "center", paddingTop: "1em" }}>
        <Title level={1}>폰쿠</Title>
        <Title level={4}>쿠폰 관리 어플</Title>
      </div>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        style={{
          padding: "1em",
        }}
        onFinish={onFinish}
        // autoComplete="off"
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "이메일을 입력해주세요",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="이메일"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "비밀번호를 입력해주세요.",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="비밀번호"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            block
          >
            로그인
          </Button>
        </Form.Item>
      </Form>
      {/* <ViewToken /> */}
    </>
  );
}
