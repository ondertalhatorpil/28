// src/pages/HatiraApp/firebaseConfig.jsx

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBlgAOu62Ka08AYSutqMxRX3eNzWHXQygY",
  authDomain: "subat-c836b.firebaseapp.com",
  projectId: "subat-c836b",
  storageBucket: "subat-c836b.firebasestorage.app",
  messagingSenderId: "187489224989",
  appId: "1:187489224989:web:3f678a899c055b36adb9f4",
  measurementId: "G-HVLEQNNXPW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore and export it
export const db = getFirestore(app);