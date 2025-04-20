import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import styles from "../styles/stylePages";

export default function TravelsLog() {
    const router = useRouter();

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.pageTitle}>Travels Log</Text>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Tokyo Adventure</Text>
                <Text>Date: 1 Aug 2025</Text>
                <Text>Duration: 7 Days</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Paris City Break</Text>
                <Text>Date: 15 Sep 2025</Text>
                <Text>Duration: 5 Days</Text>
            </View>

            <TouchableOpacity
                style={styles.backButtonProfile}
                onPress={() => router.push("/profile")}
            >
                <Text style={styles.buttonText}>back</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}
