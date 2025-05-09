import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
} from "react-native";
import styles from "../styles/styleBooking";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { getAllFlights } from "../services/flightService";
import { useSearchParams } from "expo-router/build/hooks";

const primaryColor = "#5C40CC";

export default function Book() {
  const params = useSearchParams();
  const initialFilteredData = params.filteredData ? JSON.parse(params.filteredData) : [];

  const router = useRouter();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [searching, setSearching] = useState(false);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState("DD/MM/YYYY");
  const [isSeatsModalVisible, setIsSeatsModalVisible] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState("1 Seat");
  const [tripType, setTripType] = useState("oneWay");
  const [isBookingModalVisible, setIsBookingModalVisible] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [focusedField, setFocusedField] = useState(null);
  const [destinations, setDestinations] = useState([]);
  const [filteredFlightData, setFilteredFlightData] = useState(initialFilteredData);
  const [isLoading, setIsLoading] = useState(false);

  const seats = ["1 Seat", "2 Seats", "3 Seats", "4 Seats", "5 Seats"];

  // Fetch all flights on component mount, similar to FlightDestinations
  useEffect(() => {
    const getFlights = async () => {
      setIsLoading(true);
      try {
        const { success, data, error } = await getAllFlights();
        if (success && data) {
          const getDestinations = [];

          // Process data similar to FlightDestinations
          data.forEach((doc) => {
            getDestinations.push({
              id: doc.id,
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
              museumLink: doc.data().museumLink,
              new: doc.data().new,
              featured: doc.data().featured,
              about: doc.data().about,
              photos: doc.data().photos,
              interests: doc.data().interests,
            });
          });

          setDestinations(getDestinations);
          console.log("Fetched Destinations:", getDestinations);
        } else if (error) {
          console.error("Error fetching flights:", error);
        }
      } catch (error) {
        console.error("Exception fetching flights:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getFlights();
  }, []);

  const openDatePicker = () => {
    setFocusedField("date");
    setIsDatePickerVisible(true);
  };

  const onDateChange = (_, picked) => {
    setIsDatePickerVisible(false);
    if (picked) {
      setDate(picked);
      setSelectedDate(picked.toLocaleDateString());
    }
    setFocusedField(null);
  };

  const openSeatsModal = () => {
    setFocusedField("seats");
    setIsSeatsModalVisible(true);
  };

  const closeSeatsModal = () => {
    setIsSeatsModalVisible(false);
    setFocusedField(null);
  };

  const pickSeats = (s) => {
    setSelectedSeats(s);
    closeSeatsModal();
  };

  const selectTripType = (type) => {
    setTripType(type);
  };

  const calculatePrice = (seatsStr) => {
    const numSeats = parseInt(seatsStr);
    return numSeats * 100; // example price logic
  };

  const goToDetailTraveler = () => {
    setIsBookingModalVisible(false);
    // Pass filtered flight data and booking details to FlightResult
    router.push({
      pathname: "./book/FlightResult",
      params: {
        filteredData: JSON.stringify(filteredFlightData),
        bookingDetails: JSON.stringify(bookingDetails),
      },
    });
  };

  const handleBookNow = () => {
    if (!from.trim() || !to.trim()) {
      Alert.alert("Missing fields", "Please enter both 'from' and 'to'");
      return;
    }

    setSearching(true); // Disable the button while processing

    // Filter destinations based on 'from' and 'to' fields, similar to searchQuery logic in FlightDestinations
    const filteredData = destinations.filter(
      (destination) =>
        destination.cityFromName.toLowerCase().includes(from.trim().toLowerCase()) &&
        destination.cityToName.toLowerCase().includes(to.trim().toLowerCase())
    );

    console.log("Filtered Data:", filteredData);
    setFilteredFlightData(filteredData); // Store filtered data for passing to FlightResult

    // Prepare booking summary
    const returnDate = new Date(date);
    returnDate.setDate(returnDate.getDate() + 7);

    setBookingDetails({
      from,
      to,
      date: selectedDate,
      departureDate: selectedDate,
      returnDate: tripType === "oneWay" ? "N/A" : returnDate.toLocaleDateString(),
      seats: selectedSeats,
      passengers: selectedSeats,
      tripType: tripType === "oneWay" ? "One Way" : "Round Trip",
      totalPrice: calculatePrice(selectedSeats).toString(),
    });

    setIsBookingModalVisible(true);
    setSearching(false); // Re-enable the button
    console.log("Modal visibility set to true");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.h1}>Book Your Trip Now!!</Text>
      {isLoading && <Text>Loading flight data...</Text>}
      <View style={styles.formContainer}>
        {/* Trip Type Buttons */}
        <View style={styles.tripTypeButtons}>
          {["oneWay", "roundTrip"].map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.tripTypeButton,
                tripType === type && styles.tripTypeButtonActive,
              ]}
              onPress={() => selectTripType(type)}
            >
              <Text
                style={[
                  styles.tripTypeButtonText,
                  tripType === type && styles.tripTypeButtonTextActive,
                ]}
              >
                {type === "oneWay" ? "One Way" : "Round Trip"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* From Input */}
        <Text style={styles.inputLabel}>From</Text>
        <TextInput
          style={styles.inputField}
          placeholder="Enter origin city (e.g. Toronto)"
          value={from}
          onChangeText={setFrom}
          autoCapitalize="words"
        />

        {/* To Input */}
        <Text style={styles.inputLabel}>To</Text>
        <TextInput
          style={styles.inputField}
          placeholder="Enter destination city (e.g. New York)"
          value={to}
          onChangeText={setTo}
          autoCapitalize="words"
        />

        {/* Date Picker */}
        <Text style={styles.inputLabel}>Date</Text>
        <TouchableOpacity style={styles.inputField} onPress={openDatePicker}>
          <Text>{selectedDate}</Text>
        </TouchableOpacity>

        {isDatePickerVisible && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}

        {/* Seat Picker */}
        <Text style={styles.inputLabel}>Seats</Text>
        <TouchableOpacity style={styles.inputField} onPress={openSeatsModal}>
          <Text>{selectedSeats}</Text>
        </TouchableOpacity>

        {/* Seats Modal */}
        <Modal
          visible={isSeatsModalVisible}
          transparent
          animationType="slide"
          onRequestClose={closeSeatsModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Select Seats</Text>
              <ScrollView style={{ width: "100%" }}>
                {seats.map((s) => (
                  <TouchableOpacity
                    key={s}
                    style={styles.modalDestinationItem}
                    onPress={() => pickSeats(s)}
                  >
                    <Text style={styles.modalDestinationName}>{s}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={closeSeatsModal}
              >
                <Text style={styles.modalCloseButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Booking Modal */}
        <Modal
          visible={isBookingModalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setIsBookingModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.card}>
              <View style={styles.header}>
                <Text style={styles.headerText}>Booking Details</Text>
              </View>

              {bookingDetails && (
                <View style={styles.content}>
                  <View style={styles.row}>
                    <Ionicons name="airplane" size={20} color={primaryColor} style={styles.icon} />
                    <Text style={styles.label}>Trip Type:</Text>
                    <Text style={styles.value}>{bookingDetails.tripType}</Text>
                  </View>

                  <View style={styles.row}>
                    <Ionicons name="location" size={20} color={primaryColor} style={styles.icon} />
                    <Text style={styles.label}>From:</Text>
                    <Text style={styles.value}>{bookingDetails.from}</Text>
                  </View>

                  <View style={styles.row}>
                    <Ionicons name="location" size={20} color={primaryColor} style={styles.icon} />
                    <Text style={styles.label}>To:</Text>
                    <Text style={styles.value}>{bookingDetails.to}</Text>
                  </View>

                  <View style={styles.row}>
                    <Ionicons name="calendar" size={20} color={primaryColor} style={styles.icon} />
                    <Text style={styles.label}>Departure:</Text>
                    <Text style={styles.value}>{bookingDetails.departureDate}</Text>
                  </View>

                  {bookingDetails.tripType === "Round Trip" && (
                    <View style={styles.row}>
                      <Ionicons name="calendar" size={20} color={primaryColor} style={styles.icon} />
                      <Text style={styles.label}>Return:</Text>
                      <Text style={styles.value}>{bookingDetails.returnDate}</Text>
                    </View>
                  )}

                  <View style={styles.row}>
                    <Ionicons name="people" size={20} color={primaryColor} style={styles.icon} />
                    <Text style={styles.label}>Passengers:</Text>
                    <Text style={styles.value}>{bookingDetails.passengers}</Text>
                  </View>

                  <View style={styles.row}>
                    <Ionicons name="wallet" size={20} color={primaryColor} style={styles.icon} />
                    <Text style={styles.label}>Total Price:</Text>
                    <Text style={styles.value}>${bookingDetails.totalPrice}</Text>
                  </View>
                </View>
              )}

              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={goToDetailTraveler}>
                  <Text style={styles.buttonText}>Continue to Traveler Details</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.secondaryButton]}
                  onPress={() => setIsBookingModalVisible(false)}
                >
                  <Text style={[styles.buttonText, styles.secondaryButtonText]}>Back</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Book Now Button */}
        <TouchableOpacity
          style={styles.bookNowButton}
          onPress={handleBookNow}
          disabled={searching || isLoading}
        >
          <Text style={styles.bookNowButtonText}>
            {searching || isLoading ? "Searching..." : "Book Now"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}