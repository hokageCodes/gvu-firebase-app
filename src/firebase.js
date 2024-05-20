import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBII5KM9BJIMITaZe-2qr6_gWrm-FU-DW8",
  authDomain: "glorius-uni.firebaseapp.com",
  projectId: "glorius-uni",
  storageBucket: "glorius-uni.appspot.com",
  messagingSenderId: "790327420734",
  appId: "1:790327420734:web:93d65252a48d82a644ae6f",
  measurementId: "G-R2JCXNT45C"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };


