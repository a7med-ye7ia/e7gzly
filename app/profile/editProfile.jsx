import React, { useState , useEffect } from "react";
import {View, Text, TextInput, TouchableOpacity, Image, ScrollView,Alert,} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../styles/stylesAuth";
import { auth } from "../../config/firebaseConfig";
import { resetPassword } from "../../auth/resetPassword";
import useProfileImagePicker from "../../hooks/imagePicker"
import defaultImage from "../../assets/default-avatar.jpg";
import {getUserById} from "../../services/userService";
import {updateUser} from "../../services/userService";

export default function EditProfile() {
    const router = useRouter();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState( "");
    const [confirmPassword, setConfirmPassword] = useState( "");
    const [phone, setPhone] = useState("");
    const [profilePicture, setProfilePicture] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const { profileImageUri, showImagePickerOptions } = useProfileImagePicker();
    const [focusedField, setFocusedField] = useState(null);

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            setEmail(user.email);
        }
        const getData = async () => {
            try {
                const data = await getUserById(auth.currentUser.email);
                setProfilePicture(data.profilePictureURL);
                setFirstName(data.firstName);
                setLastName(data.lastName);
                setPhone(data.phone);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        getData();
    }, []);

    const validatePassword = () => {
        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match");
            return false;
        }
        if (password.length < 8) {
            setPasswordError("Password must be at least 8 characters");
            return false;
        }
        setPasswordError("");
        return true;
    };

    const handleSaveProfile = async () => {
        const user = auth.currentUser;
        if (!user) return Alert.alert("Error", "User not authenticated");

        try {
            const updates = {
                firstName,
                lastName,
                phone,
                profilePictureURL: profileImageUri || profilePicture
            };

            const { success, error } = await updateUser(user.email, updates);

            if (success) {
                Alert.alert("Success", "Profile updated successfully.");
            } else {
                console.error("Firestore update error:", error);
                Alert.alert("Error", "Failed to update profile.");
            }
        } catch (err) {
            console.error(err);
            Alert.alert("Error", "Something went wrong.");
        }
    };


    const handleResetPassword = async () => {
        if (!validatePassword()) return;

        const { success, error } = await resetPassword(password);

        if (success) {
            Alert.alert("Success", "Password updated successfully.");
        } else {
            Alert.alert("Error", error.message || "Something went wrong.");
        }
    };


    return (
        <ScrollView style={styles.containerSigUp}>
            <View style={styles.profileHeaderRow}>
                <TouchableOpacity onPress={() => router.back()} style={styles.back}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.profileTitle}>Edit Profile</Text>
            </View>

            <View style={styles.profileTopSection}>
                <Image
                    source={profilePicture ? { uri: profilePicture } : defaultImage}
                    style={styles.profilePicLarge}
                />
                <TouchableOpacity style={styles.editIcon} onPress={showImagePickerOptions}>
                    <Ionicons name="pencil" size={18} color="#fff" />
                </TouchableOpacity>
            </View>

            <View style={{ padding: 20, alignItems: "center" }}>
                <Text style={{ fontSize: 16, marginVertical: -40 }}>{email}</Text>
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>First Name</Text>
                <TextInput
                    style={[styles.input, focusedField === 'firstName' && styles.inputFocused]}
                    placeholder="Enter your first name"
                    value={firstName}
                    onChangeText={setFirstName}
                    onFocus={() => setFocusedField('firstName')}
                    onBlur={() => setFocusedField(null)}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Last Name</Text>
                <TextInput
                    style={[styles.input, focusedField === 'lastName' && styles.inputFocused]}
                    placeholder="Enter your last name"
                    value={lastName}
                    onChangeText={setLastName}
                    onFocus={() => setFocusedField('lastName')}
                    onBlur={() => setFocusedField(null)}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Phone</Text>
                <TextInput
                    style={[styles.input, focusedField === 'phone' && styles.inputFocused]}
                    placeholder="Enter your phone number"
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                    onFocus={() => setFocusedField('phone')}
                    onBlur={() => setFocusedField(null)}
                />
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
                <Text style={{ color: "white", fontSize: 14 }}>Save Changes</Text>
            </TouchableOpacity>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={[styles.input, focusedField === 'password' && styles.inputFocused]}
                    placeholder="Enter a password"
                    value={password}
                    onChangeText={(text) => {
                        setPassword(text);
                        if (confirmPassword) validatePassword();
                    }}
                    secureTextEntry={!showPassword}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                />
                <TouchableOpacity
                    style={styles.toggleButton}
                    onPress={() => setShowPassword(!showPassword)}
                >
                    <Text style={styles.toggleText}>{showPassword ? "Hide" : "Show"}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Confirm Password</Text>
                <TextInput
                    style={[
                        styles.input,
                        focusedField === 'confirmPassword' && styles.inputFocused,
                        passwordError ? styles.errorInput : null
                    ]}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChangeText={(text) => {
                        setConfirmPassword(text);
                        validatePassword();
                    }}
                    secureTextEntry={!showPassword}
                    onFocus={() => setFocusedField('confirmPassword')}
                    onBlur={() => {
                        setFocusedField(null);
                        validatePassword();
                    }}
                />
                {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={handleResetPassword}>
                <Text style={{ color: "white", fontSize: 14 }}>Change Password</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

