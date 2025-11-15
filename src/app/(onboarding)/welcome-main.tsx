import { View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowRight } from "lucide-react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function WelcomeMain() {
  
  const handleStart = async () => {
    await AsyncStorage.setItem("onboarded", "true");
    const check = await AsyncStorage.getItem("onboarded");
    console.log("AFTER SET:", check);
    router.replace("/(auth)/sign-up");
  };

  return (
    <SafeAreaView className="flex-1 bg-neutral-100">
      <View className="flex-1 relative">
        {/* BACKGROUND IMAGE */}
        <Image
          source={require("../../../public/images/onboarding/lines2.png")}
          className="absolute inset-0 w-full h-full"
          resizeMode="contain"
        />

        {/* TEXT LAYER */}
        <View className="px-6 mt-10 z-10">
          <Text className="text-6xl font-black">Define</Text>
          <Text className="text-6xl font-black">yourself in</Text>
          <Text className="text-6xl font-black">your unique</Text>
          <Text className="text-6xl font-black">way.</Text>
        </View>

        {/* MODEL IMAGE (bottom right) */}
        <Image
          source={require("../../../public/images/onboarding/model.png")}
          className="absolute right-0 -bottom-10"
          resizeMode="contain"
        />
      </View>

      {/* BOTTOM BUTTON BAR */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t-2 border-neutral-200 py-6 px-6">
        <TouchableOpacity
          className="bg-neutral-900 py-4 rounded-xl"
          activeOpacity={0.9}
          onPress={handleStart}
        >
          <View className="flex flex-row items-center justify-center gap-2">
            <Text className="text-white text-center text-lg">Get Started</Text>
            <ArrowRight color="white" />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
