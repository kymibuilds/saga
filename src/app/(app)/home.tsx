import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Bell, Settings2 } from "lucide-react-native";
import { router } from "expo-router";

const categories = ["All", "T-Shirt", "Hoodies", "Jeans", "Shoes", "Accessories"];

const products = [
  {
    id: "1",
    name: "Classic Tee",
    category: "T-Shirt",
    price: "$29",
    image: { uri: "https://source.unsplash.com/600x800/?tshirt" }
  },
  {
    id: "2",
    name: "Cozy Hoodie",
    category: "Hoodies",
    price: "$49",
    image: { uri: "https://source.unsplash.com/600x800/?hoodie" }
  },
  {
    id: "3",
    name: "Denim Jeans",
    category: "Jeans",
    price: "$59",
    image: { uri: "https://source.unsplash.com/600x800/?jeans" }
  },
  {
    id: "4",
    name: "Running Shoes",
    category: "Shoes",
    price: "$79",
    image: { uri: "https://source.unsplash.com/600x800/?shoes" }
  },
  {
    id: "5",
    name: "Accessories Pack",
    category: "Accessories",
    price: "$19",
    image: { uri: "https://source.unsplash.com/600x800/?accessories" }
  }
];

const Home = () => {
  const [active, setActive] = React.useState("All");

  const filtered =
    active === "All"
      ? products
      : products.filter((p) => p.category === active);

  return (
    <SafeAreaView className="flex-1 bg-neutral-50 px-6 py-6">

      {/* Header */}
      <View className="flex flex-row items-center justify-between mb-6">
        <Text className="text-5xl font-bold tracking-tighter">Discover</Text>
        <TouchableOpacity className="p-2" onPress={()=>{router.push("/(app)/notifications")}}>
          <Bell size={28} strokeWidth={2.5} color="black" />
        </TouchableOpacity>
      </View>

      {/* Search + Filter */}
      <View className="flex flex-row items-center gap-3 mb-6">
        <View className="flex-1 h-14 flex-row items-center bg-white rounded-xl px-4 border border-neutral-300">
          <TextInput
            placeholder="Search products..."
            placeholderTextColor="#9CA3AF"
            className="flex-1 text-black text-base"
          />
        </View>
        <TouchableOpacity className="h-14 w-14 bg-black rounded-xl items-center justify-center">
          <Settings2 color="white" size={22} strokeWidth={2} />
        </TouchableOpacity>
      </View>

      {/* Main Scroll */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Horizontal Category Filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 6, paddingRight: 24 }}
          className="mb-6"
        >
          {categories.map((item) => (
            <TouchableOpacity
              key={item}
              onPress={() => setActive(item)}
              className={`px-5 py-2 rounded-xl ${
                active === item
                  ? "bg-black"
                  : "bg-neutral-50 border border-neutral-300"
              }`}
            >
              <Text
                className={`font-semibold text-md ${
                  active === item ? "text-white" : "text-neutral-700"
                }`}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Product Grid */}
        <View className="flex flex-row flex-wrap justify-between">
          {filtered.map((prod) => (
            <TouchableOpacity key={prod.id} className="w-[48%] mb-4">
              <View className="bg-white rounded-2xl overflow-hidden">
                <Image
                  source={prod.image}
                  className="w-full h-48"
                  resizeMode="cover"
                />
                <View className="p-3">
                  <Text className="text-base font-semibold">{prod.name}</Text>
                  <Text className="text-sm font-bold text-neutral-700 mt-1">
                    {prod.price}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

    </SafeAreaView>
  );
};

export default Home;
