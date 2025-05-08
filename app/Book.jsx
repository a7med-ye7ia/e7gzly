// Search.js
import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert, Modal, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Country } from "country-state-city";
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "../styles/styleBooking";

const primaryColor = "#5C40CC";
const FORM_KEY = 'bookingFormData';

export default function Book() {
  const router = useRouter();
  
  const [isBookingModalVisible, setIsBookingModalVisible] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  
  const [countries, setCountries] = useState([]);
  const [countrySearch, setCountrySearch] = useState("");

  // internal state
  const [selectedFrom, setSelectedFrom] = useState(null);
  const [selectedTo, setSelectedTo] = useState(null);
  const [focusedField, setFocusedField] = useState(null);
  const [isCountryModalVisible, setIsCountryModalVisible] = useState(false);
  const [countryModalType, setCountryModalType] = useState(null);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState("DD/MM/YYYY");
  const [isSeatsModalVisible, setIsSeatsModalVisible] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState("1 Seat");
  const [tripType, setTripType] = useState("oneWay");

  // Save form function
  const saveFormData = async (customState) => {
    const formToSave = customState || {
      selectedFrom, selectedTo, selectedDate, selectedSeats, tripType, date: date.toISOString()
    };
    try {
      await AsyncStorage.setItem(FORM_KEY, JSON.stringify(formToSave));
    } catch (e) {
      console.log('Could not save form data', e);
    }
  };

  // Load on mount
  useEffect(() => {
    (async () => {
      const list = Country.getAllCountries();
      setCountries(list);

      try {
        const stored = await AsyncStorage.getItem(FORM_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed.selectedFrom) setSelectedFrom(parsed.selectedFrom);
          if (parsed.selectedTo) setSelectedTo(parsed.selectedTo);
          if (parsed.selectedDate) setSelectedDate(parsed.selectedDate);
          if (parsed.selectedSeats) setSelectedSeats(parsed.selectedSeats);
          if (parsed.tripType) setTripType(parsed.tripType);
          if (parsed.date) setDate(new Date(parsed.date));
        }
      } catch (e) {
        console.log("Failed to load form data:", e);
      }
    })();
  }, []);

  const filteredCountries = countries.filter((c) =>
    c.name.toLowerCase().includes(countrySearch.toLowerCase())
  );
  const seats = ["1 Seat", "2 Seats", "3 Seats", "4 Seats", "5 Seats"];

  const calculatePrice = (seats) => {
    const pricePerSeat = 100;
    return seats ? parseInt(seats.split(" ")[0]) * pricePerSeat : 0;
  };

  const openCountryModal = (type) => {
    setCountryModalType(type);
    setFocusedField(type);
    setCountrySearch("");
    setIsCountryModalVisible(true);
  };
  const closeCountryModal = () => {
    setIsCountryModalVisible(false);
    setCountryModalType(null);
    setFocusedField(null);
  };
  // Save on pick
  const pickCountry = (c) => {
    if (countryModalType === "from") {
      setSelectedFrom(c);
      saveFormData({ selectedFrom: c, selectedTo, selectedDate, selectedSeats, tripType, date: date.toISOString() });
    } else {
      setSelectedTo(c);
      saveFormData({ selectedFrom, selectedTo: c, selectedDate, selectedSeats, tripType, date: date.toISOString() });
    }
    closeCountryModal();
  };

  const swap = () => {
    const tmpFrom = selectedFrom;
    const tmpTo = selectedTo;
    setSelectedFrom(tmpTo);
    setSelectedTo(tmpFrom);
    saveFormData({ selectedFrom: tmpTo, selectedTo: tmpFrom, selectedDate, selectedSeats, tripType, date: date.toISOString() });
  };

  const openDatePicker = () => {
    setFocusedField("date");
    setIsDatePickerVisible(true);
  };

  // Save on date change
  const onDateChange = (_, picked) => {
    setIsDatePickerVisible(false);
    if (picked) {
      setDate(picked);
      setSelectedDate(picked.toLocaleDateString());
      saveFormData({ selectedFrom, selectedTo, selectedDate: picked.toLocaleDateString(), selectedSeats, tripType, date: picked.toISOString() });
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

  // Save on pick
  const pickSeats = (s) => {
    setSelectedSeats(s);
    saveFormData({ selectedFrom, selectedTo, selectedDate, selectedSeats: s, tripType, date: date.toISOString() });
    closeSeatsModal();
  };

  // Save on trip type selection
  const selectTripType = (type) => {
    setTripType(type);
    saveFormData({ selectedFrom, selectedTo, selectedDate, selectedSeats, tripType: type, date: date.toISOString() });
  };

  const handleBookNow = () => {
    if (!selectedFrom || !selectedTo || !selectedDate || !selectedSeats) {
      Alert.alert("Selection Missing", "Please Enter Data Into fields.");
      return;
    }

    // Calculate a return date for round trips (1 week later)
    const returnDate = new Date(date);
    returnDate.setDate(returnDate.getDate() + 7);

    setBookingDetails({
      from: selectedFrom.name,
      to: selectedTo.name,
      date: selectedDate,
      departureDate: selectedDate, 
      returnDate: tripType === "oneWay" ? "N/A" : returnDate.toLocaleDateString(),
      seats: selectedSeats,
      passengers: selectedSeats, 
      tripType: tripType === "oneWay" ? "One Way" : "Round Trip",
      totalPrice: calculatePrice(selectedSeats).toString()  
    });

    setIsBookingModalVisible(true);
  };

  // On navigation, keep state
  const goToDetailTraveler = () => {
    setIsBookingModalVisible(false);

    // Don't clear async storage
    router.push({
      pathname: '/flight/DetailTraveler',
      params: {  
        from: selectedFrom.name,
        to: selectedTo.name,
        date: selectedDate,
        seats: selectedSeats,
        tripType: tripType === "oneWay" ? "One Way" : "Round Trip"
      }
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.h1}>Book Your Trip Now!!</Text>
      <View style={styles.formContainer}>
        {/* Trip Type */}
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

        {/* From */}
        <TouchableOpacity
          style={[
            styles.inputField,
            focusedField === "from" && { borderColor: primaryColor },
          ]}
          onPress={() => openCountryModal("from")}
        >
          <Text style={styles.inputLabel}>From</Text>
          <Text style={styles.inputValue}>
            {selectedFrom ? selectedFrom.name : "Select Origin"}
          </Text>
        </TouchableOpacity>

        {/* Swap */}
        <TouchableOpacity style={styles.swapButton} onPress={swap}>
          <Ionicons name="swap-vertical" size={24} color="#fff" />
        </TouchableOpacity>

        {/* To */}
        <TouchableOpacity
          style={[
            styles.inputField,
            focusedField === "to" && { borderColor: primaryColor },
          ]}
          onPress={() => openCountryModal("to")}
        >
          <Text style={styles.inputLabel}>To</Text>
          <Text style={styles.inputValue}>
            {selectedTo ? selectedTo.name : "Select Destination"}
          </Text>
        </TouchableOpacity>

        {/* Date & Seats */}
        <View style={styles.dateTimePassengerContainer}>
          <TouchableOpacity
            style={[
              styles.datePassengerField,
              focusedField === "date" && { borderColor: primaryColor },
            ]}
            onPress={openDatePicker}
          >
            <Text style={styles.inputLabel}>Date</Text>
            <Text style={styles.inputValue}>{selectedDate}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.datePassengerField,
              focusedField === "seats" && { borderColor: primaryColor },
            ]}
            onPress={openSeatsModal}
          >
            <Text style={styles.inputLabel}>Seats</Text>
            <Text style={styles.inputValue}>{selectedSeats}</Text>
          </TouchableOpacity>
        </View>

        {/* Book Now */}
        <TouchableOpacity
          style={styles.bookNowButton}
          onPress={handleBookNow}
        >
          <Text style={styles.bookNowButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>

      {/* Country Modal */}
      <Modal
        visible={isCountryModalVisible}
        transparent
        animationType="slide"
        onRequestClose={closeCountryModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              Select {countryModalType === "from" ? "Origin" : "Destination"}
            </Text>

            {/* Search Input */}
            <TextInput
              style={[
                styles.modalSearchInput,
                focusedField === 'search' && { borderColor: primaryColor }
              ]}
              placeholder="Search country..."
              value={countrySearch}
              onChangeText={setCountrySearch}
              onFocus={() => setFocusedField('search')}
              onBlur={() => setFocusedField(null)}
            />

            <ScrollView style={{ width: "100%" }}>
              {filteredCountries.map((c) => (
                <TouchableOpacity
                  key={c.isoCode}
                  style={styles.modalDestinationItem}
                  onPress={() => pickCountry(c)}
                >
                  <Text style={styles.modalDestinationName}>{c.name}</Text>
                  <Text style={styles.modalDestinationLocation}>
                    {c.isoCode}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={closeCountryModal}
            >
              <Text style={styles.modalCloseButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Date Picker */}
      {isDatePickerVisible && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}

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

      {/* CUSTOM BOOKING CONFIRMATION MODAL */}
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
              <TouchableOpacity
                style={styles.button}
                onPress={goToDetailTraveler}
              >
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
    </ScrollView>
  );
}