import { useEffect } from "react";
import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function WelcomeSplash() {

  useEffect(() => {
    const timer = setTimeout(async () => {

      // MARK ONBOARDING AS COMPLETE
      await AsyncStorage.setItem("onboarded", "true");

      // MOVE TO NEXT ONBOARDING SCREEN
      router.replace("/(onboarding)/welcome-main");

    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-black items-center justify-start">
      <Image
        source={require("../../../public/images/onboarding/lines1.png")}
        className="w-full"
        resizeMode="contain"
      />

      <Image
        source={require("../../../public/images/onboarding/logo.png")}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        resizeMode="contain"
      />
    </SafeAreaView>
  );
}
