import React, { useState, useCallback, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Dimensions, Alert } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useRouter, useLocalSearchParams } from "expo-router";
import Icon from "react-native-vector-icons/Ionicons";

const { width, height } = Dimensions.get('window');
const primaryColor = '#5D3FD3';

const DetailTraveler = () => {
    const router = useRouter();
    const params = useLocalSearchParams();
    const scrollViewRef = useRef(null);

    const { seats, from, to, tripType, date } = params;

    const numSeats = parseInt(seats, 10) || 1; 
    const [passengerForms, setPassengerForms] = useState([]);
    const [errors, setErrors] = useState([]);
    const [currentPassengerIndex, setCurrentPassengerIndex] = useState(0);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [passPortDate, setPassPortDate] = useState(new Date());
    const [focusedField, setFocusedField] = useState(null);

    useEffect(() => {
        const initialForms = Array(numSeats).fill().map((_, index) => ({
            id: index + 1,
            fullName: '',
            citizenship: '',
            passportNumber: '',
            expirationDate: ''
        }));
        setPassengerForms(initialForms);
        setErrors(Array(numSeats).fill({
            fullName: '',
            citizenship: '',
            passportNumber: '',
            expirationDate: ''
        }));
    }, [numSeats]);

    const showDatePicker = useCallback(() => {
        setDatePickerVisibility(true);
    }, []);
    const hideDatePicker = useCallback(() => {
        setDatePickerVisibility(false);
    }, []);

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

    const updatePassengerField = (field, value, index = currentPassengerIndex) => {
        const updatedForms = [...passengerForms];
        updatedForms[index] = {
            ...updatedForms[index],
            [field]: value
        };
        setPassengerForms(updatedForms);
        validateField(field, value, index);
    };

    const validateField = (field, value, index) => {
        const nameRegex = /^[A-Za-z\s]+$/;
        const passportNumRegex = /^[0-9]+$/;
        
        let errorMessage = '';
        
        if (!value) {
            errorMessage = `${field} is required.`;
        } else if (field === 'fullName' && !nameRegex.test(value)) {
            errorMessage = 'Full name must be alphabetic.';
        } else if (field === 'passportNumber' && !passportNumRegex.test(value)) {
            errorMessage = 'Passport number must be numeric.';
        }
        
        const updatedErrors = [...errors];
        updatedErrors[index] = {
            ...updatedErrors[index],
            [field]: errorMessage
        };
        setErrors(updatedErrors);
    };

    const validatePassengerData = () => {
        const tempErrors = passengerForms.map(() => ({
            fullName: '',
            citizenship: '',
            passportNumber: '',
            expirationDate: ''
        }));

        let valid = true;

        // Validate each passenger's fields
        for (let i = 0; i < passengerForms.length; i++) {
            const passenger = passengerForms[i];
            const nameRegex = /^[A-Za-z\s]+$/;
            const passportNumRegex = /^[0-9]+$/;

            for (const field of Object.keys(passenger)) {
                const value = passenger[field];
                let errorMessage = '';

                if (!value) {
                    errorMessage = `${field} is required.`;
                } else if (field === 'fullName' && !nameRegex.test(value)) {
                    errorMessage = 'Full name must be alphabetic.';
                } else if (field === 'passportNumber' && !passportNumRegex.test(value)) {
                    errorMessage = 'Passport number must be numeric.';
                }

                tempErrors[i][field] = errorMessage;

                if (errorMessage) {
                    valid = false;
                }
            }
        }

        // Check for duplicate passport numbers
        const passportNumbers = passengerForms.map(p => p.passportNumber);
        const duplicates = passportNumbers.filter((item, idx) => passportNumbers.indexOf(item) !== idx && item !== '');

        duplicates.forEach(duplicateValue => {
            passengerForms.forEach((p, idx) => {
                if (p.passportNumber === duplicateValue) {
                    tempErrors[idx].passportNumber = 'Passport number must be unique.';
                    valid = false;
                }
            });
        });

        setErrors(tempErrors);

        if (!valid) {
            // find index of first passenger with any error
            const firstErrorIndex = tempErrors.findIndex(errObj => 
                Object.values(errObj).some(msg => msg !== '')
            );

            if (firstErrorIndex !== -1) {
                Alert.alert(
                    `Passenger ${firstErrorIndex + 1} data issue`,
                    `Passenger ${firstErrorIndex + 1}'s data is incomplete or incorrect. Please review.`,
                    [{ text: 'OK', onPress: () => scrollToPassenger(firstErrorIndex) }]
                );
            }
        }

        return valid;
    };

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

    const handleScroll = (event) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const page = Math.round(offsetX / width);
        setCurrentPassengerIndex(page);
    };

    const scrollToPassenger = (index) => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ x: index * width, animated: true });
        }
        setCurrentPassengerIndex(index);
    };

    const handleFocus = (field) => {
        setFocusedField(field);
    };

    const handleBlur = () => {
        setFocusedField(null);
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

                <View style={styles.dottedLine} />

                <View style={styles.planeIconContainer}>
                    <Icon name="airplane" size={20} color="#5C40CC" />
                </View>

                <View style={styles.dottedLine} />
                <View style={styles.stepContainer}>
                    <View style={styles.stepCircle}>
                        <Text style={styles.stepNumber}>2</Text>
                    </View>
                    <Text style={styles.stepText}>Select Seat</Text>
                </View>

                <View style={styles.dottedLine} />
                <View style={styles.stepContainer}>
                    <View style={styles.stepCircle}>
                        <Text style={styles.stepNumber}>3</Text>
                    </View>
                    <Text style={styles.stepText}>Extra Services</Text>
                </View>
            </View>

            <View style={styles.contentContainer}>
                <ScrollView
                    ref={scrollViewRef}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd={handleScroll}
                    style={styles.scrollContainer}
                    keyboardShouldPersistTaps='handled'
                >
                    {passengerForms.map((passenger, index) => (
                        <ScrollView
                            key={index}
                            style={styles.formPage}
                            contentContainerStyle={{ paddingBottom: 40 }}
                            showsVerticalScrollIndicator={true}
                            keyboardShouldPersistTaps="handled"
                        >
                            <Text style={styles.passengerTitle}>
                                Passenger {index + 1}
                            </Text>

                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Full Name</Text>
                                <TextInput
                                    style={[
                                        styles.input,
                                        focusedField === `fullName-${index}` && styles.focusedInput
                                    ]}
                                    value={passenger.fullName || ''}
                                    onChangeText={(text) => updatePassengerField('fullName', text, index)}
                                    onFocus={() => handleFocus(`fullName-${index}`)}
                                    onBlur={handleBlur}
                                    placeholder="Enter full name"
                                />
                                {errors[index]?.fullName ? (
                                    <Text style={styles.errorText}>{errors[index].fullName}</Text>
                                ) : null}
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Citizenship</Text>
                                <TextInput
                                    style={[
                                        styles.input,
                                        focusedField === `citizenship-${index}` && styles.focusedInput
                                    ]}
                                    value={passenger.citizenship || ''}
                                    onChangeText={(text) => updatePassengerField('citizenship', text, index)}
                                    onFocus={() => handleFocus(`citizenship-${index}`)}
                                    onBlur={handleBlur}
                                    placeholder="Enter Your Citizenship"
                                />
                                {errors[index]?.citizenship ? (
                                    <Text style={styles.errorText}>{errors[index].citizenship}</Text>
                                ) : null}
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Passport Number</Text>
                                <TextInput
                                    style={[
                                        styles.input,
                                        focusedField === `passportNumber-${index}` && styles.focusedInput
                                    ]}
                                    value={passenger.passportNumber || ''}
                                    onChangeText={(text) => updatePassengerField('passportNumber', text, index)}
                                    onFocus={() => handleFocus(`passportNumber-${index}`)}
                                    onBlur={handleBlur}
                                    placeholder="Enter passport number"
                                    keyboardType="default"
                                />
                                {errors[index]?.passportNumber ? (
                                    <Text style={styles.errorText}>{errors[index].passportNumber}</Text>
                                ) : null}
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Expiration Date</Text>
                                <TouchableOpacity 
                                    style={[
                                        styles.dateInput,
                                        focusedField === `expirationDate-${index}` && styles.focusedInput
                                    ]}
                                    onPress={() => {
                                        setCurrentPassengerIndex(index);
                                        showDatePicker();
                                    }}
                                    onFocus={() => handleFocus(`expirationDate-${index}`)}
                                >
                                    <Text style={styles.dateInputText}>
                                        {passenger.expirationDate || 'MM/YYYY'}
                                    </Text>
                                    <Image 
                                        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/747/747310.png' }}
                                        style={styles.calendarIcon}
                                    />
                                </TouchableOpacity>
                                {errors[index]?.expirationDate ? (
                                    <Text style={styles.errorText}>{errors[index].expirationDate}</Text>
                                ) : null}
                            </View>
                        </ScrollView>
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
        backgroundColor: primaryColor,
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
        color: primaryColor,
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
        flexGrow: 1,
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
    focusedInput: {
        borderColor: primaryColor,
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
        tintColor: primaryColor,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
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
        backgroundColor: primaryColor,
        width: 10,
        height: 10,
        borderRadius: 5,
    },
    continueButton: {
        backgroundColor: primaryColor,
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