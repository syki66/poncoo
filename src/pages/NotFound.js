import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

const auth = getAuth();

export default function NotFound() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/");
  });
  return <div>잘못된 페이지로 들어왔습니다. 메인페이지로 이동합니다.</div>;
}
