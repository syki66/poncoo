importScripts(
  "https://www.gstatic.com/firebasejs/9.9.3/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.9.3/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyAzIi2ZaPe0JF8ol21eUfjusV8BbCoWDzg",
  authDomain: "poncoo-277a0.firebaseapp.com",
  projectId: "poncoo-277a0",
  storageBucket: "poncoo-277a0.appspot.com",
  messagingSenderId: "360425187688",
  appId: "1:360425187688:web:cb7a3492e0593583afcedd",
  measurementId: "G-PC3WLF2BEB",
});

const messaging = firebase.messaging(); // 여기까지만 적으면 클라우드 메세지 송신 가능

// messaging.onMessage((payload) => {
//   console.log("fg msg: ", payload);
// });

// messaging.onBackgroundMessage((payload) => {
//   console.log("bg msg: ", payload);

//   const notificationTitle = "Background Message Title";
//   const notificationOptions = {
//     body: "Background Message body.",
//     icon: "./logo192.png",
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });

// 레거시 서버키 삭제해도 되는지..?
// foreground 메세지 작동안함
