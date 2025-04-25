"use client"

import { useState, useEffect } from "react"
import { View, Text, Image, ScrollView, TouchableOpacity, Dimensions, Alert, TextInput } from "react-native"
import { useRouter } from "expo-router"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Ionicons } from "@expo/vector-icons"
import styles from '../styles/stylePages';



const destinations = [
  {
    id: 1,
    name: "Lake Ciliwung",
    location: "Tangerang, Indonesia",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
    rating: "4.8",
    featured: true,
    price: "2,500,000",
    museumLink: "https://www.museumnegara.id/en/" // Museum of Indonesia
  },
  {
    id: 2,
    name: "White House",
    location: "Washington, D.C., USA",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80",
    rating: "4.6",
    featured: true,
    price: "3,200,000",
    museumLink: "https://www.si.edu/museums" // Smithsonian Museums
  },
  {
    id: 3,
    name: "Danau Beratan",
    location: "Singajara, Indonesia",
    image: "https://images.unsplash.com/photo-1558005530-a7958896ec60?auto=format&fit=crop&w=800&q=80",
    rating: "4.5",
    featured: false,
    new: true,
    price: "1,800,000",
    museumLink: "https://www.baliartsandcraftsmuseum.com" // Bali Art and Craft Museum
  },
  {
    id: 4,
    name: "Sydney Opera",
    location: "Sydney, Australia",
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80",
    rating: "4.7",
    featured: false,
    new: true,
    price: "4,200,000",
    museumLink: "https://www.museumsaustralia.org.au" // Museums Australia
  },
  {
    id: 5,
    name: "Roma",
    location: "Rome, Italy",
    image: "https://images.unsplash.com/photo-1555992336-fb0d29498b13?auto=format&fit=crop&w=800&q=80",
    rating: "4.8",
    featured: false,
    new: true,
    price: "3,500,000",
    museumLink: "https://museivaticani.va/content/museivaticani/en.html" // Vatican Museums
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
    museumLink: "https://www.baliartsandcraftsmuseum.com" // Bali Art and Craft Museum
  },
  {
    id: 7,
    name: "Santorini",
    location: "Santorini, Greece",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80",
    rating: "4.7",
    featured: false,
    new: true,
    price: "3,800,000",
    museumLink: "https://www.santorini-museum.gr" // Santorini Museum
  },
  {
    id: 8,
    name: "Kyoto",
    location: "Kyoto, Japan",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
    rating: "4.6",
    featured: false,
    new: true,
    price: "3,900,000",
    museumLink: "https://www.kyotostation.com/museums" // Kyoto Museums
  },
]



const { width } = Dimensions.get("window")
const cardWidth = (width - 60) / 2

export default function FlightDestinations() {
  const router = useRouter()
  const [userName, setUserName] = useState("Kezia Anne")
  const [userEmail, setUserEmail] = useState("")
  const [profileImage, setProfileImage] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredDestinations, setFilteredDestinations] = useState(destinations)

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

  useEffect(() => {
    const filteredData = destinations.filter((destination) =>
        destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        destination.location.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredDestinations(filteredData)
  }, [searchQuery])

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

  const featuredDestinations = filteredDestinations.filter((dest) => dest.featured)
  const newDestinations = filteredDestinations.filter((dest) => dest.new)

  return (
      <ScrollView style={styles.containerFlight} showsVerticalScrollIndicator={false}>
        <View style={styles.headerFlight}>
          {/* Search Bar */}
          <TextInput
              style={styles.searchBar}
              placeholder="Where to fly today..?"
              onChangeText={(text) => setSearchQuery(text)}
              value={searchQuery}
          />
          <TouchableOpacity onPress={() => router.push("/profile")}>
            <Image
                source={require("../assets/default-avatar.jpg")}
                style={styles.profileIcon}
            />
          </TouchableOpacity>

        </View>




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

