import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import styles from "../../styles/stylePages";
import {Ionicons} from "@expo/vector-icons";

export default function BookedTravels() {
    const router = useRouter();

    return (
        <ScrollView style={styles.container}>
            <View style={styles.profileHeaderRow}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>

                <Text style={styles.profileTitle}>Booked Trips</Text>

                {/* Empty view for balance */}
                <View style={{ width: 24 }} />
            </View>


            <View style={styles.card}>
                <Text style={styles.cardTitle}>Rome Trip</Text>
                <Text>Departure: 20 June 2025</Text>
                <Text>Return: 30 June 2025</Text>
            </View>

            <View style={styles.separator} />

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Bali Vacation</Text>
                <Text>Departure: 10 July 2025</Text>
                <Text>Return: 20 July 2025</Text>
            </View>
        </ScrollView>
    );
}
