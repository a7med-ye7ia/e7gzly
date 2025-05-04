"use client"

import { useState, useEffect } from "react"
import { View, Text, Image, ScrollView, TouchableOpacity, Dimensions, Alert, TextInput } from "react-native"
import { useRouter } from "expo-router"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Ionicons } from "@expo/vector-icons"
import styles from '../styles/stylePages';
import { getDocuments } from "../services/uploads"

const { width } = Dimensions.get("window")
const cardWidth = (width - 60) / 2

export default function FlightDestinations() {
  const router = useRouter()
  const [userName, setUserName] = useState("Kezia Anne")
  const [userEmail, setUserEmail] = useState("")
  const [profileImage, setProfileImage] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [destinations, setDestinations] = useState([])
  const [filteredDestinations, setFilteredDestinations] = useState(destinations)
  const [isLoading, setIsLoading] = useState(false) // ! use it to put a loading animation

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
    const getFlights = async () => {
      const flights = await getDocuments('flights-destinations');
      const getDestinations = [];

      flights.forEach((doc) => {
        console.log('fetching flights from fireStore:', doc.data().name);
        getDestinations.push({
          id: doc.id,
          name: doc.data().name,
          location: doc.data().location,
          image: doc.data().image,
          rating: doc.data().rating,
          featured: doc.data().featured,
          price: doc.data().price,
          museumLink: doc.data().museumLink,
          new : doc.data().new,
        })
      });
      console.log("=====================");

      setDestinations(getDestinations);
      setFilteredDestinations(getDestinations);
    };
    
    setIsLoading(true);
    getFlights();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const filteredData = destinations.filter((destination) =>
        destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        destination.location.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredDestinations(filteredData)
  }, [searchQuery])

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

