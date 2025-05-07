import { Slot } from 'expo-router';
import ButtomBar from './Buttom-Bar';
import { View } from 'react-native';
import { usePathname } from 'expo-router'; 

export default function RootLayout() {
  const currentPath = usePathname();

  const pathsWithoutButtomBar = ['./login', './login/ForgetPassword','./login/SignUp']; 

  const shouldShowButtomBar = !pathsWithoutButtomBar.includes(currentPath);

  return (
    <View style={{ flex: 1 }}>
      <Slot />

      {shouldShowButtomBar && <ButtomBar />}
    </View>
  );
}

