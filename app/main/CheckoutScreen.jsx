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
import { Ionicons } from '@expo/vector-icons'; // for the airplane icon

const ROUTE = {
  from: { code: 'CGK', city: 'Tangerang' },
  to:   { code: 'TLC', city: 'Ciliwung' },
};

const BOOKING = {
  imageUri: '/assets/img.png', // replace with your image URL
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

export default function CheckoutScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>

        <View style={styles.routeCard}>
          <View style={styles.routePoint}>
            <View style={styles.dot} />
            <Text style={styles.code}>{ROUTE.from.code}</Text>
            <Text style={styles.city}>{ROUTE.from.city}</Text>
          </View>
          
          <View style={styles.planeContainer}>
            <View style={styles.dashedLine} />
            <Ionicons name="airplane" size={24} color="#5E50A1" style={styles.planeIcon}/>
          </View>

          <View style={styles.routePoint}>
            <View style={[styles.dot, { backgroundColor: '#2ECE81' }]} />
            <Text style={styles.code}>{ROUTE.to.code}</Text>
            <Text style={styles.city}>{ROUTE.to.city}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Image source={{ uri: BOOKING.imageUri }} style={styles.image} />

          <View style={styles.titleRow}>
            <View>
              <Text style={styles.location}>{BOOKING.location}</Text>
              <Text style={styles.region}>{BOOKING.region}</Text>
            </View>
            <View style={styles.rating}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.ratingText}>{BOOKING.rating}</Text>
            </View>
          </View>

          <Text style={styles.sectionHeader}>Booking Details</Text>
          {BOOKING.details.map((item, i) => (
            <View key={i} style={styles.detailRow}>
              <Text style={styles.detailLabel}>{item.label}</Text>
              <Text style={styles.detailValue}>{item.value}</Text>
            </View>
          ))}
        </View>

        <View style={styles.paymentCard}>
          <View style={styles.paymentRow}>
            <Ionicons name="card-outline" size={20} color="#5E50A1" />
            <Text style={styles.paymentLabel}>{PAYMENT.label}</Text>
            <Text style={styles.paymentAmount}>{PAYMENT.amount}</Text>
          </View>
          <TouchableOpacity style={styles.payButton}>
            <Text style={styles.payButtonText}>Pay</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Pay Now</Text>
        </TouchableOpacity>

        <Text style={styles.terms}>Terms and Conditions</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F8F8F8' },
  container: {
    padding: 20,
    alignItems: 'center',
  },
  routeCard: {
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  routePoint: { alignItems: 'center', width: 60 },
  dot: {
    width: 8, height: 8, borderRadius: 4,
    backgroundColor: '#9CA3AF', marginBottom: 8
  },
  code: { fontSize: 16, fontWeight: 'bold' },
  city: { fontSize: 12, color: '#6B7280' },
  planeContainer: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
  },
  dashedLine: {
    position: 'absolute',
    top: '50%',
    width: '100%',
    borderTopWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#D1D5DB',
  },
  planeIcon: {
    backgroundColor: '#fff',
    padding: 4,
    borderRadius: 12,
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 16,
    marginBottom: 12,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  location: { fontSize: 18, fontWeight: 'bold' },
  region: { fontSize: 14, color: '#6B7280' },
  rating: { flexDirection: 'row', alignItems: 'center' },
  ratingText: { marginLeft: 4, fontSize: 14, fontWeight: '600' },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  detailLabel: { fontSize: 14, color: '#4B5563' },
  detailValue: { fontSize: 14, fontWeight: '500' },
  paymentCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentRow: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  paymentLabel: { marginLeft: 8, fontSize: 14, flex: 1 },
  paymentAmount: { fontSize: 14, fontWeight: '600' },
  payButton: {
    backgroundColor: '#5E50A1',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  payButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  submitButton: {
    width: '100%',
    backgroundColor: '#5E50A1',
    paddingVertical: 16,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 12,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  terms: {
    fontSize: 12,
    color: '#9CA3AF',
    textDecorationLine: 'underline',
  },
});
