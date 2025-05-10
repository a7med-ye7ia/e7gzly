// CheckoutScreen.js
import React, {useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView, Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path } from 'react-native-svg';
import {useLocalSearchParams , useRouter } from 'expo-router';
import {addFlightToUser} from "../../services/userService";
import {auth} from "../../config/firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth } from "firebase/auth";

const FlightPath = () => {
  const router = useRouter();
  const params = useLocalSearchParams();


  const ROUTE = {
    from: { code: params.cityFromCode, city: params.cityFromName },
    to:   { code: params.cityToCode, city: params.cityToName },
  };

  return (
    <View style={styles.flightPathContainer}>
      <View style={styles.routePointsContainer}>
        <View style={styles.routePoint}>
          <View style={styles.originDot} />
          <Text style={styles.codeText}>{ROUTE.from.code}</Text>
          <Text style={styles.cityText}>{ROUTE.from.city}</Text>
        </View>
        
        <View style={styles.routePoint}>
          <View style={styles.destinationDot} />
          <Text style={styles.codeText}>{ROUTE.to.code}</Text>
          <Text style={styles.cityText}>{ROUTE.to.city}</Text>
        </View>
      </View>
      
      <View style={styles.arcContainer}>
        <Svg height="80" width="100%" style={{position: 'absolute', top: 0}}>
          <Path
            d="M 40 50 Q 175 -20 310 50"
            stroke="#E0E0E0"
            strokeWidth="2"
            strokeDasharray="5,5"
            fill="transparent"
          />
        </Svg>
        <View style={styles.planeIconContainer}>
          <Ionicons name="airplane" size={16} color="#FFFFFF" />
        </View>
      </View>
    </View>
  );
};

