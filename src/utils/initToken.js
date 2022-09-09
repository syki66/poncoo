import tokenService from "../services/token.service";
import { getToken } from "firebase/messaging";
import { messaging } from "../firebase-config";

const serverKey =
  "BMjVjQRnm_2QcC21B-Y0YBc6D_Th8fpKhPJQj840SXImc6Z9dKfLh6wjPiyPxwxVoVxtTjOwGcE0vgIz2Fb05Rg";

const initToken = () => {
  getToken(messaging, {
    vapidKey: serverKey,
  })
    .then((currentToken) => {
      if (currentToken) {
        tokenService
          .getAllTokens()
          .then((data) => {
            const parsedData = [];
            data.docs.map((doc) => [
              parsedData.push(doc.data().registration_id),
            ]);
            if (parsedData.includes(currentToken)) {
              localStorage.setItem("tokens", JSON.stringify(parsedData));
            } else {
              tokenService
                .addTokens({
                  registration_id: currentToken,
                })
                .then((res) => {
                  parsedData.push(currentToken);
                  localStorage.setItem("tokens", JSON.stringify(parsedData));
                })
                .catch((err) => console.log("토큰db add 실패: ", err));
            }
          })
          .catch((err) => console.log("getalltoken 실패: ", err));
      } else {
        console.log("Can not get token");
      }
    })
    .catch((error) => {
      // ios일 경우 (pwa 푸시 불가능)
      tokenService
        .getAllTokens()
        .then((data) => {
          const parsedData = [];
          data.docs.map((doc) => [parsedData.push(doc.data().registration_id)]);
          localStorage.setItem("tokens", JSON.stringify(parsedData));
        })
        .catch((err) => console.log("getalltoken 실패: ", err));
    });
};

export { initToken };
