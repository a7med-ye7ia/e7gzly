"use client"

import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native"
import { router } from "expo-router"
import { signUpUser } from "../../auth/signUp"
import { addUserWithId } from "../../services/userService"

import styles from "../../styles/stylesAuth"

const SignUpScreen = () => {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [passwordError, setPasswordError] = useState("")
  const [focusedField, setFocusedField] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const validatePassword = () => {
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match")
      return false
    }
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters")
      return false
    }
    setPasswordError("")
    return true
  }

  const handleSignUp = async () => {
    if (isLoading) return

    if (!fullName || !email || !password || !confirmPassword) {
      Alert.alert("Missing Info", "Please fill in all fields.")
      return
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email.")
      return
    }

    if (!validatePassword()) return

    setIsLoading(true)

    try {
      const { user, error } = await signUpUser(email, password)

      if (error) {
        let message = "Something went wrong."
        if (error.code === "auth/email-already-in-use") {
          message = "This email is already registered."
        } else if (error.code === "auth/invalid-email") {
          message = "Invalid email address."
        } else if (error.code === "auth/weak-password") {
          message = "Password should be at least 6 characters."
        }
        Alert.alert("Sign Up Failed", message)
        setIsLoading(false)
        return
      }

      if (user) {
        // Update the user profile with display name
        try {
          await user.updateProfile({
            displayName: fullName,
          })
        } catch (profileError) {
          console.warn("Could not update profile:", profileError)
        }

        const nameParts = fullName.trim().split(" ")
        const firstName = nameParts[0]
        const lastName = nameParts.slice(1).join(" ") || ""

        const userData = {
          firstName,
          lastName,
          email,
          phone: null,
          bookedTrips: [],
          tripsHistory: [],
          isAdmin: false,
          profilePictureURL: null,
          createdAt: new Date().toISOString(),
        }

        const result = await addUserWithId(user.email, userData)

        if (result.success) {
          Alert.alert("Success", "Account created successfully!", [
            { text: "OK", onPress: () => router.replace("/login") },
          ])
        } else {
          console.error("Error saving user data:", result.error)
          Alert.alert("Database Error", "Account created but failed to save user data.")
        }
      }
    } catch (error) {
      console.error("Unexpected error during sign up:", error)
      Alert.alert("Error", "An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ScrollView style={styles.containerSigUp}>
      <Text style={styles.title}>Sign up</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          placeholder="Enter your full name"
          value={fullName}
          onChangeText={setFullName}
          style={[styles.input, focusedField === "fullName" && styles.inputFocused]}
          onFocus={() => setFocusedField("fullName")}
          onBlur={() => setFocusedField(null)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>E-mail</Text>
        <TextInput
          placeholder="Enter an Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={[styles.input, focusedField === "email" && styles.inputFocused]}
          onFocus={() => setFocusedField("email")}
          onBlur={() => setFocusedField(null)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          placeholder="Enter a password"
          value={password}
          onChangeText={(text) => {
            setPassword(text)
            if (confirmPassword) validatePassword()
          }}
          secureTextEntry={!showPassword}
          style={[styles.input, focusedField === "password" && styles.inputFocused]}
          onFocus={() => setFocusedField("password")}
          onBlur={() => setFocusedField(null)}
        />
        <TouchableOpacity style={styles.toggleButton} onPress={() => setShowPassword(!showPassword)}>
          <Text style={styles.toggleText}>{showPassword ? "Hide" : "Show"}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          placeholder="Confirm your password"
          value={confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text)
            validatePassword()
          }}
          secureTextEntry={!showPassword}
          onBlur={() => {
            setFocusedField(null)
            validatePassword()
          }}
          onFocus={() => setFocusedField("confirmPassword")}
          style={[
            styles.input,
            focusedField === "confirmPassword" && styles.inputFocused,
            passwordError ? styles.errorInput : null,
          ]}
        />
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
      </View>

      <View style={styles.divider} />

      <TouchableOpacity
        style={[styles.primaryButton, isLoading && styles.disabledButton]}
        onPress={handleSignUp}
        disabled={isLoading}
      >
        <Text style={styles.primaryButtonText}>{isLoading ? "Creating Account..." : "Sign Up"}</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => router.push("/login")}>
          <Text style={styles.footerLink}>Log In</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default SignUpScreen
