import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft, Bell } from "lucide-react-native";
import { router } from "expo-router";

const Account = () => {
  const [gender, setGender] = useState<"male" | "female" | null>(null);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6 py-6 pb-32">
        {/* Header */}
        <View className="flex flex-row items-center justify-between mb-4">
          <ArrowLeft size={28} strokeWidth={2} color="black" />
          <Text className="text-3xl font-bold">My Details</Text>
          <TouchableOpacity onPress={()=>router.push("/(app)/notification-settings")}>
            <Bell size={26} strokeWidth={2} color="black" />
          </TouchableOpacity>
        </View>

        <View className="h-px bg-neutral-300 w-full my-2" />

        {/* FORM */}
        <View className="flex-1 mt-6">
          {/* Full Name */}
          <View className="mb-6">
            <Text className="text-neutral-700 mb-2 font-medium">Full Name</Text>
            <TextInput
              placeholder="Code Fisher"
              placeholderTextColor="#A1A1A1"
              className="border-2 border-neutral-200 rounded-xl px-4 py-5 text-black"
            />
          </View>

          {/* Email */}
          <View className="mb-6">
            <Text className="text-neutral-700 mb-2 font-medium">
              Email Address
            </Text>
            <TextInput
              placeholder="kymibuilds@gmail.com"
              placeholderTextColor="#A1A1A1"
              keyboardType="email-address"
              autoCapitalize="none"
              className="border-2 border-neutral-200 rounded-xl px-4 py-5 text-black"
            />
          </View>

          {/* DOB */}
          <View className="mb-6">
            <Text className="text-neutral-700 mb-2 font-medium">
              Date of Birth
            </Text>
            <TextInput
              placeholder="DD / MM / YYYY"
              placeholderTextColor="#A1A1A1"
              className="border-2 border-neutral-200 rounded-xl px-4 py-5 text-black"
            />
          </View>

          {/* Gender */}
          <View className="mb-6">
            <Text className="text-neutral-700 mb-2 font-medium">Gender</Text>

            <View className="flex flex-row gap-3">
              {/* Male */}
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => setGender("male")}
                className={`flex-1 border-2 border-neutral-200 py-3 rounded-xl items-center ${
                  gender === "male" ? "bg-black border-black" : "bg-white"
                }`}
              >
                <Text
                  className={`font-medium ${
                    gender === "male" ? "text-white" : "text-neutral-700"
                  }`}
                >
                  Male
                </Text>
              </TouchableOpacity>

              {/* Female */}
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => setGender("female")}
                className={`flex-1 border-2 border-neutral-200 py-3 rounded-xl items-center ${
                  gender === "female" ? "bg-black border-black" : "bg-white"
                }`}
              >
                <Text
                  className={`font-medium ${
                    gender === "female" ? "text-white" : "text-neutral-700"
                  }`}
                >
                  Female
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          activeOpacity={0.9}
          className="bg-black rounded-xl py-4 mt-6"
        >
          <Text className="text-center text-white text-lg font-semibold">
            Save Details
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Account;
