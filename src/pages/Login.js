import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Typography } from "antd";

import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

const { Title } = Typography;

export default function Login() {
  const [user, setUser] = useState({});
  const auth = getAuth();

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const login = async (email, password) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
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

  const logout = async () => {
    await signOut(auth);
  };

  const onFinish = (values) => {
    login(values.email, values.password);
  };
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

        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>로그인 상태 유지</Checkbox>
          </Form.Item>
        </Form.Item>
      </Form>

      <div>{user?.email}</div>
      {/* <Link to="/unused/1">go Coupon</Link> */}
    </>
  );
}
