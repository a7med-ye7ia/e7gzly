import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/Ionicons";

const bookedTrips = [
  {
    id: 1,
    origin: {
      code: "CAI",
      city: "Cairo",
      time: "09:00 AM",
    },
    destination: {
      code: "ROM",
      city: "Rome",
      time: "12:30 PM",
    },
    duration: "3h 30m",
    airline: "EgyptAir",
    class: "Economy",
    price: "EGP 7,500",
    departureDate: "20 June 2025",
    returnDate: "30 June 2025",
  },
  {
    id: 2,
    origin: {
      code: "CAI",
      city: "Cairo",
      time: "10:00 AM",
    },
    destination: {
      code: "DPS",
      city: "Bali",
      time: "08:00 PM",
    },
    duration: "10h 00m",
    airline: "Qatar Airways",
    class: "Business",
    price: "EGP 25,000",
    departureDate: "10 July 2025",
    returnDate: "20 July 2025",
  },
];

export default function BookedTravels() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Booked Trips</Text>
        <View style={{ width: 24 }} />
      </View>

      {bookedTrips.map((trip) => (
        <View key={trip.id} style={styles.flightCard}>
          {/* Flight Details */}
          <View style={styles.flightDetails}>
            {/* Origin */}
            <View style={styles.flightEndpoint}>
              <Ionicons name="airplane" size={18} color="#5C40CC" style={styles.locationIcon} />
              <Text style={styles.flightCode}>{trip.origin.code}</Text>
              <Text style={styles.flightCity}>{trip.origin.city}</Text>
              <Text style={styles.flightTime}>{trip.origin.time}</Text>
            </View>

            {/* Duration */}
            <View style={styles.durationContainer}>
              <Text style={styles.durationLabel}>Duration</Text>
              <Text style={styles.durationTime}>{trip.duration}</Text>
              <Text style={styles.flightTime}>Depart: {trip.departureDate}</Text>
              <Text style={styles.flightTime}>Return: {trip.returnDate}</Text>
            </View>

            {/* Destination */}
            <View style={styles.flightEndpoint}>
              <Ionicons name="airplane" size={18} color="#0EC3AE" style={styles.locationIcon} />
              <Text style={styles.flightCode}>{trip.destination.code}</Text>
              <Text style={styles.flightCity}>{trip.destination.city}</Text>
              <Text style={styles.flightTime}>{trip.destination.time}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Airline Info */}
          <View style={styles.airlineContainer}>
            <View>
              <Text style={styles.airlineName}>{trip.airline}</Text>
              <Text style={styles.airlineClass}>{trip.class}</Text>
            </View>
            <Text style={styles.flightPrice}>{trip.price}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 25,
    flex: 1,
    backgroundColor: "#f5f4fa",
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  flightCard: {
    backgroundColor: "white",
    borderRadius: 18,
    padding: 20,
    marginBottom: 16,
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
  flightCode: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F1D2B",
  },
  flightCity: {
    fontSize: 12,
    color: "#9698A9",
  },
  flightTime: {
    fontSize: 12,
    color: "#9698A9",
  },
  locationIcon: {
    marginBottom: 4,
  },
  durationContainer: {
    alignItems: "center",
    justifyContent: "center",
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
    marginBottom: 4,
  },
  divider: {
    height: 1,
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "#DBDFE7",
    marginVertical: 12,
  },
  airlineContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  airlineName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1F1D2B",
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
});
