"use client";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, StatusBar } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";

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



const FlightResultScreen = () => {
  const params = useLocalSearchParams();
  const router = useRouter();

  const goToDeatails = () => {
    router.push({
      pathname: "./DetailTraveler",
      // params: { flight: JSON.stringify(flight) },
    });
  }
  // Get results from params
  const flights = params.filteredData ? JSON.parse(params.filteredData) : [];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f4fa" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Flight Result</Text>
      </View>

      {/* Route info */}
      <View style={styles.routeContainer}>
        <View style={styles.routeEndpoint}>
          <Text style={styles.routeCode}>{flights[0]?.cityFromCode || "???"}</Text>
        </View>
        <View style={styles.routeLine}>
          <View style={styles.dottedLine} />
          <View style={styles.planeIconContainer}>
            <Icon name="airplane" size={35} color="#5C40CC" />
          </View>
        </View>
        <View style={styles.routeEndpoint}>
          <Text style={styles.routeCode}>{flights[0]?.cityToCode || "???"}</Text>
        </View>
      </View>

      <View style={styles.scheduleContainer}>
        <Text style={styles.scheduleTitle}>Flight Schedule</Text>
      </View>

      <ScrollView style={styles.flightListContainer}>
        {flights.length === 0 ? (
          <Text style={{ color: "#666", textAlign: "center", marginTop: 24 }}>No flights found.</Text>
        ) : (
          flights.map((flight) => (
            <TouchableOpacity
              key={flight.id}
              style={styles.flightCard}
              onPress={goToDeatails}
            >
              <View style={styles.flightDetails}>
                {/* Origin */}
                <View style={styles.flightEndpoint}>
                  <MaterialIcons name="location-on" size={16} color="#5C40CC" style={styles.locationIcon} />
                  <Text style={styles.flightCode}>{flight.cityFromCode || "--"}</Text>
                  <Text style={styles.flightCity}>{flight.cityFromName || "City"}</Text>
                  <Text style={styles.flightTime}>{flight.flightTime || "--:--"}</Text>
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
                  <Text style={styles.durationTime}>{flight.flightDuration || "--"}</Text>
                </View>
                {/* Destination */}
                <View style={styles.flightEndpoint}>
                  <MaterialIcons name="location-on" size={16} color="#0EC3AE" style={styles.locationIcon} />
                  <Text style={styles.flightCode}>{flight.cityToCode || "--"}</Text>
                  <Text style={styles.flightCity}>{flight.cityToName || "City"}</Text>
                  <Text style={styles.flightTime}>{flight.arrivalTime || "--:--"}</Text>
                </View>
              </View>
              {/* Divider */}
              <View style={styles.divider} />
              {/* Airline Info */}
              <View style={styles.airlineContainer}>
                <View style={styles.airlineInfo}>
                  <AirlineLogo airline={flight.airline} />
                  <View style={styles.airlineDetails}>
                    <Text style={styles.airlineName}>{flight.airline || "Airline"}</Text>
                    <Text style={styles.airlineClass}>{flight.class || "Economy"}</Text>
                  </View>
                </View>
                <Text style={styles.flightPrice}>
                  {flight.price ? flight.price : "N/A"}
                </Text>
              </View>
              <View style={styles.leftCutout} />
              <View style={styles.rightCutout} />
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

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
export default FlightResultScreen;