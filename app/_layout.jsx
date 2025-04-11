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
            name="login"
            options={{
            title: 'login' // Update the tab name properly
            }}
        />
    </Tabs>
);
}
