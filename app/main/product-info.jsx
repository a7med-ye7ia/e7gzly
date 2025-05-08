import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native"
import { useLocalSearchParams, useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import styles from '../../styles/stylePages';
import { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from "react";



export default function ProductInfo() {
  const router = useRouter()
  const params = useLocalSearchParams()

  const [isWishlisted, setIsWishlisted] = useState(false);

  const interests = params.interests ? JSON.parse(params.interests) : []

  const photos = [
    params.image,
    params.image.replace("w=800", "w=801"), 
    params.image.replace("w=800", "w=802"),
  ]

  const handleBookNow = () => {
    router.push({
      pathname: "/main/booking-confirmation",
      params: {
        name: params.name,
        price: params.price,
      },
    })
  } 

  const handelDetailTraveler = () => {
    router.push({
      pathname: "/book/DetailTraveler",
      params: {
        name: params.name,
        price: params.price,
      },
    })
  }


  useEffect(() => {
    const loadWishlist = async () => {
      try {
        const storedWishlist = await AsyncStorage.getItem('wishlist');
        const wishlist = storedWishlist ? JSON.parse(storedWishlist) : [];
        // Check if any item in wishlist has matching ID
        const isSaved = wishlist.some(item => item.id === params.id);
        setIsWishlisted(isSaved);
      } catch (error) {
        console.error('Failed to load wishlist:', error);
      }
    };
  
    loadWishlist();
  }, [params.id]); // Add params.id as dependency

  const toggleWishlist = async () => {
    try {
      const storedWishlist = await AsyncStorage.getItem('wishlist');
      let wishlist = storedWishlist ? JSON.parse(storedWishlist) : [];
      
      // Find if item exists with this ID
      const existingIndex = wishlist.findIndex(item => item.id === params.id);
  
      if (existingIndex > -1) {
        // Remove from wishlist
        wishlist.splice(existingIndex, 1);
      } else {
        // Add to wishlist with full data
        wishlist.push({
          id: params.id,
          name: params.name,
          location: params.location,
          image: params.image,
          rating: params.rating,
          price: params.price,
          description: params.description,
          interests: interests
        });
      }
  
      await AsyncStorage.setItem('wishlist', JSON.stringify(wishlist));
      setIsWishlisted(!isWishlisted);
    } catch (error) {
      console.error('Error updating wishlist:', error);
    }
  };

  return (
    <ScrollView style={styles.containerProduct}>
      <View style={styles.headerProduct}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <Image source={{ uri: params.image }} style={styles.mainImage} resizeMode="cover" />



<View style={styles.infoContainer}>
  <View style={styles.titleRow}>
    
    {/* Heart icon */}
   <TouchableOpacity onPress={toggleWishlist} style={{ marginRight: 8 }}>
    <Ionicons
      name={isWishlisted ? "heart" : "heart-outline"}
      size={24}
      color="#FF0000"
    />
  </TouchableOpacity>


    {/* Title */}
    <Text style={styles.title}>{params.name}</Text>

    {/* Rating */}
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
          <TouchableOpacity style={styles.bookButton} onPress={handelDetailTraveler}>
            <Text style={styles.bookButtonText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}


