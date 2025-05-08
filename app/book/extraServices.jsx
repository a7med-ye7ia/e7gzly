import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from "../../styles/styleBooking";


export default function ExtraServicesScreen() {
    const [selectedService, setSelectedService] = useState(null);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Step Indicator */}
            <View style={styles.stepsContainer}>
                <View style={styles.stepsRow}>
                    <Text style={styles.stepNumber}>①</Text>
                    <Ionicons name="airplane" size={18} color="#5D50C6" />
                    <Text style={styles.stepNumber}>②</Text>
                    <Text style={styles.stepNumberActive}>③</Text>
                </View>
                <View style={styles.stepsRow}>
                    <Text style={styles.stepLabel}>Detail Traveler</Text>
                    <Text style={styles.stepLabel}>Select Seat</Text>
                    <Text style={styles.stepLabelActive}>Extra Services</Text>
                </View>
            </View>

            {/* Baggage Option */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}> Baggage Option</Text>
                <Text style={styles.cardSubtitle}>Customizable baggage options available</Text>
                <View style={styles.baggageOptions}>
                    {[
                        { label: '+10 kg', price: 'IDR 250.000' },
                        { label: '+20 kg', price: 'IDR 450.000' },
                        { label: '+30 kg', price: 'IDR 600.000' },
                    ].map((option, index) => (
                        <TouchableOpacity key={index} style={styles.baggageButton}>
                            <Text style={styles.baggageLabel}>{option.label}</Text>
                            <Text style={styles.baggagePrice}>{option.price}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* Lounge Access */}
            <TouchableOpacity
                style={styles.card}
                onPress={() => setSelectedService('lounge')}
            >
                <View style={styles.serviceRow}>
                    <Text style={styles.cardTitle}> Lounge Access</Text>
                    <View style={styles.radioCircle}>
                        {selectedService === 'lounge' && <View style={styles.radioDot} />}
                    </View>
                </View>
                <Text style={styles.cardSubtitle}>Luxury relaxing pre-flight</Text>
                <Text style={styles.cardPrice}>IDR 2.400.000</Text>
            </TouchableOpacity>

            {/* Travel Insurance */}
            <TouchableOpacity
                style={styles.card}
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

            {/* Continue Button */}
            <TouchableOpacity style={styles.continueButton}>
                <Text style={styles.continueButtonText}>Continue to Payment</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

