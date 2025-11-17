import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft, Heart } from "lucide-react-native";
import { router } from "expo-router";

/* ----------------------------------
   MOCK SAVED PRODUCTS (from Home)
----------------------------------- */
const savedProductsMock = [
  {
    id: "1",
    name: "y2k TEE limited edition",
    price: "$29",
    image: require("../../../public/images/clothes/cloth1.jpg"),
  },
  {
    id: "2",
    name: "grey crop top",
    price: "$32",
    image: require("../../../public/images/clothes/cloth2.jpg"),
  },
  {
    id: "3",
    name: "limited edition grey croptop",
    price: "$49",
    image: require("../../../public/images/clothes/cloth3.jpg"),
  },
  {
    id: "4",
    name: "Brazil Jersey",
    price: "$45",
    image: require("../../../public/images/clothes/cloth4.jpg"),
  },
  {
    id: "5",
    name: "Black Tee",
    price: "$59",
    image: require("../../../public/images/clothes/cloth5.jpg"),
  },
];

export default function Saved() {
  const [saved, setSaved] = useState(savedProductsMock);

  const removeSaved = (id: string) => {
    setSaved((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6 pt-4">

        {/* HEADER */}
        <View className="relative flex items-center mb-8">
          <TouchableOpacity
            className="absolute left-0"
            onPress={() => {
              if (router.canGoBack()) router.back();
              else router.push("/(app)/home");
            }}
          >
            <ArrowLeft size={30} strokeWidth={2.3} color="black" />
          </TouchableOpacity>

          <Text className="text-5xl font-bold tracking-tight text-black">
            Saved
          </Text>
        </View>

        {/* SAVED GRID */}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="flex flex-row flex-wrap justify-between pb-28">
            {saved.map((item) => (
              <View
                key={item.id}
                className="bg-white rounded-xl mb-6 w-[48%] overflow-hidden border border-neutral-200"
              >
                {/* Image */}
                <View className="relative">
                  <Image
                    source={item.image}
                    className="w-full h-48"
                    resizeMode="cover"
                  />

                  {/* Remove Heart */}
                  <TouchableOpacity
                    onPress={() => removeSaved(item.id)}
                    activeOpacity={0.8}
                    className="absolute top-3 right-3 bg-white rounded-full p-2"
                  >
                    <Heart size={18} color="#ef4444" fill="#ef4444" />
                  </TouchableOpacity>
                </View>

                {/* Divider */}
                <View className="border-t border-neutral-200" />

                {/* TEXT */}
                <View className="p-3">
                  <Text className="text-base font-semibold text-neutral-900" numberOfLines={1}>
                    {item.name}
                  </Text>

                  <Text className="text-lg font-bold text-black mt-1">
                    {item.price}
                  </Text>
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
