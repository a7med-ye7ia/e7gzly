import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native"
import { useLocalSearchParams, useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import styles from '../../styles/stylePages'
import { AirbnbRating } from 'react-native-ratings';
import React from 'react';
import {addRating , getFlightById} from "../../services/flightService";
import { useEffect } from 'react';

export default function ProductInfo() {
  const router = useRouter()
  const params = useLocalSearchParams()

  const [cityFrom, cityTo] = [params.cityFromName, params.cityToName]
  const photoArray = (params.photos || '').split(',')
  const [rating, setRating] = React.useState(0);
  const [averageRating, setAverageRating] = React.useState(0);
  const photos = [
    photoArray[1] || '',
    (photoArray[2] || '').replace("w=800", "w=801"),
    (photoArray[3] || '').replace("w=800", "w=802"),
  ]

  const showOnly = params.showOnly === 'true'

  const handleDetailTraveler = () => {
    router.push({
      pathname: "/Book",
      params: {
        id: params.id,
        cityFromCode: params.cityFromCode,
        cityFromName: params.cityFromName,
        cityToCode: params.cityToCode,
        cityToName: params.cityToName,
        price: params.price,
      },
    })
  }
  useEffect(() => {
    if (params?.id) {
      fetchFlightData(params.id);
    }
  }, [params?.id]);

// Handle rating and refresh average
  const handleRating = async (rating) => {
    setRating(rating);
    await addRating(params.id, rating); // Add rating to Firestore
    fetchFlightData(params.id);         // Refresh average rating
  };
  const fetchFlightData = async (flightId) => {
    try {
      const flight = await getFlightById(flightId);
      const ratingsArray = Array.isArray(flight.ratings) ? flight.ratings : [];
      const average =
          ratingsArray.length > 0
              ? ratingsArray.reduce((sum, r) => sum + r, 0) / ratingsArray.length
              : 0;
      setAverageRating(average);
      setAverageRating(average)
      console.log("Flight Ratings:", flight.ratings); // [4, 5, 3, ...]
      console.log("Average Rating:", averageRating); // e.g. 4.2
    } catch (error) {
      console.error("Error fetching flight data:", error);
    }
  };

  return (
    <ScrollView style={styles.containerProduct}>
      <View style={styles.headerProduct}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {photoArray[0] ? (
        <Image source={{ uri: photoArray[0] }} style={styles.mainImage} resizeMode="cover" />
      ) : null}

      <View style={styles.infoContainer}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{params.cityToName || 'Unknown Destination'}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.rating}>{averageRating}</Text>
          </View>
        </View>
        <Text style={styles.location}>Popular destination</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.description}>{params.about || 'No description available.'}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Photos</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.photosScroll}>
            {photos.map((photo, index) => (
              photo ? (
                <Image
                  key={index}
                  source={{ uri: photo }}
                  style={styles.thumbnail}
                  resizeMode="cover"
                />
              ) : null
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Interests</Text>
          <View style={styles.interestsContainer}>
            {/* Interest items will be added here when available */}
          </View>
        </View>

        <AirbnbRating
            defaultRating={0}
            onFinishRating={handleRating}
            showRating={false}
        />

        {!showOnly && (
          <View style={styles.bookingContainer}>
            <View>
              <Text style={styles.priceLabel}>start from</Text>
              <Text style={styles.price}>IDR {params.price}</Text>
            </View>
            <TouchableOpacity style={styles.bookButton} onPress={handleDetailTraveler}>
              <Text style={styles.bookButtonText}>Book Now</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  )
}