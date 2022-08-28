// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAzIi2ZaPe0JF8ol21eUfjusV8BbCoWDzg",
  authDomain: "poncoo-277a0.firebaseapp.com",
  projectId: "poncoo-277a0",
  storageBucket: "poncoo-277a0.appspot.com",
  messagingSenderId: "360425187688",
  appId: "1:360425187688:web:cb7a3492e0593583afcedd",
  measurementId: "G-PC3WLF2BEB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const storage = getStorage(app);
