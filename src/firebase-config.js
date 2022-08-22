// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjZX4Pyq8neb_P-h3M7QJl-niTkK6Vp-I",
  authDomain: "coopon-66f7d.firebaseapp.com",
  projectId: "coopon-66f7d",
  storageBucket: "coopon-66f7d.appspot.com",
  messagingSenderId: "325860852255",
  appId: "1:325860852255:web:963bdf9365f721dfcfcb2a",
  measurementId: "G-9D70S6764J",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = getFirestore(app);
