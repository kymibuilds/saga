import "react-native-gesture-handler";
import "../global.css";
import { 
  useFonts, 
  DMSans_400Regular, 
  DMSans_500Medium, 
  DMSans_700Bold 
} from '@expo-google-fonts/dm-sans';

import { Slot } from "expo-router";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function Layout() {
  // Load the fonts
  const [loaded, error] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  });

  // Hide splash screen once fonts are loaded
  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  // Don't render anything until fonts are loaded
  if (!loaded && !error) {
    return null;
  }

  return (
    <ClerkProvider tokenCache={tokenCache}>
      <SafeAreaProvider>
        <Slot />
      </SafeAreaProvider>
    </ClerkProvider>
  );
}