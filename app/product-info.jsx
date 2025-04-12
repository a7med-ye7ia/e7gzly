"use client"
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { useLocalSearchParams, useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons"

export default function ProductInfo() {
  const router = useRouter()
  const params = useLocalSearchParams()

  const interests = params.interests ? JSON.parse(params.interests) : []

  const photos = [
    params.image,
    params.image.replace("w=800", "w=801"), 
    params.image.replace("w=800", "w=802"),
  ]

  const handleBookNow = () => {
    router.push({
      pathname: "/booking-confirmation",
      params: {
        name: params.name,
        price: params.price,
      },
    })
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <Image source={{ uri: params.image }} style={styles.mainImage} resizeMode="cover" />

      <View style={styles.infoContainer}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{params.name}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.rating}>4.8</Text>
          </View>
        </View>
        <Text style={styles.location}>Popular destination</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.description}>{params.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Photos</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.photosScroll}>
            {photos.map((photo, index) => (
              <Image key={index} source={{ uri: photo }} style={styles.thumbnail} resizeMode="cover" />
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Interests</Text>
          <View style={styles.interestsContainer}>
            {interests.map((interest, index) => (
              <View key={index} style={styles.interestItem}>
                <Ionicons name="checkmark-circle" size={18} color="#6200EE" />
                <Text style={styles.interestText}>{interest}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.bookingContainer}>
          <View>
            <Text style={styles.priceLabel}>start from</Text>
            <Text style={styles.price}>IDR {params.price}</Text>
          </View>
          <TouchableOpacity style={styles.bookButton} onPress={handleBookNow}>
            <Text style={styles.bookButtonText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  mainImage: {
    width: "100%",
    height: 300,
  },
  infoContainer: {
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    backgroundColor: "#fff",
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  location: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#000",
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#444",
  },
  photosScroll: {
    flexDirection: "row",
    marginBottom: 10,
  },
  thumbnail: {
    width: 100,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  interestsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  interestItem: {
    flexDirection: "row",
    alignItems: "center",
    width: "50%",
    marginBottom: 10,
  },
  interestText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#333",
  },
  bookingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  priceLabel: {
    fontSize: 14,
    color: "#666",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  bookButton: {
    backgroundColor: "#6200EE",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  bookButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
})
