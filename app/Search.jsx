import { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, Alert, Modal } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
//import DateTimePicker from '@react-native-community/datetimepicker';
//import { Picker } from '@react-native-picker/picker';
import { getAllFlights } from "../services/flightService";
import styles from "../styles/styleSearch";

const primaryColor = "#6A0DAD";
const grayText = "#666";
const lightGray = "#eee";
const white = "#fff";

export default function Search() {
  const router = useRouter();

  const [destinations, setDestinations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFrom, setSelectedFrom] = useState(null);
  const [selectedTo, setSelectedTo] = useState(null);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectionType, setSelectionType] = useState(null);

  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState("25/06/2023");
  
  const [isPassengerPickerVisible, setIsPassengerPickerVisible] = useState(false);
  const [selectedPassengers, setSelectedPassengers] = useState("2 Seats");
  
  const [tripType, setTripType] = useState('oneWay');


  useEffect(() => {
    const getFlights = async () => {
      try {
        setIsLoading(true);
        const { success, data, error } = await getAllFlights();
        if (!success) {
          throw new Error(error || 'Failed to fetch flights');
        }
        const fetchedDestinations = data.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          location: doc.data().location,
          image: doc.data().image,
          rating: doc.data().rating,
          featured: doc.data().featured,
          price: doc.data().price,
          museumLink: doc.data().museumLink,
          new: doc.data().new,
        }));

        setDestinations(fetchedDestinations);

      } catch (err) {
        console.error('Error fetching flights:', err);
        Alert.alert('Error', 'Failed to load flight destinations. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    getFlights();
  }, []);

  const openModal = (type) => {
    setSelectionType(type);
    setIsModalVisible(true);
  };

  const selectDestination = (destination) => {
    if (selectionType === 'from') {
      setSelectedFrom(destination);
    } else if (selectionType === 'to') {
      setSelectedTo(destination);
    }
    setIsModalVisible(false);
    setSelectionType(null);
  };

  const swapDestinations = () => {
    const temp = selectedFrom;
    setSelectedFrom(selectedTo);
    setSelectedTo(temp);
  };

  const handleBookNow = () => {
    if (!selectedFrom || !selectedTo) {
      Alert.alert("Selection Missing", "Please select both origin and destination.");
      return;
    }
    console.log("Booking:", {
      from: selectedFrom.name,
      to: selectedTo.name,
      date: selectedDate,
      passengers: selectedPassengers,
      tripType: tripType,
    });
    Alert.alert("Booking Initiated", `Booking from ${selectedFrom.name} to ${selectedTo.name} on ${selectedDate}`);
  };

  const showDatePicker = () => {
    setIsDatePickerVisible(true);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setIsDatePickerVisible(false);
    setSelectedDate(currentDate.toLocaleDateString());
  };

  const showPassengerPicker = () => {
    setIsPassengerPickerVisible(true);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header / Form Area */}
      <View style={styles.formContainer}>
        {/* Trip Type Buttons */}
        <View style={styles.tripTypeButtons}>
          <TouchableOpacity
            style={[styles.tripTypeButton, tripType === 'oneWay' && styles.tripTypeButtonActive]}
            onPress={() => setTripType('oneWay')}
          >
            <Text style={[styles.tripTypeButtonText, tripType === 'oneWay' && styles.tripTypeButtonTextActive]}>One Way</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tripTypeButton, tripType === 'roundTrip' && styles.tripTypeButtonActive]}
            onPress={() => setTripType('roundTrip')}
          >
            <Text style={[styles.tripTypeButtonText, tripType === 'roundTrip' && styles.tripTypeButtonTextActive]}>Round Trip</Text>
          </TouchableOpacity>
        </View>

        {/* From Input */}
        <TouchableOpacity style={styles.inputField} onPress={() => openModal('from')}>
          <Text style={styles.inputLabel}>From</Text>
          <Text style={styles.inputValue}>{selectedFrom ? `${selectedFrom.name}, ${selectedFrom.location}` : "Select Origin"}</Text>
        </TouchableOpacity>

        {/* Swap Button */}
        <TouchableOpacity style={styles.swapButton} onPress={swapDestinations}>
          <Ionicons name="swap-vertical" size={24} color={white} />
        </TouchableOpacity>

        {/* To Input */}
        <TouchableOpacity style={styles.inputField} onPress={() => openModal('to')}>
          <Text style={styles.inputLabel}>To</Text>
          <Text style={styles.inputValue}>{selectedTo ? `${selectedTo.name}, ${selectedTo.location}` : "Select Destination"}</Text>
        </TouchableOpacity>

        {/* Date and Passenger Inputs */}
        <View style={styles.dateTimePassengerContainer}>
          <TouchableOpacity style={styles.datePassengerField} onPress={showDatePicker}>
            <Text style={styles.inputLabel}>Date</Text>
            <Text style={styles.inputValue}>{selectedDate}</Text>
          </TouchableOpacity>
          // Passenger selection input
<TouchableOpacity style={styles.datePassengerField} onPress={() => setIsPassengerPickerVisible(true)}>
  <Text style={styles.inputLabel}>Passenger</Text>
  <Text style={styles.inputValue}>{selectedPassengers}</Text>
</TouchableOpacity>


        </View>

        {/* Book Now Button */}
        <TouchableOpacity style={styles.bookNowButton} onPress={handleBookNow} disabled={isLoading || !selectedFrom || !selectedTo}>
          {isLoading ? (
            <Text style={styles.bookNowButtonText}>Loading...</Text>
          ) : (
            <Text style={styles.bookNowButtonText}>Book Now</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Modal for Destination Selection */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(!isModalVisible);
          setSelectionType(null);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{`Select ${selectionType === 'from' ? 'Origin' : 'Destination'}`}</Text>

            {isLoading ? (
              <Text style={styles.loadingText}>Loading destinations...</Text>
            ) : (
              <ScrollView showsVerticalScrollIndicator={false} style={{ width: '100%' }}>
                {destinations.map((destination) => (
                  <TouchableOpacity
                    key={destination.id}
                    style={styles.modalDestinationItem}
                    onPress={() => selectDestination(destination)}
                  >
                    <Text style={styles.modalDestinationName}>{destination.name}</Text>
                    <Text style={styles.modalDestinationLocation}>{destination.location}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}

            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => {
                setIsModalVisible(false);
                setSelectionType(null);
              }}
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
          onChange={handleDateChange}
        />
      )}

      {/* Passenger Picker Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isPassengerPickerVisible}
        onRequestClose={() => setIsPassengerPickerVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select Number of Passengers</Text>
            <Picker
              selectedValue={selectedPassengers}
              onValueChange={(itemValue) => setSelectedPassengers(itemValue)}
            >
              <Picker.Item label="1 Seat" value="1 Seat" />
              <Picker.Item label="2 Seats" value="2 Seats" />
              <Picker.Item label="3 Seats" value="3 Seats" />
              <Picker.Item label="4 Seats" value="4 Seats" />
            </Picker>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setIsPassengerPickerVisible(false)}
            >
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}