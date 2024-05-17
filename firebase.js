// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyBII5KM9BJIMITaZe-2qr6_gWrm-FU-DW8",
  authDomain: "glorius-uni.firebaseapp.com",
  projectId: "glorius-uni",
  storageBucket: "glorius-uni.appspot.com",
  messagingSenderId: "790327420734",
  appId: "1:790327420734:web:93d65252a48d82a644ae6f",
  measurementId: "G-R2JCXNT45C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);