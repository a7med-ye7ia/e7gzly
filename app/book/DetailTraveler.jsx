import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useRouter } from "expo-router";

const DetailTraveler = () => {
    const router = useRouter();

    const [fullName, setFullName] = useState('');
    const [citizenship, setCitizenship] = useState('');
    const [passportNumber, setPassportNumber] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [date, setDate] = useState(new Date());

    const showDatePicker = useCallback(() => {
        setDatePickerVisibility(true);
    }, []);

    const hideDatePicker = useCallback(() => {
        setDatePickerVisibility(false);
    }, []);

    const handleConfirm = (selectedDate) => {
        if (selectedDate) {
            setDate(selectedDate);
            const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
            const year = selectedDate.getFullYear();
            setExpirationDate(`${month}/${year}`);
        }
        hideDatePicker();
    };

    return (
        <View style={styles.container}>
            <View style={styles.progressContainer}>
                <View style={styles.stepContainer}>
                    <View style={[styles.stepCircle, styles.activeStep]}>
                        <Text style={styles.stepNumber}>1</Text>
                    </View>
                    <Text style={styles.activeStepText}>Detail Traveler</Text>
                </View>
                <View style={styles.stepDivider} />
                <View style={styles.stepContainer}>
                    <View style={styles.stepCircle}>
                        <Text style={styles.stepNumber}>2</Text>
                    </View>
                    <Text style={styles.stepText}>Select Seat</Text>
                </View>
                <View style={styles.stepDivider} />
                <View style={styles.stepContainer}>
                    <View style={styles.stepCircle}>
                        <Text style={styles.stepNumber}>3</Text>
                    </View>
                    <Text style={styles.stepText}>Extra Services</Text>
                </View>
            </View>

            <View style={styles.formContainer}>
                <Text style={styles.passengerTitle}>Passenger 2</Text>
                
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Full Name</Text>
                    <TextInput
                        style={[styles.input, { marginBottom: 10 }]}
                        value={fullName}
                        onChangeText={setFullName}
                        placeholder="Enter full name"
                    />
                </View>
                
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Citizenship</Text>
                    <TextInput
                        style={[styles.input, { marginBottom: 10 }]}
                        value={citizenship}
                        onChangeText={setCitizenship}
                        placeholder="Enter Your Citizenship"
                    />
                </View>
                
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Passport Number</Text>
                    <TextInput
                        style={[styles.input, { marginBottom: 10 }]}
                        value={passportNumber}
                        onChangeText={setPassportNumber}
                        placeholder="Enter passport number"
                    />
                </View>
                
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Expiration Date</Text>
                    <TouchableOpacity 
                        style={styles.dateInput}
                        onPress={showDatePicker}
                    >
                        <Text>{expirationDate || 'MM/YYYY'}</Text>
                        <Image 
                            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/747/747310.png' }}
                            style={styles.calendarIcon}
                        />
                    </TouchableOpacity>
                </View>
                
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                    date={date} 
                    minimumDate={new Date()}
                    
                />
                
                <View style={styles.paginationContainer}>
                    <View style={styles.paginationDot} />
                    <View style={[styles.paginationDot, styles.activeDot]} />
                </View>
                
                <TouchableOpacity style={styles.continueButton} onPress={() => router.push("/book/planeSeats")}>
                    <Text style={styles.continueButtonText}>Continue to Seat</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
    },
    progressContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
        paddingHorizontal: 10,
    },
    stepContainer: {
        alignItems: 'center',
    },
    stepCircle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#E0E0E0',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
    },
    activeStep: {
        backgroundColor: '#5D3FD3',
    },
    stepNumber: {
        color: 'white',
        fontWeight: 'bold',
    },
    stepText: {
        color: '#888',
        fontSize: 12,
    },
    activeStepText: {
        color: '#5D3FD3',
        fontWeight: 'bold',
        fontSize: 12,
    },
    stepDivider: {
        height: 1,
        backgroundColor: '# ',
        width: '15%',
        alignSelf: 'center',
    },
    formContainer: {
        flex: 1,
    },
    passengerTitle: {
        fontWeight: 'bold',
        marginBottom: 20,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        marginBottom: 8,
        fontSize: 14,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 25,
        padding: 15,
        fontSize: 16,
    },
    dateInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 25,
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    calendarIcon: {
        width: 20,
        height: 20,
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 30,
    },
    paginationDot: {
        width: 10,
        height: 10,
        borderRadius: 4,
        backgroundColor: '#E0E0E0',
        marginHorizontal: 5,
    },
    activeDot: {
        backgroundColor: '#5D3FD3',
    },
    continueButton: {
        backgroundColor: '#5D3FD3',
        borderRadius: 30,
        padding: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },
    continueButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    }
});

export default DetailTraveler;