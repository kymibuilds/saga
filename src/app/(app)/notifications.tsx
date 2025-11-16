import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft, Tag, PackageCheck, BellRing, RefreshCcw } from "lucide-react-native";
import { router } from "expo-router";

/* -------------------------------
      MOCK NOTIFICATION DATA
-------------------------------- */
const notifications = [
  {
    id: 1,
    title: "Special Discount!",
    message: "Get 20% off on all hoodies today only.",
    time: "2 hours ago",
    type: "discount",
  },
  {
    id: 2,
    title: "Order Shipped",
    message: "Your order #98322 has been shipped.",
    time: "1 day ago",
    type: "order",
  },
  {
    id: 3,
    title: "New Updates",
    message: "We’ve improved your shopping experience.",
    time: "3 days ago",
    type: "update",
  },
  {
    id: 4,
    title: "Flash Sale!",
    message: "Buy 1 get 1 free on selected items.",
    time: "5 days ago",
    type: "promo",
  },
];

/* Icon Mapping */
const typeIcon = {
  discount: <Tag size={22} color="black" />,
  order: <PackageCheck size={22} color="black" />,
  update: <RefreshCcw size={22} color="black" />,
  promo: <BellRing size={22} color="black" />,
};

export default function Notifications() {
  return (
    <SafeAreaView className="flex-1 bg-neutral-50">
      <View className="px-6 pt-4 flex-1">

        {/* HEADER */}
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
            Notifications
          </Text>
        </View>

        {/* NOTIFICATIONS LIST */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
        >
          {notifications.map((item) => (
            <View
              key={item.id}
              className="bg-white rounded-2xl p-4 mb-4 shadow-sm flex-row gap-4"
            >
              {/* Icon */}
              <View className="w-12 h-12 bg-neutral-200 rounded-xl items-center justify-center">
                {typeIcon[item.type]}
              </View>

              {/* Text */}
              <View className="flex-1">
                <Text className="text-lg font-semibold text-black">
                  {item.title}
                </Text>
                <Text className="text-neutral-600 mt-1">{item.message}</Text>

                <Text className="text-neutral-400 text-sm mt-2">
                  {item.time}
                </Text>
              </View>
            </View>
          ))}

          {/* EMPTY STATE */}
          {notifications.length === 0 && (
            <View className="mt-20 items-center">
              <Text className="text-neutral-600 text-lg">No new notifications</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
