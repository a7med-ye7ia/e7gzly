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

// Validation regex for alphabetic characters
const ALPHABETIC_REGEX = /^[A-Za-z\s]+$/;

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

  // For inline error display
  const [isValidFrom, setIsValidFrom] = useState(true);
  const [isValidTo, setIsValidTo] = useState(true);

  const seats = ["1 Seat", "2 Seats", "3 Seats", "4 Seats", "5 Seats"];

  // Fetch all flights on component mount, similar to FlightDestinations
  useEffect(() => {
    const getFlights = async () => {
      setIsLoading(true);
      try {
        const { success, data, error } = await getAllFlights();
        if (success && data) {
          const getDestinations = [];
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

  const validateLocationWithoutAlert = async (location) => {
    if (!location || location.trim() === "") {
        console.log(`Location "${location}" is empty or invalid.`);
        return false;
    }
    try {
        console.log(`Sending request to validate location: "${location}"`);
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
                location
            )}&format=json&addressdetails=1&limit=5`,
            {
                headers: {
                    'User-Agent': 'MyFlightBookingApp/1.0 (contact: your-email@example.com)',
                    'Referer': 'http://localhost',
                },
            }
        );
        console.log(`Response status for "${location}": ${response.status}`);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.log(`Error response body for "${location}":`, errorText);
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log(`Validation results for "${location}":`, data);
    
        if (data.length > 0) {
            data.forEach((result, index) => {
                console.log(`Result ${index + 1} for "${location}": Type=${result.type}, Class=${result.class || 'N/A'}, Display_Name=${result.display_name || 'N/A'}`);
            });
    
            const hasValidType = data.some(result => 
                ["city", "town", "village", "country", "place", "boundary", "administrative"].includes(result.type)
            );
            if (hasValidType) {
                console.log(`Location "${location}" is valid (found relevant type in ${data.length} results).`);
                return true;
            } else {
                const hasHighImportance = data.some(result => result.importance > 0.5);
                if (hasHighImportance) {
                    console.log(`Location "${location}" is valid (high importance despite no matching type, ${data.length} results).`);
                    return true;
                } else {
                    console.log(`Location "${location}" has results but no relevant type or high importance.`);
                    return false;
                }
            }
        } else {
            console.log(`Location "${location}" not found (0 results).`);
            return false;
        }
    } catch (error) {
        console.error(`Error validating location "${location}":`, error.message);
        return false;
    }
};

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
    const numSeats = parseInt(seatsStr, 10);
    return numSeats * 100; 
  };

  const goToDetailTraveler = () => {
    setIsBookingModalVisible(false);
    router.push({
      pathname: "./book/FlightResult",
      params: {
        filteredData: JSON.stringify(filteredFlightData),
        bookingDetails: JSON.stringify(bookingDetails),
        seats: selectedSeats.toString(),
      },
    });
  };

  const handleBookNow = async () => {
    // Trim input values
    const fromTrimmed = from.trim();
    const toTrimmed = to.trim();

    // Validation for From and To using the regex
    if (!ALPHABETIC_REGEX.test(fromTrimmed) || !ALPHABETIC_REGEX.test(toTrimmed)) {
      Alert.alert("Invalid Input", "Please ensure 'From' and 'To' only contain alphabetic characters.");
      return;
    }

    // Ensure From and To are different
    if (fromTrimmed.toLowerCase() === toTrimmed.toLowerCase()) {
      Alert.alert("Invalid Input", "'From' and 'To' must be different.");
      return;
    }

    // Ensure both From and To are provided, and a Date is selected
    if (!fromTrimmed || !toTrimmed || selectedDate === "DD/MM/YYYY") {
      Alert.alert("Missing fields", "Please fill all fields.");
      return;
    }

    // Validate "from" and "to" with live city/country check
    const [fromValid, toValid] = await Promise.all([
      validateLocationWithoutAlert(fromTrimmed),
      validateLocationWithoutAlert(toTrimmed),
    ]);
    setIsValidFrom(fromValid);
    setIsValidTo(toValid);

    if (!fromValid || !toValid) {
      Alert.alert("Invalid Location", "One or both locations are invalid or cannot be found.");
      return;
    }

    setSearching(true);
    const filteredData = destinations.filter(
      (destination) =>
        destination.cityFromName.toLowerCase().includes(fromTrimmed.toLowerCase()) &&
        destination.cityToName.toLowerCase().includes(toTrimmed.toLowerCase())
    );

    setFilteredFlightData(filteredData);

    const returnDate = new Date(date);
    returnDate.setDate(returnDate.getDate() + 7);

    setBookingDetails({
      from: fromTrimmed,
      to: toTrimmed,
      date: selectedDate,
      departureDate: selectedDate,
      returnDate: tripType === "oneWay" ? "N/A" : returnDate.toLocaleDateString(),
      seats: selectedSeats,
      passengers: selectedSeats,
      tripType: tripType === "oneWay" ? "One Way" : "Round Trip",
      totalPrice: calculatePrice(selectedSeats).toString(),
    });

    setIsBookingModalVisible(true);
    setSearching(false);
  };

  const handleFromBlur = async () => {
    if (from.trim().length > 0) {
      const valid = await validateLocationWithoutAlert(from.trim());
      setIsValidFrom(valid);
    }
  };

  const handleToBlur = async () => {
    if (to.trim().length > 0) {
      const valid = await validateLocationWithoutAlert(to.trim());
      setIsValidTo(valid);
    }
  };

  const focusedStyle = (field) => ({
    borderColor: focusedField === field ? primaryColor : "#ccc",
  });

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
          style={[styles.inputField, focusedStyle('from')]}
          placeholder="Enter origin city (e.g. Toronto)"
          value={from}
          onChangeText={setFrom}
          onBlur={handleFromBlur}
          onFocus={() => setFocusedField('from')}
          autoCapitalize="words"
        />
        {!isValidFrom && (
          <Text style={{ color: "red", marginBottom: 8 }}>Please enter a valid city or country.</Text>
        )}

        {/* To Input */}
        <Text style={styles.inputLabel}>To</Text>
        <TextInput
          style={[styles.inputField, focusedStyle('to')]}
          placeholder="Enter destination city (e.g. New York)"
          value={to}
          onChangeText={setTo}
          onBlur={handleToBlur}
          onFocus={() => setFocusedField('to')}
          autoCapitalize="words"
        />
        {!isValidTo && (
          <Text style={{ color: "red", marginBottom: 8 }}>Please enter a valid city or country.</Text>
        )}

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