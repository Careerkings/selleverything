import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "selleverything-92f04.firebaseapp.com",
  projectId: "selleverything-92f04",
  storageBucket: "selleverything-92f04.firebasestorage.app",
  messagingSenderId: "63431816149",
  appId: "1:63431816149:web:87c23e505a1f586f6e435c",
  measurementId: "G-Y5TVT7LZZ3",
};
export const app = initializeApp(firebaseConfig);
