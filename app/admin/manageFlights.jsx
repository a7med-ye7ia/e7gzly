import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Alert, Switch } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import stylePages from "../../styles/stylePages";
import { getAllFlights } from "../../services/flightService";

export default function manageFlights() {
  const router = useRouter();
  const [destinations, setDestinations] = useState([])

  const navigateToFlightModificationPage = (destination) => {
    const params = destination ? {
      id: destination.id,
      cityFromCode: destination.cityFromCode,
      cityFromName: destination.cityFromName,
      flightTime: destination.flightTime,
      cityToCode: destination.cityToCode,
      cityToName: destination.cityToName,
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
        // console.log('fetching flights from fireStore:', doc.data().name);
        getDestinations.push({
          id: doc.data().id,
          cityFromCode: doc.data().cityFromCode,
          cityFromName: doc.data().cityFromName,
          flightTime: doc.data().flightTime,
          cityToCode: doc.data().cityToCode,
          cityToName: doc.data().cityToName,
          arrivalTime: doc.data().arrivalTime,
          flightDuration: doc.data().flightDuration,
          airLine: doc.data().airLine,
          class: doc.data().class,
          price: doc.data().price,
          new: doc.data().new,
          featured: doc.data().featured,
          about: doc.data().about,
          photos: doc.data().photos,
          interests: doc.data().interests,
          rating: doc.data().rating,
        })
      });
      // console.log("=====================");

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
            onPress={() => navigateToFlightModificationPage(null)} // will move you to the add page
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
            <Image source={{ uri: destination.photos[0] }} style={stylePages.newDestinationImage} />
            <View style={stylePages.newDestinationInfo}>
              <View>
                <Text style={stylePages.newDestinationName}>{destination.cityFromName}</Text>
                <Text style={stylePages.newDestinationLocation}>{destination.cityFromName}</Text>
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
