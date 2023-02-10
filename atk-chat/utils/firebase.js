// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

/// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA45QJxWrxoIQh8ipUxjznEMDQPZvi--y0",
  authDomain: "atk-chat.firebaseapp.com",
  projectId: "atk-chat",
  storageBucket: "atk-chat.appspot.com",
  messagingSenderId: "261899106877",
  appId: "1:261899106877:web:8648a645d6078443704854",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);