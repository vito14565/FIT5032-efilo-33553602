// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCWa88gHRMMEYNxJ9I2zW761C7hLw5J80E",
  authDomain: "bookproject-weihsiang-ce46d.firebaseapp.com",
  projectId: "bookproject-weihsiang-ce46d",
  storageBucket: "bookproject-weihsiang-ce46d.firebasestorage.app",
  messagingSenderId: "454274807799",
  appId: "1:454274807799:web:b9c82115cb42b8bc2720f2"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);