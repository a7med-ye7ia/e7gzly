"use client"

import { useState, useEffect } from "react"
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Dimensions, Alert } from "react-native"
import { useRouter } from "expo-router"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Ionicons } from "@expo/vector-icons"

const destinations = [
  {
    id: 1,
    name: "Lake Ciliwung",
    location: "Tangerang",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
    rating: "4.8",
    featured: true,
    price: "2,500,000",
  },
  {
    id: 2,
    name: "White House",
    location: "Spain",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80",
    rating: "4.6",
    featured: true,
    price: "3,200,000",
  },
  {
    id: 3,
    name: "Danau Beratan",
    location: "Singajara",
    image: "https://images.unsplash.com/photo-1558005530-a7958896ec60?auto=format&fit=crop&w=800&q=80",
    rating: "4.5",
    featured: false,
    new: true,
    price: "1,800,000",
  },
  {
    id: 4,
    name: "Sydney Opera",
    location: "Australia",
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80",
    rating: "4.7",
    featured: false,
    new: true,
    price: "4,200,000",
  },
  {
    id: 5,
    name: "Roma",
    location: "Italy",
    image: "https://images.unsplash.com/photo-1555992336-fb0d29498b13?auto=format&fit=crop&w=800&q=80",
    rating: "4.8",
    featured: false,
    new: true,
    price: "3,500,000",
  },
  {
    id: 6,
    name: "Bali",
    location: "Indonesia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
    rating: "4.9",
    featured: false,
    new: true,
    price: "2,100,000",
  },
  {
    id: 7,
    name: "Santorini",
    location: "Greece",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80",
    rating: "4.7",
    featured: false,
    new: true,
    price: "3,800,000",
  },
  {
    id: 8,
    name: "Kyoto",
    location: "Japan",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
    rating: "4.6",
    featured: false,
    new: true,
    price: "3,900,000",
  },
]

const { width } = Dimensions.get("window")
const cardWidth = (width - 60) / 2

export default function FlightDestinations() {
  const router = useRouter()
  const [userName, setUserName] = useState("Kezia Anne")
  const [userEmail, setUserEmail] = useState("")
  const [profileImage, setProfileImage] = useState(null)

  useEffect(() => {
    const checkLogin = async () => {
      const isLoggedIn = await AsyncStorage.getItem("isLoggedIn")
      if (!isLoggedIn) {
        router.replace("/")
      } else {
        // Fetch user data from AsyncStorage
        const storedUserName = await AsyncStorage.getItem("userName")
        const storedUserEmail = await AsyncStorage.getItem("userEmail")

        if (storedUserName) {
          setUserName(storedUserName)
        }

        if (storedUserEmail) {
          setUserEmail(storedUserEmail)
        }
      }
    }
    checkLogin()
  }, [])

  const handleSignOut = async () => {
    try {
      await AsyncStorage.removeItem("isLoggedIn")
      await AsyncStorage.removeItem("userName")
      await AsyncStorage.removeItem("userEmail")

      Alert.alert("Success", "You have been signed out successfully")
      router.replace("/")
    } catch (error) {
      Alert.alert("Error", "Failed to sign out")
    }
  }

  const navigateToProductInfo = (destination) => {
    router.push({
      pathname: "/product-info",
      params: {
        id: destination.id,
        name: destination.name,
        location: destination.location,
        image: destination.image,
        rating: destination.rating,
        price: destination.price,
      },
    })
  }

  const featuredDestinations = destinations.filter((dest) => dest.featured)
  const newDestinations = destinations.filter((dest) => dest.new)

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello,</Text>
          <Text style={styles.userName}>passenger</Text>
         
          <Text style={styles.searchPrompt}>Where to fly today?</Text>
        </View>
        {/* <View style={styles.profileContainer}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
            }}
            style={styles.profileImage}
          /> */}
          <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
            <Ionicons name="log-out-outline" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      {/* </View> */}

      {/* Featured Destinations */}
      <View style={styles.featuredContainer}>
        {featuredDestinations.map((destination, index) => (
          <TouchableOpacity
            key={destination.id}
            style={[styles.featuredCard, { marginRight: index === 0 ? 10 : 0 }]}
            onPress={() => navigateToProductInfo(destination)}
          >
            <Image source={{ uri: destination.image }} style={styles.featuredImage} />
            {destination.rating && (
              <View style={styles.ratingBadge}>
                <Ionicons name="star" size={12} color="#FFD700" />
                <Text style={styles.ratingText}>{destination.rating}</Text>
              </View>
            )}
            <View style={styles.featuredInfo}>
              <Text style={styles.destinationName}>{destination.name}</Text>
              <Text style={styles.destinationLocation}>{destination.location}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* New This Year Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>New This Year</Text>

        {newDestinations.map((destination) => (
          <TouchableOpacity
            key={destination.id}
            style={styles.newDestinationCard}
            onPress={() => navigateToProductInfo(destination)}
          >
            <Image source={{ uri: destination.image }} style={styles.newDestinationImage} />
            <View style={styles.newDestinationInfo}>
              <View>
                <Text style={styles.newDestinationName}>{destination.name}</Text>
                <Text style={styles.newDestinationLocation}>{destination.location}</Text>
              </View>
              <View style={styles.newDestinationRating}>
                <Ionicons name="star" size={14} color="#FFD700" />
                <Text style={styles.newDestinationRatingText}>{destination.rating}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 25,
    marginTop: 10,
  },
  greeting: {
    fontSize: 18,
    color: "#333",
  },
  userName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1a1a2e",
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  searchPrompt: {
    fontSize: 16,
    color: "#888",
    marginTop: 5,
  },
  profileContainer: {
    alignItems: "center",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 8,
  },
  signOutButton: {
    backgroundColor: "#FF3B30",
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  featuredContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  featuredCard: {
    width: cardWidth,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  featuredImage: {
    width: "100%",
    height: 150,
    borderRadius: 16,
  },
  ratingBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 3,
  },
  featuredInfo: {
    padding: 12,
  },
  destinationName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  destinationLocation: {
    fontSize: 14,
    color: "#888",
    marginTop: 2,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a1a2e",
    marginBottom: 15,
  },
  newDestinationCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  newDestinationImage: {
    width: 70,
    height: 70,
    borderRadius: 12,
    margin: 10,
  },
  newDestinationInfo: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 15,
  },
  newDestinationName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  newDestinationLocation: {
    fontSize: 14,
    color: "#888",
  },
  newDestinationRating: {
    flexDirection: "row",
    alignItems: "center",
  },
  newDestinationRatingText: {
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 3,
  },
})
