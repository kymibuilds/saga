import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Bell, Settings2, Heart } from "lucide-react-native";
import { router } from "expo-router";

const categories = [
  "All",
  "TShirts",
  "Hoodies",
  "Jeans",
  "Shoes",
  "Accessories",
];

const products = [
  {
    id: "1",
    name: "y2k TEE limited edition",
    category: "TShirts",
    price: "$29",
    image: require("../../../public/images/clothes/cloth1.jpg")
  },
  {
    id: "2",
    name: "grey crop top",
    category: "TShirts",
    price: "$32",
    image: require("../../../public/images/clothes/cloth2.jpg")
  },
  {
    id: "3",
    name: "limited edition grey croptop",
    category: "Hoodies",
    price: "$49",
    image: require("../../../public/images/clothes/cloth3.jpg")
  },
  {
    id: "4",
    name: "Brazil Jersey",
    category: "Hoodies",
    price: "$45",
    image: require("../../../public/images/clothes/cloth4.jpg")
  },
  {
    id: "5",
    name: "Black Tee",
    category: "Jeans",
    price: "$59",
    image: require("../../../public/images/clothes/cloth5.jpg")
  },
  {
    id: "6",
    name: "Fish Tee",
    category: "Jeans",
    price: "$62",
    image: require("../../../public/images/clothes/cloth6.jpg")
  },
  {
    id: "7",
    name: "Cloth 7",
    category: "Shoes",
    price: "$79",
    image: require("../../../public/images/clothes/cloth7.jpg")
  },
  {
    id: "8",
    name: "Cloth 8",
    category: "Shoes",
    price: "$85",
    image: require("../../../public/images/clothes/cloth8.jpg")
  },
  {
    id: "9",
    name: "Cloth 9",
    category: "Accessories",
    price: "$19",
    image: require("../../../public/images/clothes/cloth9.jpg")
  },
  {
    id: "10",
    name: "Cloth 10",
    category: "Accessories",
    price: "$22",
    image: require("../../../public/images/clothes/cloth10.jpg")
  },
  {
    id: "11",
    name: "Cloth 11",
    category: "TShirts",
    price: "$28",
    image: require("../../../public/images/clothes/cloth11.jpg")
  },
  {
    id: "12",
    name: "Cloth 12",
    category: "Hoodies",
    price: "$55",
    image: require("../../../public/images/clothes/cloth12.jpg")
  },
  {
    id: "13",
    name: "Cloth 13",
    category: "Accessories",
    price: "$15",
    image: require("../../../public/images/clothes/cloth13.jpg")
  }
];

const Home = () => {
  const [active, setActive] = React.useState("All");
  const [favorites, setFavorites] = React.useState({});

  const filtered =
    active === "All" ? products : products.filter((p) => p.category === active);

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-6 py-6">
      
      {/* Header */}
      <View className="flex flex-row items-center justify-between mb-6">
        <Text className="text-5xl font-bold tracking-tighter">Discover</Text>
        <TouchableOpacity
          activeOpacity={0.9}
          className="p-2"
          onPress={() => router.push("/(app)/notifications")}
        >
          <Bell size={28} strokeWidth={2.5} color="black" />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View className="flex flex-row items-center gap-3 mb-6">
        <View className="flex-1 h-14 flex-row items-center bg-white rounded-xl px-4 border border-neutral-300">
          <TextInput
            placeholder="Search products..."
            placeholderTextColor="#9CA3AF"
            className="flex-1 text-black text-base"
          />
        </View>

        <TouchableOpacity
          className="h-14 w-14 bg-black rounded-xl items-center justify-center"
          activeOpacity={0.9}
        >
          <Settings2 color="white" size={22} strokeWidth={2} />
        </TouchableOpacity>
      </View>

      {/* FIXED CATEGORY BAR */}
      <View className="mb-4">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 6, paddingRight: 24 }}
        >
          {categories.map((item) => (
            <TouchableOpacity
              key={item}
              onPress={() => setActive(item)}
              activeOpacity={0.9}
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
      </View>

      {/* PRODUCTS ONLY SCROLL */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="flex flex-row flex-wrap justify-between">
          {filtered.map((prod) => (
            <TouchableOpacity key={prod.id} className="w-[48%] mb-4" activeOpacity={0.9}>
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
      </ScrollView>

    </SafeAreaView>
  );
};

export default Home;