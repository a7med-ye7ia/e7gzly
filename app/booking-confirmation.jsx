"use client"
import { View, Text, TouchableOpacity } from "react-native"
import { useLocalSearchParams, useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import styles from '../styles/stylePages';


export default function BookingConfirmation() {
  const router = useRouter()
  const params = useLocalSearchParams()

  return (
    <View style={styles.containerBooking}>
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


