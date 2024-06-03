import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCaFOwRbk_E1GUnHERQ2DknVtY2QEoy5aU",
  authDomain: "glorius-test.firebaseapp.com",
  projectId: "glorius-test",
  storageBucket: "glorius-test.appspot.com",
  messagingSenderId: "1068505035492",
  appId: "1:1068505035492:web:e5e1af8f4848f89dd3b2f1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };


