import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styles/stylePages";
import profileImage from '../assets/default-avatar.jpg';
import { auth } from "../config/firebaseConfig";


export default function Profile() {
    const router = useRouter();
    const user = auth.currentUser;
    const handleSignOut = async () => {
        try {
            await AsyncStorage.multiRemove(["isLoggedIn", "userName", "userEmail"]);
            Alert.alert("Success", "You have been signed out successfully");
            router.replace("/");
        } catch (error) {
            Alert.alert("Error", "Failed to sign out");
        }
    };

    return (
        <ScrollView style={styles.containerSigUp}>
            <View style={styles.profileHeaderRow}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.profileTitle}>My Profile</Text>

            </View>

            <View style={styles.profileTopSection}>
                <Image source={profileImage} style={styles.profilePicLarge} />
                <Text style={styles.profileName}>E7gzly Team</Text>
                <Text style={styles.profileEmail}>{user?.email}</Text>
                <TouchableOpacity style={styles.editButton} onPress={() => router.push("/editProfile")}>
                    <Text style={styles.editButtonText}>Edit Profile</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.profileOptions}>


                <Option icon="location-outline" label="Location" />
                <Option icon="card-outline" label="Subscription" />
                <Option icon="airplane-outline" label="Booked Trips" onPress={() => router.push("/bookedTravels")} />
                <Option icon="time-outline" label="Trips History" onPress={() => router.push("/TravelsLog")} />
                <Option icon="log-out-outline" label="Log Out" onPress={handleSignOut} />
            </View>
        </ScrollView>
    );
}

// Reusable Option component
const Option = ({ icon, label, onPress }) => (
    <TouchableOpacity style={styles.optionRow} onPress={onPress}>
        <Ionicons name={icon} size={22} color="black" />
        <Text style={styles.optionLabel}>{label}</Text>
        <Ionicons name="chevron-forward" size={20} color="#aaa" style={{ marginLeft: 'auto' }} />
    </TouchableOpacity>
);
