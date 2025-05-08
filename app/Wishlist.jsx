import { View, Text, FlatList, TouchableOpacity, Image,ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/stylePages';

export default function Wishlist() {
  const router = useRouter();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWishlist = async () => {
      try {
        const storedWishlist = await AsyncStorage.getItem('wishlist');
        setWishlistItems(storedWishlist ? JSON.parse(storedWishlist) : []);
      } catch (error) {
        console.error('Error loading wishlist:', error);
      } finally {
        setLoading(false);
      }
    };
    loadWishlist();
  }, []);

  const removeFromWishlist = async (id) => {
    try {
      const updatedWishlist = wishlistItems.filter(item => item.id !== id);
      await AsyncStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      setWishlistItems(updatedWishlist);
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  const navigateToProduct = (item) => {
    router.push({
      pathname: "/main/product-info",
      params: {
        id: item.id,
        name: item.name,
        location: item.location,
        image: item.image,
        rating: item.rating,
        price: item.price,
        description: item.description,
        interests: JSON.stringify(item.interests || [])
      }
    });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <View style={styles.container}>
        <Ionicons name="heart-outline" size={48} color="#ccc" />
        <Text style={styles.emptyText}>Your wishlist is empty</Text>
      </View>
    );
  }

  
  return (
    <ScrollView style={styles.containerFlight} showsVerticalScrollIndicator={false}>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Wishlisted Destinations</Text>
        <FlatList
          data={wishlistItems}
          numColumns={8}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.featuredCard, { margin: 8 }]}
              onPress={() => navigateToProduct(item)}
            >
              <Image source={{ uri: item.image }} style={styles.featuredImage} />
              {item.rating && (
                <View style={styles.ratingBadge}>
                  <Ionicons name="star" size={12} color="#FFD700" />
                  <Text style={styles.ratingText}>{item.rating}</Text>
                </View>
              )}
              <View style={styles.featuredInfo}>
                <Text style={styles.destinationName}>{item.name}</Text>
                <Text style={styles.destinationLocation}>{item.location}</Text>
                <Text style={styles.destinationPrice}>IDR {item.price}</Text>
              </View>
              <TouchableOpacity 
                style={styles.wishlistButton}
                onPress={() => removeFromWishlist(item.id)}
              >
                <Ionicons name="heart" size={24} color="#FF0000" />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
      </View>
    </ScrollView>
  );
}