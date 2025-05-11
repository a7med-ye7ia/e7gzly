import React from 'react';
import { View, ImageBackground, Text, ScrollView, Dimensions, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const { width } = Dimensions.get('window');
const params = useLocalSearchParams();
const passengers = params.passengers;
const PassengerSummary = () => {
    const params = useLocalSearchParams();
    // const parsedPassengers = passengers ? JSON.parse(decodeURIComponent(passengers)) : [];
    const parsedPassengers = JSON.parse(params.detail);

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
                            <Text style={styles.value}>{passenger.fullName}</Text>
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
                            <Text style={styles.value}>{passenger.expirationDate}</Text>
                        </View>
                    </View>
                ))}
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
});

export default PassengerSummary;
