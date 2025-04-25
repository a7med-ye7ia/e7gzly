import React, { useState , useEffect } from "react";
import {View, Text, TextInput, TouchableOpacity, Image, ScrollView,Alert,} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles/stylesAuth";
import profileImage from "../assets/default-avatar.jpg";
import { auth } from "../services/config";
import { resetPassword } from "../auth/resetPassword";
import { loginUser } from "../auth/login";

export default function EditProfile() {
    const router = useRouter();

    const [firstName, setFirstName] = useState("e7gzly");
    const [lastName, setLastName] = useState("Team");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState( "");
    const [confirmPassword, setConfirmPassword] = useState( "");
    const [phone, setPhone] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState("");

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            setEmail(user.email);
        }
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

    const handleEditProfile = async () => {
        if (!validatePassword()) return;

        const { success, error } = await resetPassword(password);

        if (success) {
            Alert.alert("Success", "Password updated successfully.");
            router.back();
        } else {
            Alert.alert("Error", error.message || "Something went wrong.");
        }
    };


    return (
        <ScrollView style={styles.containerSigUp}>
            <View style={styles.profileHeaderRow}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.profileTitle}>Edit Profile</Text>
            </View>

            <View style={styles.profileTopSection}>
                <Image source={profileImage} style={styles.profilePicLarge} />
                <TouchableOpacity style={styles.editIcon}>
                    <Ionicons name="pencil" size={18} color="#fff" />
                </TouchableOpacity>

            </View>
            <View style={{ padding: 20,alignItems: "center"}}>
                <Text style={{ fontSize: 16 , marginVertical : -40}}>{email}</Text>
            </View>

            {[
                { label: "First Name", value: firstName, setter: setFirstName },
                { label: "Last Name", value: lastName, setter: setLastName },
                { label: "Phone", value: phone, setter: setPhone, keyboardType: "phone-pad" },
            ].map((field, index) => (

                <View style={styles.inputContainer} key={index}>
                    <Text style={styles.label}>
                        {field.label}
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder={`Enter your ${field.label.toLowerCase()}`}
                        value={field.value}
                        onChangeText={field.setter}
                        keyboardType={field.keyboardType || "default"}
                    />
                </View>

            ))}

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Enter a password'
                    value={password}
                    onChangeText={(text) => {
                        setPassword(text);
                        if (confirmPassword) validatePassword();
                    }}
                    secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                    style={styles.toggleButton}
                    onPress={() => setShowPassword(!showPassword)}
                >
                    <Text style={styles.toggleText}>{showPassword ? 'Hide' : 'Show'}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Confirm Password</Text>
                <TextInput
                    style={[styles.input, passwordError ? styles.errorInput : null]}
                    value={confirmPassword}
                    placeholder='Confirm your password'
                    onChangeText={(text) => {
                        setConfirmPassword(text);
                        validatePassword();
                    }}
                    secureTextEntry={!showPassword}
                    onBlur={validatePassword}
                />
                {passwordError ? (
                    <Text style={styles.errorText}>{passwordError}</Text>
                ) : null}
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={handleEditProfile}>
                <Text style={{color: "white" , fontSize : 14}}>Save</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

