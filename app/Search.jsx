import { useState, useEffect ,useCallback } from "react";
import {StyleSheet,View,Text,Image,ScrollView,TouchableOpacity,DimensionsAlert,TextInput,Modal,Alert
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles/styleSearch";
import { getAllFlightsTWO ,addBooking } from "../services/flightService";
import DateTimePickerModal from 'react-native-modal-datetime-picker';

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
  const [selectedDate, setSelectedDate] = useState("25/06/2023");
  const [selectedPassengers, setSelectedPassengers] = useState("2 Seat");
  const [tripType, setTripType] = useState('oneWay');
  const [expirationDate, setExpirationDate] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState(new Date());
  const [isPassengerModalVisible, setIsPassengerModalVisible] = useState(false);
  const passengerOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; 
  const [isSaving, setIsSaving] = useState(false);
  useEffect(() => {
    const getFlights = async () => {
      try {
        setIsLoading(true);
        const { success, data, error } = await getAllFlightsTWO();
        
        if (!success) {
          console.error('API Error fetching flights:', error);
          throw new Error(error || 'Failed to fetch flights');
        }
        
        if (!Array.isArray(data)) {
          console.error('Unexpected data format received from API:', data);
          throw new Error('Invalid data format received');
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
        console.error('Error in Search component processing flights:', err);
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
    if (selectionType === 'from') setSelectedFrom(destination);
    else if (selectionType === 'to') setSelectedTo(destination);
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
  const showDatePicker = useCallback(() => {
          setDatePickerVisibility(true);
      }, []);
  
      const hideDatePicker = useCallback(() => {
          setDatePickerVisibility(false);
      }, []);
  
      const handleConfirm = (selectedDate) => {
          if (selectedDate) {
              setDate(selectedDate);
              const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
              const year = selectedDate.getFullYear();
              setExpirationDate(`${month}/${year}`);
          }
          hideDatePicker();
      };

      const openPassengerModal = () => {
        setIsPassengerModalVisible(true);
    };
  
    const selectPassenger = (passengerCount) => {
        setSelectedPassengers(passengerCount); 
        setIsPassengerModalVisible(false); 
    }
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
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

        <TouchableOpacity style={styles.inputField} onPress={() => openModal('from')}>
          <Text style={styles.inputLabel}>From</Text>
          <Text style={styles.inputValue}>{selectedFrom ? `${selectedFrom.name}, ${selectedFrom.location}` : "Select Origin"}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.swapButton} onPress={swapDestinations}>
          <Ionicons name="swap-vertical" size={24} color={white} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.inputField} onPress={() => openModal('to')}>
          <Text style={styles.inputLabel}>To</Text>
          <Text style={styles.inputValue}>{selectedTo ? `${selectedTo.name}, ${selectedTo.location}` : "Select Destination"}</Text>
        </TouchableOpacity>

        {/* Date and Passenger Inputs */}
        <View style={styles.dateTimePassengerContainer}>
        <View style={styles.datePassengerField}>
            <Text style={styles.label}>Expiration Date</Text>
            <TouchableOpacity 
                style={styles.dateInput}
                onPress={showDatePicker}
            >
                <Text>{expirationDate || 'MM/YYYY'}</Text>
                <Image 
                    source={{ uri: 'https://cdn-icons-png.flaticon.com/512/747/747310.png' }}
                    style={styles.calendarIcon}
                />
            </TouchableOpacity>
        </View>
        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                            date={date} 
                            minimumDate={new Date()}
                            
                        />
         {/* <View style={styles.dateTimePassengerContainer}>

             <TouchableOpacity style={styles.dateTimePassengerContainer} onPress={openPassengerModal}>
                <Text style={styles.inputLabel}>Passenger</Text>
                <Text style={styles.inputValue}>{`${selectedPassengers} Passenger${selectedPassengers > 1 ? 's' : ''}`}</Text>
            </TouchableOpacity>
        </View> */}
</View>
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
    </ScrollView>
  );
}
