import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore"


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABH9G6qDeCKOOAuRgezVIVfdw67Z79MYo",
  authDomain: "campusconnect-b6d52.firebaseapp.com",
  projectId: "campusconnect-b6d52",
  storageBucket: "campusconnect-b6d52.firebasestorage.app",
  messagingSenderId: "36270548736",
  appId: "1:36270548736:web:8f195564d4119af031f5e5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireAuth = getAuth(app);

const db = getFirestore(app);

export { app, fireAuth, db };