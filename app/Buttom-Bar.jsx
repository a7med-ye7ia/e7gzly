import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useRouter, usePathname } from 'expo-router'; 
import { Ionicons } from "@expo/vector-icons";

export default function ButtomBar() {
  const router = useRouter();
  const currentPath = usePathname(); 

  const activeColor = "#5A41D7";
  const inactiveColor = "#666"; 

  return (
    <View style={buttonBarStyles.buttonBar}>

      {/*  Flights */}
      <TouchableOpacity style={buttonBarStyles.button} onPress={() => router.push("/flight-destinations")}>
        <Ionicons
          name="airplane"
          size={24}
          color={currentPath === "/flight-destinations" ? activeColor : inactiveColor}
        />
        <Text
          style={[
            buttonBarStyles.buttonText,
            { color: currentPath === "/flight-destinations" ? activeColor : inactiveColor }
          ]}
        >
          Flights
        </Text>
      </TouchableOpacity>

      {/*  Search */}
      <TouchableOpacity style={buttonBarStyles.button} onPress={() => router.push("/Book")}>
        <Ionicons
          name="book"
          size={24}
          color={currentPath === "/Book" ? activeColor : inactiveColor}
        />
        <Text
          style={[
            buttonBarStyles.buttonText,
            { color: currentPath === "/Book" ? activeColor : inactiveColor }
          ]}
        >
          Booking
        </Text>
      </TouchableOpacity>

      {/* Booked */}
      <TouchableOpacity style={buttonBarStyles.button} onPress={() => router.push("/profile/bookedTravels")}>
        <Ionicons
          name="bookmark"
          size={24}
          color={currentPath === "/profile/bookedTravels" ? activeColor : inactiveColor}
        />
        <Text
          style={[
            buttonBarStyles.buttonText,
            { color: currentPath === "/profile/bookedTravels" ? activeColor : inactiveColor }
          ]}
        >
          Booked
        </Text>
      </TouchableOpacity>

      {/*Profile */}
      <TouchableOpacity style={buttonBarStyles.button} onPress={() => router.push("/profile/profile")}>
        <Ionicons
          name="person"
          size={24}
          color={currentPath === "/profile/profile" ? activeColor : inactiveColor}
        />
        <Text
          style={[
            buttonBarStyles.buttonText,
            { color: currentPath === "/profile/profile" ? activeColor : inactiveColor }
          ]}
        >
          Profile
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const buttonBarStyles = StyleSheet.create({
  buttonBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingVertical: 10,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 12,
    marginTop: 5,
  },
});