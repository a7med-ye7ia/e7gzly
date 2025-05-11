import React, { useEffect } from 'react';
import { View, ImageBackground, Text, ScrollView, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserById } from '../../services/userService';
import { getFlightById } from '../../services/flightService';

const { width } = Dimensions.get('window');

const PassengerSummary = () => {
    const router = useRouter();
    const params = useLocalSearchParams();
    const parsedPassengers = params.passengers ? JSON.parse(params.passengers) : [];

    const goToFlightDetails = async () => {
        console.log("goToDetails")
        const storedUserEmail = await AsyncStorage.getItem("userEmail");
        console.log("storedUserEmail", storedUserEmail)
        const user = await getUserById(storedUserEmail);
        console.log("user", user)
        const bookedTripsIDs = user.bookedTrips || [];
        console.log("bookedTripsIDs", bookedTripsIDs)
        const trips = await Promise.all(
            bookedTripsIDs.map(async (tripID) => {
            const flight = await getFlightById(tripID);
            return { data: flight, id: tripID };
            })
        );
        console.log("trips", trips)

        router.push({
            pathname: "../main/product-info",
            params: {
              id: params.id,
              cityFromCode: trips.find((trip) => trip.id === params.id).data.cityFromCode,
              cityFromName: trips.find((trip) => trip.id === params.id).data.cityFromName,
              cityToCode: trips.find((trip) => trip.id === params.id).data.cityToCode,
              cityToName: trips.find((trip) => trip.id === params.id).data.cityToName,
              flightTime: trips.find((trip) => trip.id === params.id).data.flightTime,
              arrivalTime: trips.find((trip) => trip.id === params.id).data.arrivalTime,
              flightDuration: trips.find((trip) => trip.id === params.id).data.flightDuration,
              airLine: trips.find((trip) => trip.id === params.id).data.airLine,
              class: trips.find((trip) => trip.id === params.id).data.class,
              price: trips.find((trip) => trip.id === params.id).data.price,
              new: trips.find((trip) => trip.id === params.id).data.new,
              featured: trips.find((trip) => trip.id === params.id).data.featured,
              about: trips.find((trip) => trip.id === params.id).data.about,
              photos: trips.find((trip) => trip.id === params.id).data.photos,
              interests: trips.find((trip) => trip.id === params.id).data.interests,
              rating: trips.find((trip) => trip.id === params.id).data.rating,
              showOnly: true,
            }
          })
    }


    return (
        <View style={styles.container}>
            {/* Header with full overlay and centered title */}
            <ImageBackground
                source={require('../../assets/scheduling.png')}
                style={styles.headerImage}
                resizeMode="cover"
            >
                <View style={styles.overlay}>
                    <Text style={styles.titlePage}>Passenger Booking</Text>
                </View>
            </ImageBackground>

            <ScrollView
                vertical
                showsVerticalScrollIndicator={false}
            >
                {parsedPassengers.map((passenger, index) => (
                    <View key={index} style={styles.page}>
                        <Text style={styles.title}>Passenger {index + 1}</Text>

                        <View style={styles.textContent}>
                            <Text style={styles.label}>Full Name:</Text>
                            <Text style={styles.value}>{passenger.name}</Text>
                        </View>

                        <View style={styles.textContent}>
                            <Text style={styles.label}>Citizenship:</Text>
                            <Text style={styles.value}>{passenger.citizenship}</Text>
                        </View>

                        <View style={styles.textContent}>
                            <Text style={styles.label}>Passport Number:</Text>
                            <Text style={styles.value}>{passenger.passportNumber}</Text>
                        </View>

                        <View style={styles.textContent}>
                            <Text style={styles.label}>Expiration Date:</Text>
                            <Text style={styles.value}>{passenger.expirationDates}</Text>
                        </View>
                    </View>
                ))}

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={goToFlightDetails}>
                        <Text style={styles.buttonText}>Go to Flight Details</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerImage: {
        width: '100%',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    titlePage: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
    page: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flex: 1,
        paddingVertical: 20,
        width: width,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#5D3FD3',
    },
    textContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
        color: '#666',
        width: '45%',
    },
    value: {
        fontSize: 18,
        color: '#000',
        width: '55%',
        textAlign: 'right',
    },
    buttonContainer: {
        gap: 12,
        alignItems: "center",
        marginTop: 20 ,
        marginBottom: 5
    },
    button: {
        backgroundColor: '#5D3FD3',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 12,
        alignSelf: 'center',
        marginBottom: 5,
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default PassengerSummary;
