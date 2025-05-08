import { Slot } from 'expo-router';
import BottomBar from './Buttom-Bar';
import { View } from 'react-native';
import { usePathname } from 'expo-router';

export default function RootLayout() {
  const currentPath = usePathname();  

  const hidePrefixes = ['/', '/login', '/login/ForgetPassword', '/login/SignUp'];
const shouldShowBottomBar = !hidePrefixes.some(prefix =>
    prefix === '/' ? currentPath === '/' : currentPath.startsWith(prefix)
  );

  return (
    <View style={{ flex: 1 }}>
      <Slot />
      {shouldShowBottomBar && <BottomBar />}
    </View>
  );
}