export default function CheckoutScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const auth = getAuth();
  const user = auth.currentUser;

  const [userEmail, setUserEmail] = React.useState(null);

  // useEffect(() => {
  //   const newBooking = auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       // console.log("User is signed in:", user.email);
  //       // setUserEmail(user.email);
  //       // addFlightToUser(auth.currentUser.email, params.id)
  //       getData();
  //     } else {
  //       Alert.alert("Booking Failed", "Please login first");
  //       AsyncStorage.getItem("userEmail").then((email) => {
  //         if (email) {
  //           console.log("Using stored email:", email);
  //           setUserEmail(email);
  //           getData();
  //         }
  //       });
  //     }
  //   });
  //
  //   return () => unsubscribe();
  // }, []);

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged(async (user) => {
  //     if (user) {
  //       await addFlightToUser(user.email, params.id);
  //       setUserEmail(user.email);
  //       getData();
  //     } else {
  //       Alert.alert("Booking Failed", "Please login first");
  //       const email = await AsyncStorage.getItem("userEmail");
  //       if (email) {
  //         console.log("Using stored email:", email);
  //         setUserEmail(email);
  //         getData();
  //       }
  //     }
  //   });
  //
  //   return () => unsubscribe();
  // }, []);


  const handleBookingConfirmation = () => {
    router.push({
      pathname: "/main/booking-confirmation",
    });
  };

  const BOOKING = {
    imageUri: '/assets/img.png',
    location: params.cityFromName,
    region:   params.cityToName,
    rating:   4.8,
    details: [
      { label: 'Traveler',   value: `${params.seats} passengers` },
      { label: 'Seat',       value: params.selectedSeats },
      { label: 'Insurance',  value: `IDR ${params.totalPrice}`},
      { label: 'Extra Services', value: `IDR ${params.extraServicesPrice}` },
      { label: 'Refundable', value: 'NO' },
      { label: 'VAT',        value: '45%' },
      { label: 'Price',      value: `IDR ${params.totalPrice + params.extraServicesPrice} ` },
      { label: 'Grand Total',value: `IDR ${(params.totalPrice + params.extraServicesPrice)*.55}` },
    ],
  };

  const PAYMENT = {
    label: 'Current Balance',
    amount: 'IDR 80.400.000',
  };
  // addFlightToUser(params.flightId , auth.currentUser.email)
  const handleCheckBooking = async () =>{
    const storedUserEmail = await AsyncStorage.getItem("userEmail");
    console.log("Stored user email:", storedUserEmail);
    const {success, error} = await addFlightToUser(storedUserEmail, params.id)
    if (success) {
      router.push("/book/successBooking")
    } else {
      Alert.alert("Booking Failed", error);
      console.log(error);
    }
  }

  
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <FlightPath />

        <View style={styles.bookingInfoContainer}>
          <Image source={{ uri: BOOKING.imageUri }} style={styles.locationImage} />
          <View style={styles.locationInfo}>
            <Text style={styles.locationName}>{BOOKING.location}</Text>
            <Text style={styles.regionName}>{BOOKING.region}</Text>
          </View>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FF9F43" style={styles.starIcon} />
            <Text style={styles.ratingText}>{BOOKING.rating}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Booking Details</Text>
        
        {BOOKING.details.map((item, i) => (
          <View key={i} style={styles.detailRow}>
            <View style={styles.detailLabelContainer}>
              <View style={styles.checkCircle}>
                <Ionicons name="checkmark" size={12} color="#6C5CE7" />
              </View>
              <Text style={styles.detailLabel}>{item.label}</Text>
            </View>
            <Text 
              style={[
                styles.detailValue, 
                item.label === 'Refundable' && styles.refundableValue,
                item.label === 'Grand Total' && styles.totalValue
              ]}
            >
              {item.value}
            </Text>
          </View>
        ))}

        <Text style={[styles.sectionTitle, {marginTop: 24}]}>Payment Details</Text>
        
        <View style={styles.paymentContainer}>
          <View style={styles.paymentIconContainer} onPress={() => router.push("/book/successBooking")}>
            <Ionicons name="airplane" size={20} color="white" />
            <Text style={styles.payText}>Pay</Text>
          </View>
          <View style={styles.paymentInfo}>
            <Text style={styles.paymentAmount}>{PAYMENT.amount}</Text>
            <Text style={styles.paymentLabel}>{PAYMENT.label}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.payButton} onPress={handleCheckBooking}>
          <Text style={styles.payButtonText}>Pay Now</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.termsText}>Terms and Conditions</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { 
    flex: 1, 
    backgroundColor: '#F8F8F8' 
  },
  container: {
    padding: 24,
    paddingBottom: 40,
  },
  flightPathContainer: {
    height: 120,
    marginBottom: 20,
    position: 'relative',
  },
  routePointsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    zIndex: 2,
  },
  routePoint: {
    alignItems: 'center',
  },
  arcContainer: {
    position: 'relative',
    height: 80,
    width: '100%',
  },
  planeIconContainer: {
    position: 'absolute',
    top: 8,
    left: '50%',
    marginLeft: -12,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#6C5CE7',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  originDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#9CA3AF',
    marginBottom: 8,
  },
  destinationDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CD080',
    marginBottom: 8,
  },
  codeText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A1A3F',
  },
  cityText: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  bookingInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  locationImage: {
    width: 64,
    height: 64,
    borderRadius: 16,
    marginRight: 16,
  },
  locationInfo: {
    flex: 1,
  },
  locationName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A3F',
  },
  regionName: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    marginRight: 4,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF9F43',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A3F',
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(108, 92, 231, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  detailLabel: {
    fontSize: 16,
    color: '#1A1A3F',
  },
  detailValue: {
    fontSize: 16,
    color: '#1A1A3F',
    fontWeight: '500',
  },
  refundableValue: {
    color: '#FF4F7E',
  },
  totalValue: {
    color: '#6C5CE7',
    fontWeight: 'bold',
  },
  paymentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  paymentIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: '#6C5CE7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  payText: {
    color: 'white',
    fontSize: 12,
    marginTop: 4,
  },
  paymentInfo: {
    flex: 1,
  },
  paymentAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A3F',
  },
  paymentLabel: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  payButton: {
    backgroundColor: '#6C5CE7',
    borderRadius: 30,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  payButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  termsText: {
    textAlign: 'center',
    color: '#9CA3AF',
    fontSize: 14,
  },
});