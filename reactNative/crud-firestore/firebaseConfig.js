import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZmeWSl6Iryc-yLRAiHtUeV9Ni6qHKDLY",
  authDomain: "loja-e6680.firebaseapp.com",
  projectId: "loja-e6680",
  storageBucket: "loja-e6680.firebasestorage.app",
  messagingSenderId: "801943117262",
  appId: "1:801943117262:web:06321380b25f48ac4c1f9f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };