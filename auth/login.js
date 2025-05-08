import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../config/firebaseConfig" // Fixed import path

export const loginUser = async (email, password) => {
  try {
    // Add validation for email and password
    if (!email || !password) {
      return { user: null, error: { code: "auth/invalid-input", message: "Email and password are required" } }
    }

    // Trim the email to prevent whitespace issues
    const trimmedEmail = email.trim()

    console.log("Attempting login with:", trimmedEmail)

    const userCredential = await signInWithEmailAndPassword(auth, trimmedEmail, password)

    // Ensure we have a valid user object before returning success
    if (userCredential && userCredential.user) {
      console.log("✅ Login successful:", userCredential.user.email)
      return { user: userCredential.user, error: null }
    } else {
      // This shouldn't happen with Firebase, but just in case
      console.error("❌ Login Error: User credential is invalid")
      return { user: null, error: { code: "auth/invalid-credential", message: "Invalid user credential" } }
    }
  } catch (error) {
    console.error("❌ Login Error:", error.code, error.message)
    return { user: null, error }
  }
}
