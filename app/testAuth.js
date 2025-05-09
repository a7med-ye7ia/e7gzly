// This is a test file to verify Firebase Auth is working correctly
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { initializeApp } from "firebase/app"

// Anwar's account config from firebaseConfig.js
const firebaseConfig = {
  apiKey: "AIzaSyApomx6BF-P6CKf-LkKMKVmSFEPJZRCymM",
  authDomain: "e7gzly-cs303.firebaseapp.com",
  projectId: "e7gzly-cs303",
  storageBucket: "e7gzly-cs303.firebasestorage.app",
  messagingSenderId: "1040130259562",
  appId: "1:1040130259562:web:44a8528a280024ee64a813",
  measurementId: "G-G5YGSYYB56",
}

// Initialize Firebase directly in this file for testing
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

// Test function to verify Firebase Auth is working
export const testFirebaseAuth = async (email, password) => {
  console.log("Testing Firebase Auth with:", email)

  try {
    // Try to sign in with the provided credentials
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    console.log("✅ Test login successful:", userCredential.user.email)
    return { success: true, user: userCredential.user, error: null }
  } catch (error) {
    console.error("❌ Test login error:", error.code, error.message)

    // If the error is user not found, we could try to create a test user
    if (error.code === "auth/user-not-found") {
      console.log("User not found, this is expected in a test")
    }

    return { success: false, user: null, error }
  }
}
