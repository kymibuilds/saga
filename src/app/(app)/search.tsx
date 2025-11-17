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
import { ArrowLeft, Heart } from "lucide-react-native";
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
  {
    id: "5",
    name: "White Sneakers",
    price: "$85",
    image: {
      uri: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80",
    },
  },
  {
    id: "6",
    name: "Grey Sweatshirt",
    price: "$42",
    image: {
      uri: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80",
    },
  },
];

export default function Search() {
  const [recent, setRecent] = useState(mockRecent);
  const [query, setQuery] = useState("");
  const [favorites, setFavorites] = useState({});

  const clearRecent = () => setRecent([]);

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-6 py-6">
      
      {/* Header */}
      <View className="flex flex-row items-center mb-6">
        <Text className="text-5xl font-bold tracking-tighter">Search</Text>
      </View>

      {/* Search Input */}
      <View className="h-14 flex-row items-center bg-white rounded-xl px-4 border border-neutral-300 mb-6">
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search products..."
          placeholderTextColor="#9CA3AF"
          className="flex-1 text-black text-base"
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Recent Searches */}
        {recent.length > 0 && (
          <View className="mb-6">
            <View className="flex flex-row items-center justify-between mb-3">
              <Text className="text-lg font-bold text-black">
                Recent Searches
              </Text>
              <TouchableOpacity onPress={clearRecent} activeOpacity={0.9}>
                <Text className="text-neutral-500 font-semibold">Clear All</Text>
              </TouchableOpacity>
            </View>

            <View className="flex flex-row flex-wrap gap-2">
              {recent.map((item, idx) => (
                <View
                  key={idx}
                  className="px-5 py-2 bg-neutral-50 rounded-xl border border-neutral-300"
                >
                  <Text className="text-neutral-700 font-semibold text-md">{item}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Suggested Products */}
        <View>
          <Text className="text-lg font-bold text-black mb-4">
            Suggested for you
          </Text>

          <View className="flex flex-row flex-wrap justify-between">
            {products.map((prod) => (
              <TouchableOpacity 
                key={prod.id} 
                className="w-[48%] mb-4" 
                activeOpacity={0.9}
              >
                <View className="bg-white rounded-xl overflow-hidden border border-neutral-200">
                  
                  {/* Image + Heart */}
                  <View className="relative">
                    <Image
                      source={prod.image}
                      className="w-full h-48"
                      resizeMode="cover"
                    />
                    <TouchableOpacity
                      onPress={() => toggleFavorite(prod.id)}
                      activeOpacity={0.8}
                      className="absolute top-3 right-3 bg-white rounded-full p-2"
                    >
                      <Heart
                        size={18}
                        color={favorites[prod.id] ? "#ef4444" : "#525252"}
                        fill={favorites[prod.id] ? "#ef4444" : "transparent"}
                        strokeWidth={2.5}
                      />
                    </TouchableOpacity>
                  </View>

                  {/* Divider */}
                  <View className="border-t border-neutral-200" />

                  {/* Info */}
                  <View className="p-3">
                    <Text className="text-base font-semibold text-neutral-900">
                      {prod.name}
                    </Text>
                    <Text className="text-lg font-bold text-black mt-1">
                      {prod.price}
                    </Text>
                  </View>

                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

    </SafeAreaView>
  );
}