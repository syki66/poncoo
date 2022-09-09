import React from "react";
import { getToken } from "firebase/messaging";
import { useState } from "react";
import { useEffect } from "react";
import { messaging } from "../firebase-config";

export default function ViewToken() {
  const [token, setToken] = useState("");

  useEffect(() => {
    getToken(messaging, {
      vapidKey:
        "BMjVjQRnm_2QcC21B-Y0YBc6D_Th8fpKhPJQj840SXImc6Z9dKfLh6wjPiyPxwxVoVxtTjOwGcE0vgIz2Fb05Rg",
    }).then((currentToken) => {
      if (currentToken) {
        setToken(currentToken);
      } else {
        console.log("Can not get token");
      }
    });
  });

  return (
    <>
      <div>{token}</div>
      <button
        onClick={() => {
          navigator.clipboard.writeText(token);
        }}
      >
        copy
      </button>
    </>
  );
}
