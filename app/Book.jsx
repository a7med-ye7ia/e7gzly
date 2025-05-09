import React, { useState, useEffect } from "react";
import { View,Text,ScrollView,TouchableOpacity,Alert,Modal,TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Country } from "country-state-city";
import { useRouter } from "expo-router";
import styles from "../styles/styleBooking";

const primaryColor = "#5C40CC";

export default function Book() {
  const [countries, setCountries] = useState([]);
  const [countrySearch, setCountrySearch] = useState("");

  useEffect(() => {
    const list = Country.getAllCountries();
    setCountries(list);
  }, []);

  const filteredCountries = countries.filter((c) =>
    c.name.toLowerCase().includes(countrySearch.toLowerCase())
  );

  const seats = ["1 Seat", "2 Seats", "3 Seats", "4 Seats", "5 Seats"];

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

  // Load countries on mount
  useEffect(() => {
    const list = Country.getAllCountries();
    setCountries(list);
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
  // Pickers just update local state now
  const pickCountry = (c) => {
    if (countryModalType === "from") {
      setSelectedFrom(c);
    } else {
      setSelectedTo(c);
    }
    closeCountryModal();
  };

  const swap = () => {
    const tmpFrom = selectedFrom;
    const tmpTo = selectedTo;
    setSelectedFrom(tmpTo);
    setSelectedTo(tmpFrom);
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

  const handleBookNow = () => {
    if (!selectedFrom || !selectedTo) {
      Alert.alert("Selection Missing", "Please select both From and To.");
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

  const goToDetailTraveler = () => {
    setIsBookingModalVisible(false);

    router.push({
      pathname: '/book/DetailTraveler',
      pathname: '/book/DetailTraveler',
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
              onPress={() => setTripType(type)}
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

            {/* ← Updated Search Input Here */}
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
    </ScrollView>
  );
}