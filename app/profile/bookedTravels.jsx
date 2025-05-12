import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Ionicons";

import { getUserById } from "../../services/userService";
import { getFlightById } from "../../services/flightService";
import { Path } from "react-native-svg";
import {getDetailDocById} from "../../services/bookingDetailsService";


const AirlineLogo = ({ airline }) => {
  const getAirlineIcon = () => {
    if (airline && airline.includes("Garuda")) {
      return <Icon name="airplane" size={24} color="#5C40CC" />;
    } else if (airline && airline.includes("Etihad")) {
      return <Icon name="airplane-outline" size={24} color="#5C40CC" />;
    } else {
      return <Icon name="airplane" size={24} color="#5C40CC" />;
    }
  };
  return <View style={styles.airlineLogo}>{getAirlineIcon()}</View>;
};

export default function BookedTravels() {
  const router = useRouter();
  const [bookedTrips, setBookedTrips] = useState([]);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserEmail = await AsyncStorage.getItem("userEmail");
        const user = await getUserById(storedUserEmail);

        if (user) {
          const bookedTripsIDs = user.bookedTrips || [];
          const trips = await Promise.all(
            bookedTripsIDs.map(async (tripID) => {
              const flight = await getFlightById(tripID);
              if (!flight) return null; // Handle case where flight is not found
              return { data: flight, id: tripID };
            })
          );

          setBookedTrips(trips.filter(trip => trip !== null));
          console.log("Booked trips:", trips);
        } else {
          console.warn("User data not found");
        }
      } catch (err) {
        console.error("Error fetching booked trips:", err);
      }
    };

    fetchUserData();
  }, []);

  const goToDetails = async (ID, index) => {
    // console.log("ID", ID)
    const storedUserEmail = await AsyncStorage.getItem("userEmail");
    // console.log(storedUserEmail)
    const userData = await getUserById(storedUserEmail);
    // console.log("shit",userData)
    const bookedTrips = userData.bookedTrips;
    // console.log("bookingtrips",bookedTrips)
    // const index = bookedTrips.indexOf(ID);
    // console.log("index",index)
    const infoId = userData.bookedTripsDetails[index];
    // console.log("infoId",infoId) // the value
    // console.log("===============================")
    const {success, data, error} = await getDetailDocById(infoId);
    // console.log("details array", JSON.stringify(data)) // ! delete
    router.push({
      pathname: "/book/passengerBooking",
      params: {
        id: ID,
        passengers: JSON.stringify(data),
        showOnly: true,
      }
    })
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Booked Trips</Text>
        <View style={{ width: 24 }} />
      </View>

      {bookedTrips.map((trip, index) => (
        <TouchableOpacity
          key={trip.id + index} 
          style={styles.flightCard}
          onPress={() => goToDetails(trip.id, index)}
        >
          <View style={styles.flightDetails}>
            {/* Origin */}
            <View style={styles.flightEndpoint}>
              <MaterialIcons name="location-on" size={16} color="#5C40CC" style={styles.locationIcon} />
              <Text style={styles.flightCode}>{trip.data.cityFromCode || "--"}</Text>
              <Text style={styles.flightCity}>{trip.data.cityFromName || "City"}</Text>
              <Text style={styles.flightTime}>{trip.data.flightTime || "--:--"}</Text>
            </View>
            {/* Duration */}
            <View style={styles.durationContainer}>
              <View style={styles.durationLine}>
                <View style={styles.durationDottedLine} />
                <View style={styles.durationPlaneIconContainer}>
                  <Icon name="airplane" size={16} color="#5C40CC" />
                </View>
              </View>
              <Text style={styles.durationLabel}>Flight Duration</Text>
              <Text style={styles.durationTime}>{trip.data.flightDuration || "--"}</Text>
            </View>
            {/* Destination */}
            <View style={styles.flightEndpoint}>
              <MaterialIcons name="location-on" size={16} color="#0EC3AE" style={styles.locationIcon} />
              <Text style={styles.flightCode}>{trip.data.cityToCode || "--"}</Text>
              <Text style={styles.flightCity}>{trip.data.cityToName || "City"}</Text>
              <Text style={styles.flightTime}>{trip.data.arrivalTime || "--:--"}</Text>
            </View>
          </View>
          {/* Divider */}
          <View style={styles.divider} />
          {/* Airline Info */}
          <View style={styles.airlineContainer}>
            <View style={styles.airlineInfo}>
              <AirlineLogo airline={trip.data.airline} />
              <View style={styles.airlineDetails}>
                <Text style={styles.airlineName}>{trip.data.airline || "Airline"}</Text>
                <Text style={styles.airlineClass}>{trip.data.class || "Economy"}</Text>
              </View>
            </View>
            <Text style={styles.flightPrice}>
              {trip.data.price ? trip.data.price : "N/A"}
            </Text>
          </View>
          <View style={styles.leftCutout} />
          <View style={styles.rightCutout} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 25,
    flex: 1,
    backgroundColor: "#f5f4fa",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 25,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  routeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    marginTop: 10,
  },
  routeEndpoint: {
    alignItems: "center",
  },
  routeCode: {
    fontSize: 24,
    fontWeight: "600",
    color: "#1F1D2B",
    marginBottom: 4,
  },
  routeCity: {
    fontSize: 14,
    color: "#9698A9",
  },
  routeLine: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    height: 24,
    paddingBottom: 16,
  },
  dottedLine: {
    height: 1,
    flex: 1,
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "#8F9BB3",
    borderRadius: 1,
  },
  planeIconContainer: {
    position: "absolute",
    backgroundColor: "#f5f4fa",
    padding: 4,
    paddingBottom: 20,
    borderRadius: 12,
  },
  scheduleContainer: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 20,
  },
  scheduleTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F1D2B",
    marginBottom: 6,
  },
  scheduleDetails: {
    fontSize: 14,
    color: "#9698A9",
  },
  flightListContainer: {
    paddingHorizontal: 20,
  },
  flightCard: {
    backgroundColor: "white",
    borderRadius: 18,
    padding: 20,
    marginBottom: 16,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  flightDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  flightEndpoint: {
    alignItems: "center",
    width: 80,
  },
  locationIcon: {
    marginBottom: 4,
  },
  flightCode: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F1D2B",
    marginBottom: 2,
  },
  flightCity: {
    fontSize: 12,
    color: "#9698A9",
    marginBottom: 6,
  },
  flightTime: {
    fontSize: 12,
    color: "#9698A9",
  },
  durationContainer: {
    alignItems: "center",
    flex: 1,
  },
  durationLine: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    height: 24,
    marginBottom: 6,
  },
  durationDottedLine: {
    height: 1,
    flex: 1,
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "#8F9BB3",
    borderRadius: 1,
  },
  durationPlaneIconContainer: {
    position: "absolute",
    backgroundColor: "white",
    padding: 4,
    borderRadius: 12,
  },
  durationLabel: {
    fontSize: 12,
    color: "#9698A9",
    marginBottom: 2,
  },
  durationTime: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1F1D2B",
  },
  divider: {
    height: 1,
    borderStyle: "dashed",
    borderWidth: 2,
    borderColor: "#DBDFE7",
    marginVertical: 16,
  },
  airlineContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  airlineInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  airlineLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  airlineDetails: {
    justifyContent: "center",
  },
  airlineName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1F1D2B",
    marginBottom: 2,
  },
  airlineClass: {
    fontSize: 12,
    color: "#5C40CC",
  },
  flightPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FF5B5B",
  },
  leftCutout: {
    position: 'absolute',
    left: -15, // Half of width/height
    top: '54%',
    width: 30,
    height: 30,
    backgroundColor: '#f5f4fa', // Or the background color of the screen
    borderRadius: 15,
  },
  rightCutout: {
    position: 'absolute',
    right: -15,
    top: '54%',
    width: 30,
    height: 30,
    backgroundColor: '#f5f4fa',
    borderRadius: 15,
  },
});