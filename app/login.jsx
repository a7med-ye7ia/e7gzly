"use client"

import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from "react-native"
import { useState, useEffect } from "react"
import { router } from "expo-router"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { loginUser } from "../auth/login"
import styles from "../styles/stylesAuth"

export default function LoginScreen() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [focusedField, setFocusedField] = useState(null)
  const [loginError, setLoginError] = useState(null)

  useEffect(() => {
    const checkLoginStatus = async () => {
      const isLoggedIn = await AsyncStorage.getItem("isLoggedIn")
      if (isLoggedIn === "true") {
        router.replace("./flight-destinations")
      }
    }
    checkLoginStatus()
  }, [])

  // Add proper error handling for AsyncStorage operations
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill out both fields")
      return
    }

    setLoading(true)
    setLoginError(null)

    try {
      console.log("Attempting login with email:", email)
      const { user, error } = await loginUser(email, password)

      if (user) {
        try {
          // Make sure we have the user email
          const userEmail = user.email || email

          // Store all items in a single operation for better atomicity
          await Promise.all([
            AsyncStorage.setItem("isLoggedIn", "true"),
            AsyncStorage.setItem("userName", user.displayName || ""),
            AsyncStorage.setItem("userEmail", userEmail),
          ])

          console.log("Data saved successfully:", {
            isLoggedIn: "true",
            userName: user.displayName || "",
            userEmail: userEmail,
          })

          // Small delay to ensure Firebase auth is fully initialized
          setTimeout(() => {
            router.replace("./flight-destinations")
          }, 500)
        } catch (storageError) {
          console.error("AsyncStorage error:", storageError)
          Alert.alert("Storage Error", "Failed to save login information")
        }
      } else {
        setLoginError(error)
        handleLoginError(error)
      }
    } catch (e) {
      console.error("Login process error:", e)
      setLoginError(e)
      Alert.alert("Login Failed", "An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleLoginError = (error) => {
    if (error.code === "auth/invalid-email") {
      Alert.alert("Invalid Email", "The email address is not valid")
    } else if (error.code === "auth/user-not-found") {
      Alert.alert("User Not Found", "No account found with this email")
    } else if (error.code === "auth/wrong-password") {
      Alert.alert("Wrong Password", "The password is incorrect")
    } else if (error.code === "auth/invalid-credential") {
      Alert.alert("Invalid Credentials", "The email or password is incorrect")
    } else {
      Alert.alert("Login Failed", error.message || "Authentication failed")
    }
  }

  return (
    <ScrollView style={styles.containerLogin}>
      <Text style={styles.title}>Log In</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>E-mail</Text>
        <TextInput
          placeholder="Enter your Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          style={[styles.input, focusedField === "email" && styles.inputFocused]}
          onFocus={() => setFocusedField("email")}
          onBlur={() => setFocusedField(null)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Password</Text>
        <TextInput
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={[styles.input, focusedField === "password" && styles.inputFocused]}
          onFocus={() => setFocusedField("password")}
          onBlur={() => setFocusedField(null)}
        />
      </View>

      {loginError && (
        <Text style={styles.errorText || { color: "red", marginBottom: 10 }}>
          {loginError.message || "Login failed. Please try again."}
        </Text>
      )}

      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
      )}

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => router.push("./login/ForgetPassword")}>
          <Text style={styles.footerText}>Forgot password?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("./login/SignUp")}>
          <Text style={styles.footerLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}
