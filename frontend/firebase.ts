// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkgEV_bJ-nB13LXnfj_vwNe8caNo8h6Z0",
  authDomain: "navig-6bac9.firebaseapp.com",
  projectId: "navig-6bac9",
  storageBucket: "navig-6bac9.firebasestorage.app",
  messagingSenderId: "333267020636",
  appId: "1:333267020636:web:1a2f8eaca3afade711ef99"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider();