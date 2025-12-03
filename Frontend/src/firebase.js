import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBhp0NeocysJ0qdmmSaUkyYatdKwPkCRLg",
  authDomain: "audio-player-b6744.firebaseapp.com",
  databaseURL: "https://audio-player-b6744-default-rtdb.firebaseio.com",
  projectId: "audio-player-b6744",
  storageBucket: "audio-player-b6744.firebasestorage.app",
  messagingSenderId: "918829639854",
  appId: "1:918829639854:web:682f5bf594fb290e97a53f",
  measurementId: "G-4M2H2S3P63"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
