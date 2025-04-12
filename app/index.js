import { Link } from "expo-router";
import { SafeAreaView, Text, View, ImageBackground, TouchableOpacity, StatusBar, StyleSheet } from "react-native";

export default function Page() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ImageBackground source={require("../assets/bg.png")} style={styles.backgroundImage} resizeMode="cover">
        <View style={styles.overlay}>
          <View style={styles.logoContainer}>
            {/* <Image source={require("../assets/logo.png")} style={styles.logo} /> */}
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>Fly Like a Bird</Text>
            <Text style={styles.subtitle}>Explore new world with us and let yourself get amazing experiences</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Link href="/login" style={styles.button}>
              <Text style={styles.buttonText}>Login</Text>
            </Link>
            <Link href="/SignUp" style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Sign Up</Text>
            </Link>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "space-between",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "white",
    marginBottom: 16,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "white",
    lineHeight: 24,
    textAlign: "center",
    marginHorizontal: 20,
  },
  buttonContainer: {
    marginBottom: 30,
    gap: 12,
    alignItems: "center",  // To center the buttons
  },
  button: {
    backgroundColor: "#5C40CC",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
    alignItems: "center",
    width: "80%", // Button width adjusted for better layout
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "white",
    width: "80%", // Button width adjusted for better layout
    justifyContent: "center",
  },
  secondaryButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});
