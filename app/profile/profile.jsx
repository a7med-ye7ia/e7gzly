import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../../styles/stylePages";
import profileImage from '../../assets/default-avatar.jpg';
import { auth } from "../../config/firebaseConfig";
import { getUserById } from "../../services/userService";
import { useEffect, useState } from "react";

const Profile = () => {
    const router = useRouter();
    const [profilePicture, setProfilePicture] = useState("https://via.placeholder.com/150");
    const [userFirstName, setUserFirstName] = useState("Loading...");
    const [userLastName, setUserLastName] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [userEmail, setUserEmail] = useState(null);

    const getData = async () => {
        console.log("Fetching user data");

        try {
            let email = userEmail;

            if (!email) {
                const storedUserName = await AsyncStorage.getItem("userName");
                const storedUserEmail = await AsyncStorage.getItem("userEmail");

                if (storedUserName) setUserFirstName(storedUserName);
                if (storedUserEmail) email = storedUserEmail;
            }

            if (!email) {
                console.warn("No email found to fetch user data");
                return;
            }

            const data = await getUserById(email);

            if (data) {
                setProfilePicture(data.profilePictureURL || "https://via.placeholder.com/150");
                setUserFirstName(data.firstName || "");
                setUserLastName(data.lastName || "");
                setIsAdmin(data.isAdmin || false);
            } else {
                console.warn("User data not found");
            }

            console.log("Fetched data for:", email);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                console.log("User is signed in:", user.email);
                setUserEmail(user.email);
                getData();
            } else {
                console.log("User is signed out");
                AsyncStorage.getItem("userEmail").then((email) => {
                    if (email) {
                        console.log("Using stored email:", email);
                        setUserEmail(email);
                        getData();
                    }
                });
            }
        });

        return () => unsubscribe();
    }, []);

    const handleSignOut = () => {
        auth
            .signOut()
            .then(() => {
                console.log("User signed out!");
                router.replace("/flight-destinations");
                AsyncStorage.removeItem("isLoggedIn");
            })
            .catch((error) => alert(error.message));
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.profileHeaderRow}>
                <TouchableOpacity onPress={() => router.back()} style={styles.back}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.profileTitle}>My Profile</Text>
            </View>

            <View style={styles.profileTopSection}>
                <Image
                    source={profilePicture ? { uri: profilePicture } : profileImage}
                    style={styles.profilePicLarge}
                />
                <Text style={styles.profileName}>{userFirstName} {userLastName}</Text>
                <Text style={styles.profileEmail}>{userEmail}</Text>

                <TouchableOpacity style={styles.editButton} onPress={() => router.push("/profile/editProfile")}>
                    <Text style={styles.editButtonText}>Edit Profile</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.profileOptions}>
                <Option icon="location-outline" label="Location" onPress={() => router.push("/RequestPermissions")} />
                <Option icon="card-outline" label="Subscription" />
                <Option icon="airplane-outline" label="Booked Trips" onPress={() => router.push("/profile/bookedTravels")} />
                <Option icon="time-outline" label="Trips History" onPress={() => router.push("/profile/TravelsLog")} />
                {isAdmin && (
                    <Option icon="shield-checkmark" label="Admin Dashboard" onPress={() => router.push("/admin/admin")} />
                )}
                <Option icon="log-out-outline" label="Log Out" onPress={handleSignOut} />
            </View>
        </ScrollView>
    );
};

const Option = ({ icon, label, onPress }) => (
    <TouchableOpacity style={styles.optionRow} onPress={onPress}>
        <Ionicons name={icon} size={22} color="black" />
        <Text style={styles.optionLabel}>{label}</Text>
        <Ionicons name="chevron-forward" size={20} color="#aaa" style={{ marginLeft: 'auto' }} />
    </TouchableOpacity>
);

export default Profile;