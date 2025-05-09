import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import styles from "../../styles/stylePages";
import {Ionicons} from "@expo/vector-icons";

export default function TravelsLog() {
    const router = useRouter();

    return (
        <ScrollView style={styles.container}>
            <View style={styles.profileHeaderRow}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>

                <Text style={styles.profileTitle}>Trips History</Text>

                <View style={{ width: 24 }} />
            </View>


            <View style={styles.card}>
                <Text style={styles.cardTitle}>Tokyo Adventure</Text>
                <Text>Date: 1 Aug 2025</Text>
                <Text>Duration: 7 Days</Text>
            </View>

            <View style={styles.separator} />

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Paris City Break</Text>
                <Text>Date: 15 Sep 2025</Text>
                <Text>Duration: 5 Days</Text>
            </View>
        </ScrollView>
    );
}
