// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCL6gV09dYP9np0MBPqKQ24-arvYcct4_M",
  authDomain: "speedselect-d9d35.firebaseapp.com",
  projectId: "speedselect-d9d35",
  storageBucket: "speedselect-d9d35.appspot.com",
  messagingSenderId: "164463142792",
  appId: "1:164463142792:web:4407087c01f4a5ed43fc3d",
  measurementId: "G-F8L9HC881Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const storage = getStorage(app);

const db = getFirestore(app);

export { auth, app, db, storage }; // Export Firestore