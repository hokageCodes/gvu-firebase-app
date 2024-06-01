import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {

  apiKey: "AIzaSyBAYrRx2sBPBuptAH5AZbFP2ct-vpYsfZg",

  authDomain: "gvu-pqs-ce195.firebaseapp.com",

  projectId: "gvu-pqs-ce195",

  storageBucket: "gvu-pqs-ce195.appspot.com",

  messagingSenderId: "567169905493",

  appId: "1:567169905493:web:38a6499adb070e8e5c75dc",

  measurementId: "G-NXQNNMDJ3Z"

};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };


