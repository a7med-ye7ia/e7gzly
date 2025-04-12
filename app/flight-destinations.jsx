"use client"

import { useState, useEffect } from "react"
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Alert,
  TextInput,
  BackHandler,
  TouchableOpacity,
} from "react-native"
import { useRouter } from "expo-router"
import AsyncStorage from "@react-native-async-storage/async-storage"

const destinations = [
  {
    id: 1,
    name: "Paris",
    description: "Experience the city of lights with its iconic Eiffel Tower and world-class cuisine.",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
    price: "1,500,000",
    interests: ["Eiffel Tower", "Louvre Museum", "Notre Dame", "Seine River"],
  },
  {
    id: 2,
    name: "Tokyo",
    description: "Discover the perfect blend of traditional culture and cutting-edge technology.",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80",
    price: "2,200,000",
    interests: ["Tokyo Tower", "Shibuya Crossing", "Imperial Palace", "Senso-ji Temple"],
  },
  {
    id: 3,
    name: "New York",
    description: "Explore the Big Apple with its stunning skyline and diverse neighborhoods.",
    image: "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=800&q=80",
    price: "2,000,000",
    interests: ["Times Square", "Central Park", "Statue of Liberty", "Broadway"],
  },
  {
    id: 4,
    name: "Bali",
    description: "Relax on pristine beaches and immerse yourself in rich Balinese culture.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    price: "1,200,000",
    interests: ["Kuta Beach", "Ubud Monkey Forest", "Tanah Lot", "Mount Batur"],
  },
  {
    id: 5,
    name: "Rome",
    description: "Walk through history in the eternal city with ancient ruins and Renaissance art.",
    image: "https://images.unsplash.com/photo-1506976785307-8732e854ad70?auto=format&fit=crop&w=800&q=80",
    price: "1,800,000",
    interests: ["Colosseum", "Vatican City", "Trevi Fountain", "Roman Forum"],
  },
  {
    id: 6,
    name: "Sydney",
    description: "Enjoy the stunning harbor views and laid-back Australian lifestyle.",
    image: "https://images.unsplash.com/photo-1506089676908-3592f7389d4d?auto=format&fit=crop&w=800&q=80",
    price: "2,300,000",
    interests: ["Sydney Opera House", "Bondi Beach", "Harbour Bridge", "Taronga Zoo"],
  },
]

export default function FlightDestinations() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredDestinations, setFilteredDestinations] = useState(destinations)
  const [userName, setUserName] = useState("")

  useEffect(() => {
    const checkLogin = async () => {
      const isLoggedIn = await AsyncStorage.getItem("isLoggedIn")
      if (!isLoggedIn) {
        router.replace("/")
      } else {
        // Fetch username from AsyncStorage
        const storedUserName = await AsyncStorage.getItem("userName")
        if (storedUserName) {
          setUserName(storedUserName)
        }
      }
    }
    checkLogin()

    const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      router.replace("/")
      return true
    })

    return () => {
      backHandler.remove()
    }
  }, [])

  const handleSignOut = async () => {
    await AsyncStorage.removeItem("isLoggedIn")
    Alert.alert("Signed Out", "You have been signed out successfully.")
    router.replace("/")
  }

  // Filter destinations based on search query
  useEffect(() => {
    const filtered = destinations.filter((destination) =>
      destination.name.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    setFilteredDestinations(filtered)
  }, [searchQuery])

  const navigateToProductInfo = (destination) => {
    router.push({
      pathname: "/product-info",
      params: {
        id: destination.id,
        name: destination.name,
        description: destination.description,
        image: destination.image,
        price: destination.price,
        interests: JSON.stringify(destination.interests),
      },
    })
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        {userName ? <Text style={styles.welcomeText}>Hello, {userName}</Text> : null}
        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Popular Flight Destinations</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search destinations..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {filteredDestinations.map((destination) => (
        <View key={destination.id} style={styles.card}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: destination.image }} style={styles.image} resizeMode="cover" />
          </View>

          <View style={styles.content}>
            <Text style={styles.name}>{destination.name}</Text>
            <Text style={styles.description}>{destination.description}</Text>
            <TouchableOpacity style={styles.bookButton} onPress={() => navigateToProductInfo(destination)}>
              <Text style={styles.bookText}>Book Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  signOutButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#FF3B30",
    borderRadius: 8,
  },
  signOutText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  searchInput: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 24,
    fontSize: 16,
  },
  card: {
    marginBottom: 30,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 3,
    backgroundColor: "#f9f9f9",
  },
  imageContainer: {
    width: "100%",
    height: 200,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  content: {
    padding: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginBottom: 12,
  },
  bookButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  bookText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
})
