import React from "react";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import { useState } from "react";
import { useEffect } from "react";

export default function ViewToken() {
  const [token, setToken] = useState("");

  useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyAzIi2ZaPe0JF8ol21eUfjusV8BbCoWDzg",
      authDomain: "poncoo-277a0.firebaseapp.com",
      projectId: "poncoo-277a0",
      storageBucket: "poncoo-277a0.appspot.com",
      messagingSenderId: "360425187688",
      appId: "1:360425187688:web:cb7a3492e0593583afcedd",
      measurementId: "G-PC3WLF2BEB",
    };
    const app = initializeApp(firebaseConfig);

    const messaging = getMessaging(app);
    getToken(messaging, {
      vapidKey:
        "BMjVjQRnm_2QcC21B-Y0YBc6D_Th8fpKhPJQj840SXImc6Z9dKfLh6wjPiyPxwxVoVxtTjOwGcE0vgIz2Fb05Rg",
    }).then((currentToken) => {
      if (currentToken) {
        console.log("currentToken: ", currentToken);
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
