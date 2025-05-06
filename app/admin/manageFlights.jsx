import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Alert, Switch } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import stylePages from "../../styles/stylePages";
import { getAllFlights } from "../../services/flightService";

export default function manageFlights() {
  const router = useRouter();
  const [destinations, setDestinations] = useState([])

  const navigateToFlightModificationPage = (destination, add) => {
    const params = destination ? {
      id: destination.id,
      name: destination.name,
      location: destination.location,
      image: destination.image,
      featured: destination.featured,
      rating: destination.rating,
      price: destination.price,
      new: destination.new,
    } : null;

    router.push({
      pathname: "/admin/createAndModifyFlight",
      params: params,
    })
  }

  useEffect(() => {
    const getFlights = async () => {
      const {success, data, error} = await getAllFlights();
      const getDestinations = [];

      data.forEach((doc) => {
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
          new: doc.data().new,
        })
      });
      console.log("=====================");

      setDestinations(getDestinations);
    };

    getFlights();
  }, []);

  return (
    <ScrollView style={stylePages.containerFlight}>
      <View style={stylePages.sectionContainer}>
        <Text style={stylePages.sectionTitle}>Manage Flights</Text>

        <TouchableOpacity
            style={[stylePages.newDestinationCard, {height: 70}]}
            onPress={() => navigateToFlightModificationPage(null, 'add')} // will move you to the add page
          >
            <Ionicons name="add" size={40} color={'grey'} style={{marginRight: 8, marginLeft: 10}} />
            <Text style={stylePages.newDestinationName}>Add flight</Text>
               
        </TouchableOpacity>

        {destinations.map((destination) => (
          <TouchableOpacity
            key={destination.id}
            style={stylePages.newDestinationCard}
            onPress={() => navigateToFlightModificationPage(destination)}
          >
            <Image source={{ uri: destination.image }} style={stylePages.newDestinationImage} />
            <View style={stylePages.newDestinationInfo}>
              <View>
                <Text style={stylePages.newDestinationName}>{destination.name}</Text>
                <Text style={stylePages.newDestinationLocation}>{destination.location}</Text>
              </View>
              <View style={stylePages.newDestinationRating}>
                <Ionicons name="star" size={14} color="#FFD700" />
                <Text style={stylePages.newDestinationRatingText}>{destination.rating}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

