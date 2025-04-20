import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import styles from "../styles/stylePages";

export default function BookedTravels() {
    const router = useRouter();

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.pageTitle}>Booked Travels</Text>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Rome Trip</Text>
                <Text>Departure: 20 June 2025</Text>
                <Text>Return: 30 June 2025</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Bali Vacation</Text>
                <Text>Departure: 10 July 2025</Text>
                <Text>Return: 20 July 2025</Text>
            </View>

            <TouchableOpacity
                style={styles.backButtonProfile}
                onPress={() => router.push("/profile")}
            >
                <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}
