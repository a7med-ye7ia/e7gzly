import React, { useState, useCallback, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Dimensions, Alert } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useRouter, useLocalSearchParams } from "expo-router";
import Icon from "react-native-vector-icons/Ionicons";

const { width } = Dimensions.get('window');

const DetailTraveler = () => {
    const router = useRouter();
    const params = useLocalSearchParams();
    const scrollViewRef = useRef(null);

    const { seats, from, to, tripType, date } = params;
    
    const numSeats = parseInt(seats, 10) || 1; 
    const [passengerForms, setPassengerForms] = useState([]);
    const [currentPassengerIndex, setCurrentPassengerIndex] = useState(0);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [passPortDate, setPassPortDate] = useState(new Date());
    
    useEffect(() => {
        const initialForms = Array(numSeats).fill().map((_, index) => ({
            id: index + 1,
            fullName: '',
            citizenship: '',
            passportNumber: '',
            expirationDate: ''
        }));
        setPassengerForms(initialForms);
    }, [numSeats]);
    
    const showDatePicker = useCallback(() => {
        setDatePickerVisibility(true);
    }, []);
    const hideDatePicker = useCallback(() => {
        setDatePickerVisibility(false);
    }, []);
    
    // Handle date confirmation
    const handleConfirm = (selectedDate) => {
        if (selectedDate) {
            setPassPortDate(selectedDate);
            const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
            const year = selectedDate.getFullYear();
            const formattedDate = `${month}/${year}`;
            
            updatePassengerField('expirationDate', formattedDate);
        }
        hideDatePicker();
    };
    
    // Update a field for a specific passenger
    const updatePassengerField = (field, value, index = currentPassengerIndex) => {
        const updatedForms = [...passengerForms];
        updatedForms[index] = {
            ...updatedForms[index],
            [field]: value
        };
        setPassengerForms(updatedForms);
    };
    
    // Validate passenger data
    const validatePassengerData = () => {
        for (let i = 0; i < passengerForms.length; i++) {
            const passenger = passengerForms[i];
            if (!passenger.fullName || 
                !passenger.citizenship || 
                !passenger.passportNumber || 
                !passenger.expirationDate) {
    
                    Alert.alert(
                    "Incomplete Information",
                    `Please complete fields for Passenger ${i + 1}.`,
                    [
                        { 
                            text: "Go to passenger", 
                            onPress: () => scrollToPassenger(i)
                        },
                        { text: "OK" }
                    ]
                );
                return false;
            }
        }
        return true;
    };
    
    // Handle continue button
    const handleContinue = () => {
        if (!validatePassengerData()) {
            return;
        }
        router.push({
            pathname: "./planeSeats",
            params: {
                seats: numSeats,
            }
        });
    };
    
    // Handle scroll to update active index
    const handleScroll = (event) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const page = Math.round(offsetX / width);
        setCurrentPassengerIndex(page);
    };
    
    // Scroll to specific passenger form
    const scrollToPassenger = (index) => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ x: index * width, animated: true });
        }
        setCurrentPassengerIndex(index);
    };

    return (
        <View style={styles.container}>
            <View style={styles.progressContainer}>
                {/* Step 1 */}
                <View style={styles.stepContainer}>
                    <View style={[styles.stepCircle, styles.activeStep]}>
                        <Text style={styles.stepNumber}>1</Text>
                    </View>
                    <Text style={styles.activeStepText}>Detail Traveler</Text>
                </View>

                {/* Dashed line 1 */}
                <View style={styles.dottedLine} />

                {/* Airplane Icon */}
                <View style={styles.planeIconContainer}>
                    <Icon name="airplane" size={20} color="#5C40CC" />
                </View>

                {/* step 2 */}
                <View style={styles.dottedLine} />
                <View style={styles.stepContainer}>
                    <View style={styles.stepCircle}>
                        <Text style={styles.stepNumber}>2</Text>
                    </View>
                    <Text style={styles.stepText}>Select Seat</Text>
                </View>

                {/* step 3 */}
                <View style={styles.dottedLine} />
                <View style={styles.stepContainer}>
                    <View style={styles.stepCircle}>
                        <Text style={styles.stepNumber}>3</Text>
                    </View>
                    <Text style={styles.stepText}>Extra Services</Text>
                </View>
            </View>

            <View style={styles.contentContainer}>
                {/* Horizontal ScrollView for passenger forms */}
                <ScrollView
                    ref={scrollViewRef}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd={handleScroll}
                    style={styles.scrollContainer}
                >
                    {passengerForms.map((passenger, index) => (
                        <View key={index} style={styles.formPage}>
                            <Text style={styles.passengerTitle}>
                                Passenger {index + 1}
                            </Text>
                            
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Full Name</Text>
                                <TextInput
                                    style={styles.input}
                                    value={passenger.fullName || ''}
                                    onChangeText={(text) => updatePassengerField('fullName', text, index)}
                                    placeholder="Enter full name"
                                />
                            </View>
                            
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Citizenship</Text>
                                <TextInput
                                    style={styles.input}
                                    value={passenger.citizenship || ''}
                                    onChangeText={(text) => updatePassengerField('citizenship', text, index)}
                                    placeholder="Enter Your Citizenship"
                                />
                            </View>
                            
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Passport Number</Text>
                                <TextInput
                                    style={styles.input}
                                    value={passenger.passportNumber || ''}
                                    onChangeText={(text) => updatePassengerField('passportNumber', text, index)}
                                    placeholder="Enter passport number"
                                    keyboardType="default"
                                />
                            </View>
                            
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Expiration Date</Text>
                                <TouchableOpacity 
                                    style={styles.dateInput}
                                    onPress={() => {
                                        setCurrentPassengerIndex(index);
                                        showDatePicker();
                                    }}
                                >
                                    <Text style={styles.dateInputText}>
                                        {passenger.expirationDate || 'MM/YYYY'}
                                    </Text>
                                    <Image 
                                        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/747/747310.png' }}
                                        style={styles.calendarIcon}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </ScrollView>
                {numSeats >= 1 && (
                    <View style={styles.paginationContainer}>
                        {passengerForms.map((_, index) => (
                            <TouchableOpacity 
                                key={index}
                                onPress={() => scrollToPassenger(index)}
                            >
                                <View 
                                    style={[
                                        styles.paginationDot,
                                        index === currentPassengerIndex && styles.activePaginationDot
                                    ]} 
                                />
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </View>
            
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                date={passPortDate}
                minimumDate={new Date()}
            />
            
            <TouchableOpacity 
                style={styles.continueButton} 
                onPress={handleContinue}
            >
                <Text style={styles.continueButtonText}>
                    Continue to Seat
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 30,
    },
    progressContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        paddingVertical: 20,
        paddingHorizontal: 20,
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
        textAlign: 'center',
    },
    activeStepText: {
        color: '#5D3FD3',
        fontWeight: 'bold',
        fontSize: 12,
        textAlign: 'center',
    },
    dottedLine: {
        flex: 1,
        borderStyle: "dashed",
        borderWidth: 0.4,
        borderColor: "#B0B0B0",
        marginBottom: 15,
    },
    planeIconContainer: {
        marginBottom: 15,
    },
    contentContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    scrollContainer: {
        flex: 1,
    },
    formPage: {
        width: width,
        paddingHorizontal: 20,
    },
    passengerTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 25,
        color: '#333',
    },
    inputGroup: {
        marginBottom: 15, 
    },
    label: {
        marginBottom: 8,
        fontSize: 14,
        color: '#555',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 25,
        paddingVertical: 12,
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: '#F8F8F8',
    },
    dateInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 25,
        paddingVertical: 12,
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F8F8F8',
    },
    dateInputText: {
        fontSize: 16,
        color: '#333',
    },
    calendarIcon: {
        width: 20,
        height: 20,
        tintColor: '#5D3FD3',
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5, 
        marginBottom: 5,
        paddingHorizontal: 20,
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#E0E0E0',
        marginHorizontal: 5,
    },
    activePaginationDot: {
        backgroundColor: '#5D3FD3',
        width: 10,
        height: 10,
        borderRadius: 5,
    },
    continueButton: {
        backgroundColor: '#5D3FD3',
        borderRadius: 25,
        paddingVertical: 15,
        paddingHorizontal: 18,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
        marginHorizontal: 20,
    },
    continueButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    }
});

export default DetailTraveler;