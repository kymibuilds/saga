import { View, Text, TouchableOpacity, Pressable } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft } from "lucide-react-native";
import { router } from "expo-router";

const Toggle = ({ value, onChange }: { value: boolean; onChange: any }) => (
  <Pressable
    onPress={() => onChange(!value)}
    className="w-12 h-7 rounded-full items-start justify-center"
    style={{
      backgroundColor: value ? "black" : "#D4D4D4",
    }}
  >
    <View
      className="w-5 h-5 rounded-full bg-white"
      style={{
        marginLeft: value ? 22 : 2,
      }}
    />
  </Pressable>
);

const Row = ({ label, state, setState }: any) => (
  <View className="flex flex-row items-center justify-between py-4">
    <Text className="text-lg text-black">{label}</Text>
    <Toggle value={state} onChange={setState} />
  </View>
);

export default function NotificationSettings() {
  const [general, setGeneral] = useState(true);
  const [sound, setSound] = useState(true);
  const [vibrate, setVibrate] = useState(false);
  const [offers, setOffers] = useState(true);
  const [promotions, setPromotions] = useState(true);
  const [payment, setPayment] = useState(false);
  const [discounts, setDiscounts] = useState(true);
  const [cashback, setCashback] = useState(true);
  const [updates, setUpdates] = useState(true);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-6 pt-4">

        {/* Header */}
        <View className="relative flex items-center mb-4">
          <TouchableOpacity
            className="absolute left-0"
            onPress={() => {
              if (router.canGoBack()) router.back();
              else router.push("/(app)/account");
            }}
          >
            <ArrowLeft size={30} strokeWidth={2.3} color="black" />
          </TouchableOpacity>

          <Text className="text-4xl font-bold text-black tracking-tight">
            Notifications
          </Text>
        </View>

        {/* Toggles */}
        <View className="mt-4">

          <Row label="App Notifications" state={general} setState={setGeneral} />
          <Row label="Sound" state={sound} setState={setSound} />
          <Row label="Vibration" state={vibrate} setState={setVibrate} />

          <View className="h-px bg-neutral-200 my-3" />

          <Row label="Special Offers" state={offers} setState={setOffers} />
          <Row label="Promotions" state={promotions} setState={setPromotions} />
          <Row label="Discounts" state={discounts} setState={setDiscounts} />
          <Row label="Cashback Alerts" state={cashback} setState={setCashback} />

          <View className="h-px bg-neutral-200 my-3" />

          <Row label="Payment Alerts" state={payment} setState={setPayment} />
          <Row label="New Updates" state={updates} setState={setUpdates} />

        </View>
      </View>
    </SafeAreaView>
  );
}
