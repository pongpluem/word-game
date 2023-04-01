// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: "AIzaSyDmtYM6DHO9FEUOf52od2Q1KS68eKEv3R8",
  authDomain: "next-api-6ad10.firebaseapp.com",
  projectId: "next-api-6ad10",
  storageBucket: "next-api-6ad10.appspot.com",
  messagingSenderId: "714080450492",
  appId: "1:714080450492:web:82f68382fcf0c1471f1db9",
  measurementId: "G-NHGV7MNBWS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
//const db = getFirestore(app);

export { app };
