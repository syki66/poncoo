import React from "react";
import { getMessaging, onMessage } from "firebase/messaging";
import { useNavigate } from "react-router-dom";
import { Button, notification, Typography } from "antd";

const messaging = getMessaging();
const { Title } = Typography;

export default function ToastMessage() {
  const navigate = useNavigate();
  onMessage(messaging, (payload) => {
    const { title, body, image } = payload.notification;
    openNotification(title, body, image);
  });

  const openNotification = (title, body, image) => {
    console.log(image);
    const key = `open${Date.now()}`;
    notification.open({
      message: <Title level={4}>{title}</Title>,
      description: (
        <>
          <Title level={5}>수정인: {body}</Title>
          <img src={image} style={{ width: "100%" }} />
        </>
      ),
      placement: "top",
      duration: 5,
      key,
      style: {
        backgroundColor: "#bad5f0",
        borderRadius: "0.5em",
      },
      onClick: () => {
        notification.close(key);
        navigate("/notification");
      },
    });
  };
}
