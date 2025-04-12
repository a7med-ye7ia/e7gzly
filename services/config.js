// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmRZjjOdCxXfPJaR2m_Q0PU06NenW9E2U",
  authDomain: "e7gzly-d6da2.firebaseapp.com",
  projectId: "e7gzly-d6da2",
  storageBucket: "e7gzly-d6da2.firebasestorage.app",
  messagingSenderId: "1004466571237",
  appId: "1:1004466571237:web:813bc21578d8df56a9110c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

export { db , app , auth};