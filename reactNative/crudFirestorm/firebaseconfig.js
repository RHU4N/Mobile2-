import { initializeApp } from "firebase/app";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth, getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDh1ryd0nV_mGrzSQEslxZ5EzsnI81m6Go",
  authDomain: "crudfirestorm-4d1a6.firebaseapp.com",
  projectId: "crudfirestorm-4d1a6",
  storageBucket: "crudfirestorm-4d1a6.firebasestorage.app",
  messagingSenderId: "412540821325",
  appId: "1:412540821325:web:85bc0b08208af656e7a104"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch {
  auth = getAuth(app);
}

export { auth, db };