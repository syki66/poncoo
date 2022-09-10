import axios from "axios";

const url = "https://fcm.googleapis.com/fcm/send";

const sendMessage = async (title, desc, image, token) => {
  const headers = {
    "content-type": "application/json",
    Authorization:
      "key=AAAAU-sD6Wg:APA91bH-4QGoKb-N6_D64higJ-_XtS7RIM9hF7qUhOtRJ0e5T1BkaPh-lmSFC_jdq7Ggj7Tukxt8VYm-GVv2jk-WD1qQEmADK0mDFdSX4XLu6ePcNxoK-EsS-yE2vsU5gwSGkKzUIwqg",
  };
  const data = {
    notification: {
      title: title,
      body: desc,
      icon: "./favicon.ico",
      image: image,
    },
    registration_ids: token,
  };
  try {
    const res = await axios.post(url, data, { headers: headers });
    // console.log(res);
  } catch (error) {
    console.log("fcm send 에러: ", error);
  }
};

export { sendMessage };
