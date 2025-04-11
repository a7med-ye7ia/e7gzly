import { View , Text ,Button} from "react-native";
import { router } from 'expo-router';
export default function HomePage () {
  return (
    <View>
        <Text>Home page</Text>
        <Button
        title="Go to (index) tab"
        onPress={() => router.back('/')}
        />
    </View>
  )
};