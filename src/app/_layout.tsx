import "react-native-gesture-handler";
import "../global.css";

import { Slot } from "expo-router";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Layout() {
  return (
    <ClerkProvider tokenCache={tokenCache}>
      <SafeAreaProvider>
        <Slot />
      </SafeAreaProvider>
    </ClerkProvider>
  );
}
