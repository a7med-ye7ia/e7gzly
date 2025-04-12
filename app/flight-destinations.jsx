import React, { useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Alert, BackHandler } from 'react-native';
import { Link, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const destinations = [
  {
    id: 1,
    name: "Paris",
    description: "Experience the city of lights with its iconic Eiffel Tower and world-class cuisine.",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Tokyo",
    description: "Discover the perfect blend of traditional culture and cutting-edge technology.",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "New York",
    description: "Explore the Big Apple with its stunning skyline and diverse neighborhoods.",
    image: "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Bali",
    description: "Relax on pristine beaches and immerse yourself in rich Balinese culture.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    name: "Rome",
    description: "Walk through history in the eternal city with ancient ruins and Renaissance art.",
    image: "https://images.unsplash.com/photo-1506976785307-8732e854ad70?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    name: "Sydney",
    description: "Enjoy the stunning harbor views and laid-back Australian lifestyle.",
    image: "https://images.unsplash.com/photo-1506089676908-3592f7389d4d?auto=format&fit=crop&w=800&q=80",
  },
];

export default function FlightDestinations() {
  const router = useRouter(); 

  useEffect(() => {
    const checkLogin = async () => {
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      if (!isLoggedIn) {
        router.replace('/'); 
      }
    };
    checkLogin();

    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      router.replace('/'); 
      return true; 
    });

    return () => {
      backHandler.remove();
    };
  }, []);

  const handleSignOut = async () => {
    await AsyncStorage.removeItem('isLoggedIn');
    Alert.alert("Signed Out", "You have been signed out successfully.");
    router.replace('/'); 
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Link href="/" style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </Link>

      <Text style={styles.title}>Popular Flight Destinations</Text>

      {destinations.map((destination) => (
        <View key={destination.id} style={styles.card}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: destination.image }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>

          <View style={styles.content}>
            <Text style={styles.name}>{destination.name}</Text>
            <Text style={styles.description}>{destination.description}</Text>
            <Link
              href={`https://booking.com/flights/${destination.name}`}
              style={styles.bookLink}
            >
              Book Now
            </Link>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
    backgroundColor: '#fff',
  },
  signOutButton: {
    alignSelf: 'flex-end',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#FF3B30',
    borderRadius: 8,
    marginBottom: 16,
  },
  signOutText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  card: {
    marginBottom: 30,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    backgroundColor: '#f9f9f9',
  },
  imageContainer: {
    width: '100%',
    height: 200,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    padding: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 12,
  },
  bookLink: {
    fontSize: 16,
    color: '#007BFF',
    fontWeight: '500',
  },
});
