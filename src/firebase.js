// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTSNgO1nGvSdV1zpvf1nHCnG0uw2ZwYHY",
  authDomain: "roomdesigner-e1e1a.firebaseapp.com",
  projectId: "roomdesigner-e1e1a",
  storageBucket: "roomdesigner-e1e1a.firebasestorage.app",
  messagingSenderId: "179675558029",
  appId: "1:179675558029:web:53d154084d78009d2c32c4",
  measurementId: "G-YYGHN5FSP7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);