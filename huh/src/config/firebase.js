// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhVZ8axF34RrxQHri92iV-eRggHBPPDnA",
  authDomain: "huh-proj-8b0e7.firebaseapp.com",
  projectId: "huh-proj-8b0e7",
  storageBucket: "huh-proj-8b0e7.appspot.com",
  messagingSenderId: "934105366411",
  appId: "1:934105366411:web:ed8d7ed30f6d94540b398e",
  measurementId: "G-R5677J6V3Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)