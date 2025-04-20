import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from "react-native";
import { useRouter } from "expo-router";
import styles from "../styles/stylePages";
import AsyncStorage from "@react-native-async-storage/async-storage";
import profileImage from '../assets/img.png';

export default function Profile() {
    const router = useRouter();

    const handleSignOut = async () => {
        try {
            await AsyncStorage.removeItem("isLoggedIn");
            await AsyncStorage.removeItem("userName");
            await AsyncStorage.removeItem("userEmail");

            Alert.alert("Success", "You have been signed out successfully");
            router.replace("/");
        } catch (error) {
            Alert.alert("Error", "Failed to sign out");
        }
    };

    const userName = "Seif";
    const userBalance = 0.0;

    return (
        <ScrollView style={styles.container}>
            <View style={styles.profileHeader}>
                <Image
                    source={profileImage}
                    style={styles.profileImage}
                />
                <Text style={styles.greetingText}>Hello, {userName} </Text>
                <Text style={styles.balanceText}>Balance: {userBalance} EGP</Text>
            </View>

            <TouchableOpacity
                style={styles.buttonProfile}
                onPress={() => router.push("/bookedTravels")}
            >
                <Text style={styles.buttonText}>Booked Trips</Text>
            </TouchableOpacity>


            <TouchableOpacity
                style={styles.buttonProfile}
                onPress={() => router.push("/TravelsLog")}
            >
                <Text style={styles.buttonText}>Trips Log</Text>
            </TouchableOpacity>


            <TouchableOpacity
                style={styles.logoutButton}
                onPress={handleSignOut}
            >
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}
