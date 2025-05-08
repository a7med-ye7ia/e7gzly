"use client"

import { useState, useEffect } from "react"
import { View, Text, Image, ScrollView, TouchableOpacity, Dimensions, TextInput } from "react-native"
import { useRouter } from "expo-router"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Ionicons } from "@expo/vector-icons"
import styles from "../styles/stylePages"
import { getAllFlights } from "../services/flightService"
import { getUserById } from "../services/userService"
import { auth } from "../config/firebaseConfig"
import defaultImage from "../assets/default-avatar.jpg"

const { width } = Dimensions.get("window")
const cardWidth = (width - 60) / 2


export default function FlightDestinations() {
  const router = useRouter()
  const [userFirstName, setFirstName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [profileImage, setProfileImage] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [destinations, setDestinations] = useState([])


  const [filteredDestinations, setFilteredDestinations] = useState(destinations)
  const [isLoading, setIsLoading] = useState(false)

  const getData = async () => {
    console.log("Fetching user data")
    try {
      // Check if auth is initialized and user is logged in
      if (!auth || !auth.currentUser) {
        console.log("Auth not initialized or user not logged in yet")
        // Try to get user info from AsyncStorage instead
        const storedUserName = await AsyncStorage.getItem("userName")
        const storedUserEmail = await AsyncStorage.getItem("userEmail")
        const storedProfilePic = await AsyncStorage.getItem("userProfilePic")

        if (storedUserName) setFirstName(storedUserName)
        if (storedUserEmail) setUserEmail(storedUserEmail)
        if (storedProfilePic) setProfileImage(storedProfilePic)

        return
      }

      const userEmail = auth.currentUser.email
      if (!userEmail) {
        console.error("User is logged in but email is missing")
        return
      }

      const data = await getUserById(userEmail)

      if (data) {
        setProfileImage(data.profilePictureURL ?? null)
        setFirstName(data.firstName ?? "")

        // Store in AsyncStorage for future use
        await AsyncStorage.setItem("userProfilePic", data.profilePictureURL ?? "")
        await AsyncStorage.setItem("userName", data.firstName ?? "")
      } else {
        console.warn("User data not found")
      }

      console.log("fetched", userEmail)
    } catch (error) {
      console.error("Error fetching user data:", error)
    }
  }

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
          setFirstName(storedUserName) // Fixed: using the correct setter
        }

        if (storedUserEmail) {
          setUserEmail(storedUserEmail)
        }
      }
    }

    checkLogin()
  }, [])

  useEffect(() => {
    // Set up auth state listener
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("User is signed in:", user.email)
        getData() // Fetch user data when auth state changes to signed in
      } else {
        console.log("User is signed out")
        // Handle signed out state
      }
    })

    // Clean up subscription
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    const getFlights = async () => {
      setIsLoading(true)
      try {
        const { success, data, error } = await getAllFlights()
        if (success && data) {
          const getDestinations = []

          data.forEach((doc) => {
            console.log("fetching flights from fireStore:", doc.data().name)
            getDestinations.push({
              id: doc.id,
              name: doc.data().name,
              location: doc.data().location,
              image: doc.data().image,
              rating: doc.data().rating,
              featured: doc.data().featured,
              price: doc.data().price,
              museumLink: doc.data().museumLink,
              new: doc.data().new,
            })
          })

          setDestinations(getDestinations)
          setFilteredDestinations(getDestinations) // Initialize filtered destinations
        } else if (error) {
          console.error("Error fetching flights:", error)
        }
      } catch (error) {
        console.error("Exception fetching flights:", error)
      } finally {
        setIsLoading(false)
      }
    }

    getFlights()
  }, [])

  useEffect(() => {
    const filteredData = destinations.filter(
      (destination) =>
        destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        destination.location.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    setFilteredDestinations(filteredData)
  }, [searchQuery, destinations])

  const navigateToProductInfo = (destination) => {
    router.push({
      pathname: "/main/product-info",
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

  const featuredDestinations = filteredDestinations.filter((dest) => dest.featured)
  const newDestinations = filteredDestinations.filter((dest) => dest.new)

  return (
    <ScrollView style={styles.containerFlight} showsVerticalScrollIndicator={false}>
      <View style={styles.headerFlight}>
        <View>
          <Text style={styles.greeting}>Hello,</Text>
          <Text style={styles.userName}>{userFirstName}</Text>
          <Text style={styles.searchPrompt}>Where to fly today?</Text>
        </View>
        <TouchableOpacity onPress={() => router.push("/profile/profile")}>
          <Image source={profileImage ? { uri: profileImage } : defaultImage} style={styles.profileIcon} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search destinations..."
        onChangeText={(text) => setSearchQuery(text)}
        value={searchQuery}
      />

      {/* Featured Destinations */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Featured Destinations</Text>

        {isLoading ? (
          <Text>Loading featured destinations...</Text>
        ) : featuredDestinations.length > 0 ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 10 }}
            snapToInterval={cardWidth + 15} // Add this for snapping effect
            decelerationRate="fast" // Add this for better scrolling
          >
            {featuredDestinations.map((destination) => (
              <TouchableOpacity
                key={destination.id}
                style={[styles.featuredCard, { marginRight: 15, width: cardWidth }]}
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
          </ScrollView>
        ) : (
          <Text>No featured destinations available</Text>
        )}
      </View>

      {/* New This Year Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>New This Year</Text>

        {isLoading ? (
          <Text>Loading new destinations...</Text>
        ) : newDestinations.length > 0 ? (
          newDestinations.map((destination) => (
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
          ))
        ) : (
          <Text>No new destinations available</Text>
        )}
      </View>
    </ScrollView>
  )
}
