import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDLrR7lWRIWgz9TtmDUJXpk23Y1B3FJo6k",
  authDomain: "inventorysystem-b0ea2.firebaseapp.com",
  projectId: "inventorysystem-b0ea2",
  storageBucket: "inventorysystem-b0ea2.firebasestorage.app",
  messagingSenderId: "962117606797",
  appId: "1:962117606797:web:06925a315413ad62e5f1c4"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
