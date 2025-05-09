"use client"
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, StatusBar, Dimensions } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router"

const { width } = Dimensions.get("window")


// Static data for flight results
const flightData = [
  {
    id: 1,
    origin: {
      code: "CGK",
      city: "Tangerang",
      time: "08:10 AM",
    },
    destination: {
      code: "TLC",
      city: "Ciliwung",
      time: "11:55 AM",
    },
    duration: "3h 45m",
    airline: "Garuda Indonesia",
    class: "Business Class",
    price: "IDR 6.000.000",
  },
  {
    id: 2,
    origin: {
      code: "CGK",
      city: "Tangerang",
      time: "1:10 AM",
    },
    destination: {
      code: "TLC",
      city: "Ciliwung",
      time: "03:50 PM",
    },
    duration: "3h 45m",
    airline: "Etihad Airways",
    class: "Business Class",
    price: "IDR 24.000.000",
  },
  {
    id: 3,
    origin: {
      code: "CGK",
      city: "Tangerang",
      time: "10:30 AM",
    },
    destination: {
      code: "TLC",
      city: "Ciliwung",
      time: "2:15 PM",
    },
    duration: "3h 45m",
    airline: "Garuda Indonesia",
    class: "Business Class",
    price: "IDR 6.000.000",
  },
]

// Custom airline logo component that uses an icon instead of an image
const AirlineLogo = ({ airline }) => {
  // Use different icons based on airline name
  const getAirlineIcon = () => {
    if (airline.includes("Garuda")) {
      return <Icon name="airplane" size={24} color="#5C40CC" />
    } else if (airline.includes("Etihad")) {
      return <Icon name="airplane-outline" size={24} color="#5C40CC" />
    } else {
      return <Icon name="airplane" size={24} color="#5C40CC" />
    }
  }

  return <View style={styles.airlineLogo}>{getAirlineIcon()}</View>
}

const FlightResultScreen = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f4fa" />

      {/* Header */}

      <View style={styles.header}>

        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Flight Result</Text>
      </View>

      {/* Flight Route */}
      <View style={styles.routeContainer}>
        <View style={styles.routeEndpoint}>
          <Text style={styles.routeCode}>CGK</Text>
          <Text style={styles.routeCity}>Jakarta</Text>
        </View>

        <View style={styles.routeLine}>
          <View style={styles.dottedLine} />
          <View style={styles.planeIconContainer}>
            <Icon name="airplane" size={35} color="#5C40CC" />
          </View>
        </View>

        <View style={styles.routeEndpoint}>
          <Text style={styles.routeCode}>TLC</Text>
          <Text style={styles.routeCity}>Ciliwung</Text>
        </View>
      </View>

      {/* Flight Schedule */}
      <View style={styles.scheduleContainer}>
        <Text style={styles.scheduleTitle}>Flight Schedule</Text>
        <Text style={styles.scheduleDetails}>Sunday, 25 June 2023 | 2 Seat</Text>
      </View>

      {/* Flight List */}
      <ScrollView style={styles.flightListContainer} showsVerticalScrollIndicator={false}>
        {flightData.map((flight) => (
          <View key={flight.id} style={styles.flightCard}>
            {/* Flight Details */}
            <View style={styles.flightDetails}>
              {/* Origin */}
              <View style={styles.flightEndpoint}>
                <MaterialIcons name="location-on" size={16} color="#5C40CC" style={styles.locationIcon} />
                <Text style={styles.flightCode}>{flight.origin.code}</Text>
                <Text style={styles.flightCity}>{flight.origin.city}</Text>
                <Text style={styles.flightTime}>{flight.origin.time}</Text>
              </View>

              {/* Flight Duration */}
              <View style={styles.durationContainer}>
                <View style={styles.durationLine}>
                  <View style={styles.durationDottedLine} />
                  <View style={styles.durationPlaneIconContainer}>
                    <Icon name="airplane" size={16} color="#5C40CC" />
                  </View>
                </View>
                <Text style={styles.durationLabel}>Flight Duration</Text>
                <Text style={styles.durationTime}>{flight.duration}</Text>
              </View>

              {/* Destination */}
              <View style={styles.flightEndpoint}>
                <MaterialIcons name="location-on" size={16} color="#0EC3AE" style={styles.locationIcon} />
                <Text style={styles.flightCode}>{flight.destination.code}</Text>
                <Text style={styles.flightCity}>{flight.destination.city}</Text>
                <Text style={styles.flightTime}>{flight.destination.time}</Text>
              </View>
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Airline Info */}
            <View style={styles.airlineContainer}>
              <View style={styles.airlineInfo}>
                <TouchableOpacity>
                  <AirlineLogo airline={flight.airline} />
                </TouchableOpacity>
                <View style={styles.airlineDetails}>
                  <Text style={styles.airlineName}>{flight.airline}</Text>
                  <Text style={styles.airlineClass}>{flight.class}</Text>
                </View>
              </View>
              <Text style={styles.flightPrice}>{flight.price}</Text>
            </View>
            <View style={styles.leftCutout} />
            <View style={styles.rightCutout} />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
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
    borderWidth: 1,// margin: 20,
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
})

export default FlightResultScreen
