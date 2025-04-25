// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmHoALMTQOkn06r0-Iy8eSFq4_2fAfu9Q",
  authDomain: "project-cs303-84419.firebaseapp.com",
  projectId: "project-cs303-84419",
  storageBucket: "roject-cs303-84419.firebaseapp.com",
  messagingSenderId: "653661725929",
  appId: "1:653661725929:android:ca1c57267dfdf2479ffc78"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

export { db , app , auth};