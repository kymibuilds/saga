import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft } from "lucide-react-native";
import { router } from "expo-router";

/* ------------------------
   MOCK ORDERS DATA
------------------------- */
const orders = [
  {
    id: "ORD-98321",
    product: "Classic Tee",
    price: "$29.00",
    date: "12 Jan 2025",
    status: "Delivered",
    image: { uri: "https://source.unsplash.com/400x500/?tshirt" }
  },
  {
    id: "ORD-98322",
    product: "Cozy Hoodie",
    price: "$49.00",
    date: "20 Jan 2025",
    status: "Shipped",
    image: { uri: "https://source.unsplash.com/400x500/?hoodie" }
  },
  {
    id: "ORD-98323",
    product: "Running Shoes",
    price: "$79.00",
    date: "25 Jan 2025",
    status: "Processing",
    image: { uri: "https://source.unsplash.com/400x500/?shoes" }
  }
];

/* Status colors */
const statusColors: any = {
  Delivered: "bg-green-100 text-green-700",
  Shipped: "bg-blue-100 text-blue-700",
  Processing: "bg-yellow-100 text-yellow-700"
};

export default function MyOrders() {
  return (
    <SafeAreaView className="flex-1 bg-neutral-50">
      <View className="px-6 pt-4 flex-1">

        {/* Header */}
        <View className="relative flex items-center mb-6">
          <TouchableOpacity
            className="absolute left-0"
            onPress={() => {
              if (router.canGoBack()) router.back();
              else router.push("/(app)/account");
            }}
          >
            <ArrowLeft size={30} strokeWidth={2.3} color="black" />
          </TouchableOpacity>

          <Text className="text-4xl font-bold tracking-tight text-black">
            My Orders
          </Text>
        </View>

        {/* ORDER LIST */}
        <ScrollView showsVerticalScrollIndicator={false}>
          {orders.map((order) => (
            <TouchableOpacity
              key={order.id}
              activeOpacity={0.9}
              className="bg-white rounded-2xl p-4 mb-5 shadow-sm"
            >
              {/* Top Section */}
              <View className="flex flex-row gap-4">
                <Image
                  source={order.image}
                  className="w-20 h-20 rounded-xl"
                  resizeMode="cover"
                />

                <View className="flex-1 justify-center">
                  <Text className="text-lg font-semibold text-black">
                    {order.product}
                  </Text>
                  <Text className="text-neutral-600 mt-1">Order: {order.id}</Text>
                  <Text className="text-neutral-800 mt-1 font-medium">
                    {order.price}
                  </Text>
                </View>
              </View>

              {/* Status + Date */}
              <View className="flex flex-row items-center justify-between mt-4">
                <View
                  className={`px-3 py-1 rounded-full ${statusColors[order.status]}`}
                >
                  <Text className="text-sm font-medium">{order.status}</Text>
                </View>
                <Text className="text-neutral-500 text-sm">{order.date}</Text>
              </View>

              {/* Button */}
              <TouchableOpacity
                activeOpacity={0.8}
                className="mt-4 py-3 w-full bg-black rounded-xl"
              >
                <Text className="text-center text-white font-semibold">
                  View Details
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
