import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Alert, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import stylePages from "../../styles/stylePages";
import defaultImage from "../../assets/default-avatar.jpg";

export default function SearchResult() {

  const flightFromCode = "CGK";
  const flightFromName = "Jakarta";
  const flightToCode = "TLC";
  const flightToName = "Ciliwung";


  return (
    <ScrollView style={[stylePages.searchResultContainer, {backgroundColor: '#FAFAFA'}]}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20}}>
        <TouchableOpacity onPress={() => router.back()} style={stylePages.back}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        <Text style={stylePages.profileTitle}>Select Flight</Text>

        <TouchableOpacity onPress={() => alert('clicked')} style={stylePages.back}>
          <Ionicons name="options-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={{width: '70%', height: 50, borderRadius: 10, flexDirection: 'row', marginTop: 20, justifyContent: 'center', alignItems: 'center', alignSelf: 'center'}}>
        <City cityCode={flightFromCode} cityName={flightFromName} />
        
        <View style={{width: '50%', height: 50, borderRadius: 10, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', position: 'relative'}}>
          <View style={stylePages.dashedLine} />
          <Ionicons name="airplane" size={35} color="#6C3BD4" />
        </View>
        
        <City cityCode={flightFromCode} cityName={flightFromName} />
      </View>

      <Text style={{color: '#666', fontSize: 14, marginTop: 30, textAlign: 'center'}}>Flight schedule</Text>

      <FlightTicket
        from={{ code: "CGK", city: "Tangerang" }}
        to={{ code: "TLC", city: "Ciliwung" }}
        depTime="08:10 AM"
        arrTime="11:50 AM"
        duration="3h 40m"
        airline="Garuda Indonesia - Business Class"
        price="IDR 6.000.000"
      />


    </ScrollView>
  );
}

const City = ({cityCode, cityName}) => (
  <View style={{width: '25%', height: 50, borderRadius: 10, justifyContent: 'center', alignItems: 'center', alignSelf: 'center'}}>
    <Text style={{color: 'black', fontSize: 24, fontWeight: 'bold'}}>{cityCode}</Text>
    <Text style={{color: '#666', fontSize: 14}}>{cityName}</Text>
  </View>
)

const FlightTicket = ({ from, to, depTime, arrTime, duration, airline, price }) => {
  return (
    <View style={styles.wrapper}>
      {/* Left Cutout */}
      <View style={[styles.cutout, { left: -10 }]} />
      {/* Right Cutout */}
      <View style={[styles.cutout, { right: -10 }]} />

      {/* Main Ticket Card */}
      <View style={styles.card}>
        {/* Top Row */}
        <View style={styles.row}>
          <View style={styles.airport}>
            <Text style={styles.code}>{from.code}</Text>
            <Text style={styles.city}>{from.city}</Text>
            <Text style={styles.time}>{depTime}</Text>
          </View>

          <View style={styles.flightPath}>
            <View style={styles.dashedLine} />
            <Ionicons name="airplane" size={20} color="#6C3BD4" />
            <Text style={styles.duration}>{duration}</Text>
          </View>

          <View style={styles.airport}>
            <Text style={styles.code}>{to.code}</Text>
            <Text style={styles.city}>{to.city}</Text>
            <Text style={styles.time}>{arrTime}</Text>
          </View>
        </View>

        {/* Bottom Row */}
        <View style={styles.bottomRow}>
          <Text style={styles.airline}>{airline}</Text>
          <Text style={styles.price}>{price}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    marginVertical: 20,
    marginHorizontal: 20,
  },
  cutout: {
    position: 'absolute',
    top: '45%',
    width: 30,
    height: 30,
    backgroundColor: '#FAFAFA',
    borderRadius: 20,
    zIndex: 2,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    borderColor: 'red',
    padding: 16,
    // elevation: 4,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 8,
    zIndex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  airport: {
    alignItems: 'center',
    width: '30%',
  },
  code: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  city: {
    color: '#888',
    fontSize: 12,
  },
  time: {
    marginTop: 4,
    color: '#333',
    fontSize: 12,
  },
  flightPath: {
    width: '30%',
    alignItems: 'center',
  },
  dashedLine: {
    width: '100%',
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 4,
  },
  duration: {
    marginTop: 4,
    fontSize: 12,
    color: '#888',
  },
  bottomRow: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  airline: {
    color: '#6C3BD4',
    fontWeight: 'bold',
    fontSize: 13,
  },
  price: {
    color: '#6C3BD4',
    fontWeight: 'bold',
    fontSize: 13,
  },
});