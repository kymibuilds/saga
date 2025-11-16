import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft, X } from "lucide-react-native";
import { router } from "expo-router";

/* -------------------------------------
      Mock Data
-------------------------------------- */
const mockRecent = ["Hoodie", "Black Tee", "Running Shoes", "Denim"];

const products = [
  {
    id: "1",
    name: "Classic Tee",
    price: "$29",
    image: {
      uri: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
    },
  },
  {
    id: "2",
    name: "Cozy Hoodie",
    price: "$49",
    image: {
      uri: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80",
    },
  },
  {
    id: "3",
    name: "Running Shoes",
    price: "$79",
    image: {
      uri: "https://images.unsplash.com/photo-1584735174914-6b7c3a1d47d7?auto=format&fit=crop&w=800&q=80",
    },
  },
  {
    id: "4",
    name: "Denim Jeans",
    price: "$59",
    image: {
      uri: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=800&q=80",
    },
  },
];

export default function Search() {
  const [recent, setRecent] = useState(mockRecent);
  const [query, setQuery] = useState("");

  const clearRecent = () => setRecent([]);

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
            Search
          </Text>
        </View>

        {/* SEARCH BOX */}
        <View className="bg-white border border-neutral-300 rounded-xl px-4 py-4 mb-6">
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search products..."
            placeholderTextColor="#9CA3AF"
            className="text-base text-black"
          />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
        >
          {/* ---------------------
               RECENT SEARCHES
            ---------------------- */}
          {recent.length > 0 && (
            <View className="mb-8">
              <View className="flex flex-row items-center justify-between mb-3">
                <Text className="text-xl font-semibold text-black">
                  Recent Searches
                </Text>

                <TouchableOpacity onPress={clearRecent}>
                  <Text className="text-neutral-500">Clear All</Text>
                </TouchableOpacity>
              </View>

              <View className="flex flex-row flex-wrap gap-3">
                {recent.map((item, idx) => (
                  <View
                    key={idx}
                    className="px-4 py-2 bg-white rounded-xl border border-neutral-300"
                  >
                    <Text className="text-neutral-700">{item}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* ---------------------
               Suggested Products
            ---------------------- */}
          <View>
            <Text className="text-xl font-semibold text-black mb-4">
              Suggested for you
            </Text>

            <View className="flex flex-row flex-wrap justify-between">
              {products.map((item) => (
                <View
                  key={item.id}
                  className="bg-white rounded-2xl mb-6 w-[48%] overflow-hidden shadow-sm"
                >
                  <Image
                    source={item.image}
                    className="w-full h-48"
                    resizeMode="cover"
                  />

                  <View className="p-3">
                    <Text className="text-lg font-semibold text-black">
                      {item.name}
                    </Text>
                    <Text className="text-neutral-700 mt-1">{item.price}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
