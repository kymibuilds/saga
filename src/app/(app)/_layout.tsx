import { Stack } from "expo-router";
import { View } from "react-native";
import Navbar from "./components/Navbar";

export default function AppLayout() {
  return (
    <View className="flex-1">
      {/* Main Screens */}
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "none",
        }}
      >
        <Stack.Screen name="home" />
        <Stack.Screen name="search" />
        <Stack.Screen name="saved" />
        <Stack.Screen name="cart" />
        <Stack.Screen name="account" />
      </Stack>

      {/* Bottom Navigation */}
      <Navbar />
    </View>
  );
}
