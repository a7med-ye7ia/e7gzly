import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import styles from "../../styles/styleBooking";
import { Ionicons } from "@expo/vector-icons";
import { useRouter , useLocalSearchParams } from "expo-router";

const rows = [1, 2, 3, 4, 5 , 6 , 7 ];
const columns = ['A', 'B', 'C', 'D'];
const unavailableSeats = ['D1', 'D2', 'B4', 'C5' , 'A1']; // example unavailable seats
const seatPrice = 6000000;

export default function SelectSeat() {
    const params = useLocalSearchParams();

    const router = useRouter();
    const seatsLimit = params.seats ;
    const [selectedSeats, setSelectedSeats] = useState([]);

    const toggleSeat = (seatId) => {
        const isSelected = selectedSeats.includes(seatId);

        if (isSelected) {
            setSelectedSeats(selectedSeats.filter(id => id !== seatId));
        } else {
            if (selectedSeats.length < seatsLimit) {
                setSelectedSeats([...selectedSeats, seatId]);
            } else {
                alert(`You can only select ${seatsLimit} seats.`);
            }
        }
    };


    const handleBookingConfirmation = () => {
        router.push({
            pathname: "/book/extraServices",
            params: {
                id: params.id,
                cityFromCode: params.cityFromCode,
                cityFromName: params.cityFromName,
                cityToCode: params.cityToCode,
                cityToName: params.cityToName,
                selectedSeats,
                totalPrice: seatPrice * selectedSeats.length,
                seats: params.seats,

            },
        });
    }

    const isSelected = (seatId) => selectedSeats.includes(seatId);
    const isUnavailable = (seatId) => unavailableSeats.includes(seatId);

    return (
        <ScrollView

            style={styles.container}
            contentContainerStyle={{ paddingBottom: 80 }}
        >
            <View style={styles.stepsContainer}>
                <View style={styles.stepsRow}>
                    <Text style={styles.stepNumber}>①</Text>
                    <Ionicons name="airplane" size={18} color="#5D50C6" />
                    <Text style={styles.stepNumberActive}>②</Text>
                    <Text style={styles.stepNumber}>③</Text>
                </View>
                <View style={styles.stepsRow}>
                    <Text style={styles.stepLabel}>Detail Traveler</Text>
                    <Text style={styles.stepLabelActive}>Select Seat</Text>
                    <Text style={styles.stepLabel}>Extra Services</Text>
                </View>
            </View>

            <View style={styles.legend}>
                <LegendItem label="Available" color="#E0D9FF" />
                <LegendItem label="Selected" color="#5D50C6" />
                <LegendItem label="Unavailable" color="#ccc" />
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                {columns.map(col => (
                    <Text key={col} style={{ width: 20, textAlign: 'center' , marginHorizontal: 28 }}>{col}</Text>
                ))}

            </View>

            <View>
                {rows.map((row) => (
                    <View
                        key={row}
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginVertical: 5,
                        }}
                    >
                        {columns.slice(0, 2).map((col) => {
                            const seatId = `${col}${row}`;
                            const selected = isSelected(seatId);
                            const unavailable = isUnavailable(seatId);

                            return (
                                <TouchableOpacity
                                    key={seatId}
                                    onPress={() => toggleSeat(seatId)}
                                    style={[
                                        styles.seat,
                                        selected && styles.seatSelected,
                                        unavailable && styles.seatUnavailable,
                                    ]}
                                >
                                    <Text style={{ color: selected ? '#fff' : '#000' }}>
                                        {selected ? 'YOU' : ''}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}

                        <Text style={{ width: 40, textAlign: 'center' }}>
                            {row}
                        </Text>

                        {columns.slice(2).map((col) => {
                            const seatId = `${col}${row}`;
                            const selected = isSelected(seatId);
                            const unavailable = isUnavailable(seatId);

                            return (
                                <TouchableOpacity
                                    key={seatId}
                                    onPress={() => toggleSeat(seatId)}
                                    style={[
                                        styles.seat,
                                        selected && styles.seatSelected,
                                        unavailable && styles.seatUnavailable,
                                    ]}
                                >
                                    <Text style={{ color: selected ? '#fff' : '#000' }}>
                                        {selected ? 'YOU' : ''}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                ))}
            </View>


            <Text style={{ marginTop: 20, fontSize: 16 }}>
                Your seat: {selectedSeats.join(', ') || ' '}
            </Text>
            <Text style={{ fontSize: 16, marginBottom: 20 }}>
                Total: IDR{(seatPrice * selectedSeats.length).toLocaleString()}
            </Text>

            {/* Continue Button */}
            <TouchableOpacity style={styles.continueButton} onPress={handleBookingConfirmation}>
                <Text style={styles.continueButtonText}>Continue to Extras</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const LegendItem = ({ label, color }) => (
    <View style={styles.legendItem}>
        <View style={[styles.legendColor, { backgroundColor: color }]} />
        <Text>{label}</Text>
    </View>
);

