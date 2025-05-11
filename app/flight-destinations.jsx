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
  const [filteredDestinations, setFilteredDestinations] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const getData = async () => {
    try {
      if (!auth || !auth.currentUser || !auth.currentUser.email) {
        const storedUserName = await AsyncStorage.getItem("userName")
        const storedUserEmail = await AsyncStorage.getItem("userEmail")
        const storedProfilePic = await AsyncStorage.getItem("userProfilePic")

        if (storedUserName) setFirstName(storedUserName)
        if (storedUserEmail) setUserEmail(storedUserEmail)
        if (storedProfilePic) setProfileImage(storedProfilePic)
        return
      }

      const userEmail = auth.currentUser.email
      const data = await getUserById(userEmail)

      if (data) {
        setProfileImage(data.profilePictureURL ?? null)
        setFirstName(data.firstName ?? "")
        setUserEmail(userEmail)

        await AsyncStorage.setItem("userProfilePic", data.profilePictureURL ?? "")
        await AsyncStorage.setItem("userName", data.firstName ?? "")
        await AsyncStorage.setItem("userEmail", userEmail)
      }
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
        const storedUserName = await AsyncStorage.getItem("userName")
        const storedUserEmail = await AsyncStorage.getItem("userEmail")

        if (storedUserName) setFirstName(storedUserName)
        if (storedUserEmail) setUserEmail(storedUserEmail)
      }
    }

    checkLogin()
  }, [])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        getData()
      }
    })

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
            const flightData = doc.data();
            const ratings = flightData.ratings || [];
            const averageRating =
                ratings.length > 0
                    ? ratings.reduce((sum, r) => sum + r, 0) / ratings.length
                    : 0;

            getDestinations.push({
              id: doc.id,
              cityFromCode: flightData.cityFromCode,
              cityFromName: flightData.cityFromName,
              flightTime: flightData.flightTime,
              cityToCode: flightData.cityToCode,
              cityToName: flightData.cityToName,
              arrivalTime: flightData.arrivalTime,
              flightDuration: flightData.flightDuration,
              airLine: flightData.airLine,
              class: flightData.class,
              price: flightData.price,
              museumLink: flightData.museumLink,
              new: flightData.new,
              featured: flightData.featured,
              about: flightData.about,
              photos: flightData.photos,
              interests: flightData.interests,
              ratings: ratings,
              rating: averageRating.toFixed(1),
            })
          })

          setDestinations(getDestinations)
          setFilteredDestinations(getDestinations)
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
            destination.cityFromName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            destination.cityToName.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredDestinations(filteredData)
  }, [searchQuery, destinations])

  const navigateToProductInfo = (destination) => {
    router.push({
      pathname: "/main/product-info",
      params: {
        id: destination.id,
        cityFromCode: destination.cityFromCode,
        cityFromName: destination.cityFromName,
        cityToCode: destination.cityToCode,
        cityToName: destination.cityToName,
        flightTime: destination.flightTime,
        arrivalTime: destination.arrivalTime,
        flightDuration: destination.flightDuration,
        airLine: destination.airLine,
        class: destination.class,
        price: destination.price,
        new: destination.new,
        featured: destination.featured,
        about: destination.about,
        photos: destination.photos,
        interests: destination.interests,
        rating: destination.rating,
        showOnly: false,
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

        <TextInput
            style={styles.searchBar}
            placeholder="Search destinations..."
            onChangeText={(text) => setSearchQuery(text)}
            value={searchQuery}
        />

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Featured Destinations</Text>

          {isLoading ? (
              <Text>Loading featured destinations...</Text>
          ) : featuredDestinations.length > 0 ? (
              <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ paddingHorizontal: 10 }}
                  snapToInterval={cardWidth + 15}
                  decelerationRate="fast"
              >
                {featuredDestinations.map((destination) => (
                    <TouchableOpacity
                        key={destination.id}
                        style={[styles.featuredCard, { marginRight: 15, width: cardWidth, marginBottom: 15 }]}
                        onPress={() => navigateToProductInfo(destination)}
                    >
                      <Image source={{ uri: destination.photos[0] }} style={styles.featuredImage} />
                      {destination.rating && (
                          <View style={styles.ratingBadge}>
                            <Ionicons name="star" size={12} color="#FFD700" />
                            <Text style={styles.ratingText}>{destination.rating}</Text>
                          </View>
                      )}
                      <View style={styles.featuredInfo}>
                        <Text style={styles.destinationName}>{destination.cityToName}</Text>
                        <Text style={styles.destinationLocation}>{destination.cityFromName}</Text>
                      </View>
                    </TouchableOpacity>
                ))}
              </ScrollView>
          ) : (
              <Text>No featured destinations available</Text>
          )}
        </View>

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
                    <Image source={{ uri: destination.photos[0] }} style={styles.newDestinationImage} />
                    <View style={styles.newDestinationInfo}>
                      <View>
                        <Text style={styles.newDestinationName}>{destination.cityToName}</Text>
                        <Text style={styles.newDestinationLocation}>{destination.cityFromName}</Text>
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
