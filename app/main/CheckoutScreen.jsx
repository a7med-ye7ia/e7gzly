// CheckoutScreen.js
import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path, Circle } from 'react-native-svg';

const ROUTE = {
  from: { code: 'CGK', city: 'Tangerang' },
  to:   { code: 'TLC', city: 'Ciliwung' },
};

const BOOKING = {
  imageUri: '/assets/img.png',
  location: 'Ciliwung',
  region:   'Tangerang',
  rating:   4.8,
  details: [
    { label: 'Traveler',   value: '2 person' },
    { label: 'Seat',       value: 'A3, B3' },
    { label: 'Insurance',  value: 'IDR 1.950.000' },
    { label: 'Lounge Access', value: 'IDR 2.400.000' },
    { label: 'Refundable', value: 'NO' },
    { label: 'VAT',        value: '45%' },
    { label: 'Price',      value: 'IDR 12.000.000' },
    { label: 'Grand Total',value: 'IDR 72.000.000' },
  ],
};

const PAYMENT = {
  label: 'Current Balance',
  amount: 'IDR 80.400.000',
};

const FlightPath = () => (
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
    
    {/* This is the key part that needs fixing */}
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

export default function CheckoutScreen() {
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
          <View style={styles.paymentIconContainer}>
            <Ionicons name="airplane" size={20} color="white" />
            <Text style={styles.payText}>Pay</Text>
          </View>
          <View style={styles.paymentInfo}>
            <Text style={styles.paymentAmount}>{PAYMENT.amount}</Text>
            <Text style={styles.paymentLabel}>{PAYMENT.label}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.payButton}>
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
  arcContainer: {
    position: 'relative',
    height: 80,
    width: '100%',
  },
  planeIconContainer: {
    position: 'absolute',
    top: 0, // Adjust based on where the highest point of your arc is
    left: 175, // The x-coordinate of the control point
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