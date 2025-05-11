import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useLocalSearchParams, useRouter } from "expo-router";
import styles from "../../styles/styleBooking";

const baggageOptions = [
    { label: '+10 kg', price: 250000 },
    { label: '+20 kg', price: 450000 },
    { label: '+30 kg', price: 600000 },
    { label: '+40 kg', price: 750000 },
    { label: '+50 kg', price: 900000 },
];

const ExtraServicesScreen = ({ navigation }) => {
    const params = useLocalSearchParams();

    const router = useRouter();
    const [selectedBaggage, setSelectedBaggage] = useState(null);
    const [selectedService, setSelectedService] = useState(null);
    const getTotalPrice = () => {
        let total = 0;
        if (selectedBaggage) total += selectedBaggage.price;
        if (selectedService === 'lounge') total += 2400000;
        if (selectedService === 'insurance') total += 1950000;
        return total;

    };

    const handleCheckoutScreen = () => {
        console.log("Selected Baggage: ", params.selectedSeats);
        router.push({
            pathname: "/main/CheckoutScreen",
            params: {
                id: params.id,
                cityFromCode: params.cityFromCode,
                cityFromName: params.cityFromName,
                cityToCode: params.cityToCode,
                cityToName: params.cityToName,
                totalPrice: params.totalPrice,
                extraServicesPrice: getTotalPrice(),
                seats: params.seats,
                selectedSeats: params.selectedSeats ,
                passengerForms: params.passengerForms,
                extras: JSON.stringify([JSON.stringify(selectedBaggage), selectedService]),
            },
        });
    }

    return (
        <ScrollView style={styles.flightListContainer} showsVerticalScrollIndicator={false}>
            {/* Step Indicator */}
            <View style={styles.stepsContainer}>
                <View style={styles.stepsRow}>
                    <Text style={styles.stepNumber}>①</Text>
                    <Text style={styles.stepNumber}>②</Text>
                    <Ionicons name="airplane" size={18} color="#5D50C6" />
                    <Text style={styles.stepNumberActive}>③</Text>
                </View>
                <View style={styles.stepsRow}>
                    <Text style={styles.stepLabel}>Detail Traveler</Text>
                    <Text style={styles.stepLabel}>Select Seat</Text>
                    <Text style={styles.stepLabelActive}>Extra Services</Text>
                </View>
            </View>

            {/* Baggage Option */}
            <View style={styles.cardExtra}>
                <Text style={styles.cardTitle}>Baggage Option</Text>
                <Text style={styles.cardSubtitle}>Customizable baggage options available</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={styles.baggageOptions}>
                        {baggageOptions.map((option, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.baggageButton,
                                    selectedBaggage?.label === option.label && styles.baggageSelected,
                                ]}
                                onPress={() => setSelectedBaggage(option)}
                            >
                                <Text style={styles.baggageLabel}>{option.label}</Text>
                                <Text style={styles.baggagePrice}>IDR {option.price.toLocaleString()}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            </View>

            {/* Lounge Access */}
            <TouchableOpacity
                style={[
                    styles.cardExtra,
                    selectedService === 'lounge' && styles.cardSelected,
                ]}
                onPress={() => setSelectedService('lounge')}
            >
                <View style={styles.serviceRow}>
                    <Text style={styles.cardTitle}>Lounge Access</Text>
                    <View style={styles.radioCircle}>
                        {selectedService === 'lounge' && <View style={styles.radioDot} />}
                    </View>
                </View>
                <Text style={styles.cardSubtitle}>Luxury relaxing pre-flight</Text>
                <Text style={styles.cardPrice}>IDR 2.400.000</Text>
            </TouchableOpacity>

            {/* Travel Insurance */}
            <TouchableOpacity
                style={[
                    styles.cardExtra,
                    selectedService === 'insurance' && styles.cardSelected,
                ]}
                onPress={() => setSelectedService('insurance')}
            >
                <View style={styles.serviceRow}>
                    <Text style={styles.cardTitle}>Travel Insurance</Text>
                    <View style={styles.radioCircle}>
                        {selectedService === 'insurance' && <View style={styles.radioDot} />}
                    </View>
                </View>
                <Text style={styles.cardSubtitle}>Secure travel with insurance coverage</Text>
                <Text style={styles.cardPrice}>IDR 1.950.000</Text>
            </TouchableOpacity>

            {/* Total + Continue */}
            <View style={styles.totalContainer}>
                <Text style={styles.totalText}>Total Price: IDR {getTotalPrice().toLocaleString()}</Text>
                <TouchableOpacity
                    style={styles.continueButton}
                    onPress={() => handleCheckoutScreen()}
                >
                    <Text style={styles.continueButtonText}>Continue to Payment</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default ExtraServicesScreen;