import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCKP6o_TdMs6sQsxv_HcnGGam2ZN7DMVDA",
  authDomain: "sumi-co.firebaseapp.com", // <-- это твой домен для веба!
  projectId: "sumi-co",
  storageBucket: "sumi-co.firebasestorage.app",
  messagingSenderId: "219263168554",
  appId: "1:219263168554:android:a9738e862f7f2065b09353", // можно даже не указывать для веба!
  databaseURL: "https://sumi-co-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const realtimeDb = getDatabase(app);
