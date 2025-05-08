import { Link } from "expo-router";
import { SafeAreaView, Text, View, ImageBackground, TouchableOpacity, StatusBar } from "react-native";
import styles from '../styles/stylePages';


export default function Page() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in when component mounts
    const checkLoginStatus = async () => {
      const loginStatus = await AsyncStorage.getItem("isLoggedIn")
      setIsLoggedIn(loginStatus === "true")
    }

    checkLoginStatus()
  }, [])

  const handleGoPress = () => {
    router.replace("./flight-destinations")
  }

  return (
    <SafeAreaView style={styles.containerIndex}>
      <StatusBar barStyle="light-content" />
      <ImageBackground source={require("../assets/bg.png")} style={styles.backgroundImage} resizeMode="cover">
        <View style={styles.overlay}>
          <View style={styles.logoContainer}>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>Fly Like a Bird</Text>
            <Text style={styles.subtitle}>Explore new world with us and let yourself get amazing experiences</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Link href="/login" style={styles.button}>
              <Text style={styles.buttonText}>Login</Text>
            </Link>
            <Link href="/login/SignUp" style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Sign Up</Text>
            </Link>
           
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  )
}
