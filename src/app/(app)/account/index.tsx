import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowLeft,
  User,
  Package,
  Bell,
  CreditCard,
  MapPin,
  Shield,
  HelpCircle,
  LogOut,
} from "lucide-react-native";
import { router } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

export default function AccountHome() {
  const { signOut } = useAuth();
  const handleSignout = async () => {
    await signOut();
    router.replace("/(auth)/sign-in");
  };
  return (
    <SafeAreaView className="flex-1 bg-neutral-50">
      <View className="px-6 pt-4 flex-1">
        {/* Header */}
        <View className="relative flex items-center mb-6">
          <TouchableOpacity
            className="absolute left-0"
            onPress={() => {
              if (router.canGoBack()) router.back();
              else router.push("/(app)/home");
            }}
          >
            <ArrowLeft size={30} strokeWidth={2.3} color="black" />
          </TouchableOpacity>
          <Text className="text-4xl font-bold tracking-tight text-black">
            Account
          </Text>
        </View>

        {/* Content */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {/* Section: Profile */}
          <AccountRow
            label="My Details"
            icon={<User size={22} color="black" strokeWidth={2} />}
            onPress={() => router.push("/(app)/account/my-details")}
          />

          {/* Section: Orders */}
          <AccountRow
            label="My Orders"
            icon={<Package size={22} color="black" strokeWidth={2} />}
            onPress={() => router.push("/(app)/account/my-orders")}
          />

          {/* Section: Notifications */}
          <AccountRow
            label="Notifications"
            icon={<Bell size={22} color="black" strokeWidth={2} />}
            onPress={() => router.push("/(app)/account/notification-settings")}
          />

          {/* Section: Payments */}
          <AccountRow
            label="Payment Methods"
            icon={<CreditCard size={22} color="black" strokeWidth={2} />}
            onPress={() => router.push("/(app)/account/payment-methods")}
          />

          {/* Section: Addresses */}
          <AccountRow
            label="Addresses"
            icon={<MapPin size={22} color="black" strokeWidth={2} />}
            onPress={() => router.push("/(app)/account/addresses")}
          />

          {/* Section: FAQ */}
          <AccountRow
            label="FAQ / Help"
            icon={<HelpCircle size={22} color="black" strokeWidth={2} />}
            onPress={() => router.push("/(app)/account/faq")}
          />

          {/* Logout */}
          <View className="mt-8">
            <AccountRow
              label="Logout"
              icon={<LogOut size={22} color="black" strokeWidth={2} />}
              onPress={() => handleSignout()}
              isDanger
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

/* ----------------------------
    Reusable Row Component
----------------------------- */
const AccountRow = ({
  label,
  icon,
  onPress,
  isDanger = false,
}: {
  label: string;
  icon: React.ReactNode;
  onPress?: () => void;
  isDanger?: boolean;
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      className="flex flex-row items-center justify-between py-5 border-b border-neutral-200"
    >
      <View className="flex-row items-center gap-3">
        {icon}
        <Text
          className={`text-lg ${
            isDanger ? "text-red-600 font-semibold" : "text-black"
          }`}
        >
          {label}
        </Text>
      </View>

      <ArrowLeft
        size={20}
        color="#A1A1A1"
        strokeWidth={2}
        style={{ transform: [{ rotate: "180deg" }] }}
      />
    </TouchableOpacity>
  );
};
