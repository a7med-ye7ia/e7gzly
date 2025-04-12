"use client"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { useLocalSearchParams, useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons"

export default function BookingConfirmation() {
  const router = useRouter()
  const params = useLocalSearchParams()

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Ionicons name="checkmark-circle" size={80} color="#4CAF50" style={styles.icon} />
        <Text style={styles.title}>Booking Confirmed!</Text>
        <Text style={styles.message}>Your trip to {params.name} has been successfully booked.</Text>
        <Text style={styles.details}>Total amount: IDR {params.price}</Text>
        <Text style={styles.subtext}>A confirmation email has been sent to your registered email address.</Text>

        <TouchableOpacity style={styles.button} onPress={() => router.push("/flight-destinations")}>
          <Text style={styles.buttonText}>Back to Destinations</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 30,
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  message: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 15,
    color: "#555",
  },
  details: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 20,
    color: "#333",
  },
  subtext: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 30,
    color: "#777",
  },
  button: {
    backgroundColor: "#6200EE",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
})
