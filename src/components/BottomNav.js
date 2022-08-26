import React from "react";

import { useNavigate, Link } from "react-router-dom";
import { RedoOutlined } from "@ant-design/icons";
import BottomNavigation from "reactjs-bottom-navigation";
import "reactjs-bottom-navigation/dist/index.css";

export default function BottomNav() {
  const navigate = useNavigate();

  const bottomNavItems = [
    {
      title: "메인",
      icon: <RedoOutlined style={{ fontSize: "2em" }} />,
      activeIcon: <RedoOutlined style={{ fontSize: "2em", color: "#fff" }} />,
      onClick: () => {
        const lastPageNum = localStorage.getItem("lastPageNum");
        if (!lastPageNum) {
          navigate("/1");
        } else {
          navigate(`/${lastPageNum}`);
        }
      },
    },
    {
      title: "사용완료",
      icon: <RedoOutlined style={{ fontSize: "2em" }} />,
      activeIcon: <RedoOutlined style={{ fontSize: "2em", color: "#fff" }} />,
      onClick: () => {
        const lastPageNum = localStorage.getItem("lastPageNum");
        if (!lastPageNum) {
          navigate("/used/1");
        } else {
          navigate(`/used/${lastPageNum}`);
        }
      },
    },
    {
      title: "알림",
      icon: <RedoOutlined style={{ fontSize: "2em" }} />,
      activeIcon: <RedoOutlined style={{ fontSize: "2em", color: "#fff" }} />,
      onClick: () => navigate("/notification"),
    },
  ];

  return <BottomNavigation items={bottomNavItems} defaultSelected={0} />;
}
