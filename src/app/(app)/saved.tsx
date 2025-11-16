import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft, Heart } from "lucide-react-native";
import { router } from "expo-router";

/* -------------------------
     MOCK SAVED PRODUCTS
-------------------------- */
const mockSaved = [
  {
    id: "1",
    name: "Classic Tee",
    price: "$29",
    image: { uri: "https://source.unsplash.com/600x800/?tshirt" },
  },
  {
    id: "2",
    name: "Cozy Hoodie",
    price: "$49",
    image: { uri: "https://source.unsplash.com/600x800/?hoodie" },
  },
  {
    id: "3",
    name: "Running Shoes",
    price: "$79",
    image: { uri: "https://source.unsplash.com/600x800/?shoes" },
  },
  {
    id: "4",
    name: "Denim Jeans",
    price: "$59",
    image: { uri: "https://source.unsplash.com/600x800/?jeans" },
  },
];

export default function Saved() {
  const [saved, setSaved] = useState(mockSaved);

  const toggleSave = (id: string) => {
    setSaved((prev) => prev.filter((item) => item.id !== id));
  };

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
            Saved
          </Text>
        </View>

        {/* GRID LIST */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
        >
          <View className="flex flex-row flex-wrap justify-between">
            {saved.map((item) => (
              <View
                key={item.id}
                className="bg-white rounded-2xl mb-6 w-[48%] overflow-hidden shadow-sm"
              >
                {/* Product Image */}
                <Image
                  source={item.image}
                  className="w-full h-48"
                  resizeMode="cover"
                />

                {/* Content */}
                <View className="p-3">
                  <Text className="text-lg font-semibold text-black">
                    {item.name}
                  </Text>
                  <Text className="text-neutral-700 mt-1">{item.price}</Text>

                  {/* Remove from Saved */}
                  <TouchableOpacity
                    onPress={() => toggleSave(item.id)}
                    className="absolute top-2 right-2 p-1 bg-white rounded-full shadow"
                  >
                    <Heart fill="black" color="white" size={20} />
                  </TouchableOpacity>
                </View>
              </View>
            ))}

            {/* EMPTY STATE */}
            {saved.length === 0 && (
              <View className="w-full mt-20 items-center">
                <Text className="text-neutral-600 text-lg">
                  No saved items yet
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
