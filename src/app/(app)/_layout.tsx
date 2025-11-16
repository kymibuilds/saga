import { Stack } from "expo-router";
import { View } from "react-native";
import Navbar from "./components/Navbar";

export default function AppLayout() {
  return (
    <View className="flex-1">
      <Stack screenOptions={{ headerShown: false, animation: "none" }}>
        <Stack.Screen name="home" />
        <Stack.Screen name="search" />
        <Stack.Screen name="saved" />
        <Stack.Screen name="cart" /> 
        <Stack.Screen name="notifications" />
        {/* Account Section */}
        <Stack.Screen name="account/index" />
        <Stack.Screen name="account/my-details" />
        <Stack.Screen name="account/my-orders" />
        <Stack.Screen name="account/faq" />
        <Stack.Screen name="account/addresses" />
        <Stack.Screen name="account/payment-methods" />
        <Stack.Screen name="account/security" />
        <Stack.Screen name="account/notification-settings" />
      </Stack>

      {/* bottom navigation bar */}
      <Navbar />
    </View>
  );
}
