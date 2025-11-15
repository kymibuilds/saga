import { Redirect } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
  const { isLoaded, isSignedIn } = useAuth();
  const [onboarded, setOnboarded] = useState<boolean | null>(null);

  useEffect(() => {
    AsyncStorage.getItem("onboarded").then((value) => {
      setOnboarded(value === "true");
    });
  }, []);

  if (!isLoaded || onboarded === null) {
    return null; // small safeguard against flicker
  }

  if (!onboarded) {
    return <Redirect href="/(onboarding)/welcome-splash" />;
  }

  if (!isSignedIn) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  return <Redirect href="/(app)/home" />;
}
