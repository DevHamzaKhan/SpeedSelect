// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8ao8lzlGqycgHurXuYVV-KI9wmvtLYRM",
  authDomain: "speedselect-531aa.firebaseapp.com",
  projectId: "speedselect-531aa",
  storageBucket: "speedselect-531aa.appspot.com",
  messagingSenderId: "250726030514",
  appId: "1:250726030514:web:37c6d3a4881fb54d98fdab",
  measurementId: "G-8HMY853HT1"
};

// Initialize Firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);  // Initialize Firestore
const storage = getStorage(app);

export { auth, app, db, storage, analytics };  // Export Firestore