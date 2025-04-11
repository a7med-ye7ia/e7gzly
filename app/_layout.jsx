import { Tabs } from 'expo-router';

export default function TabLayout() {
    return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'red' }}>
        <Tabs.Screen
            name="index"
            options={{
            title: 'can nfsy akon mared',
            tabBarButton:()=>null
            }}
        />
        <Tabs.Screen
            name="Home"
            options={{
            title: 'Home' // Update the tab name properly
            }}
        />
        <Tabs.Screen
            name="Login"
            options={{
            title: 'Login' // Update the tab name properly
            }}
        />
         <Tabs.Screen
            name="SignUp"
            options={{
            title: 'SignUp' // Update the tab name properly
            }}
        />
    </Tabs>
);
}
