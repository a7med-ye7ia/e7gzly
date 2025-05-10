import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from 'react-native';
import {router} from "expo-router";

const BookingSuccessScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/scheduling.png')} // make sure to place your image here
                style={styles.image}
                resizeMode="contain"
            />
            <Text style={styles.title}>Well Booked </Text>
            <Text style={styles.subtitle}>
                Are you ready to explore the new{'\n'}world of experiences?
            </Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => router.push('/profile/bookedTravels')}
            >
                <Text style={styles.buttonText}>My Bookings</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => router.push('/flight-destinations')}
            >
                <Text style={styles.buttonText}>Home</Text>
            </TouchableOpacity>
        </View>
    );
};

export default BookingSuccessScreen;

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F9F9',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    image: {
        width: width * 0.7,
        height: width * 0.7,
        marginBottom: 30,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1A1A1A',
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 14,
        color: '#888',
        textAlign: 'center',
        marginBottom: 40,
        lineHeight: 22,
    },
    button: {
        backgroundColor: '#5D50C6',
        paddingVertical: 14,
        paddingHorizontal: 40,
        borderRadius: 30,
        marginBottom:20,
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
