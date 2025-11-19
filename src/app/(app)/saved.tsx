import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft, Heart } from "lucide-react-native";
import { router } from "expo-router";
import { useUser } from "@clerk/clerk-expo";

import { getSavedProducts, removeSavedProduct } from "@/api/saved";
import { fetchProducts } from "@/api/products";

export default function Saved() {
  const [savedProducts, setSavedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useUser();

  /* -------------------------
        LOAD SAVED DATA
  -------------------------- */
  useEffect(() => {
    if (user) loadAll();
  }, [user]);

  async function loadAll() {
    setLoading(true);

    const savedIds = await getSavedProducts(user.id);
    const { data: allProducts } = await fetchProducts();

    const filtered = allProducts.filter((p) =>
      savedIds.includes(p.id)
    );

    setSavedProducts(filtered);
    setLoading(false);
  }

  /* -------------------------
        REMOVE SAVED ITEM
  -------------------------- */
  async function removeItem(id: string) {
    if (!user) return;

    await removeSavedProduct(user.id, id);

    setSavedProducts((prev) => prev.filter((p) => p.id !== id));
  }

  /* -------------------------
                UI
  -------------------------- */
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

        {/* MAIN CONTENT */}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="flex flex-row flex-wrap justify-between pb-28">

            {/* LOADING */}
            {loading && (
              <Text className="text-neutral-600 text-lg mt-20">Loading…</Text>
            )}

            {/* ITEMS */}
            {!loading &&
              savedProducts.map((item) => (
                <View
                  key={item.id}
                  className="bg-white rounded-xl mb-6 w-[48%] overflow-hidden border border-neutral-200"
                >
                  {/* IMAGE */}
                  <View className="relative">
                    <Image
                      source={{ uri: item.image_url }}
                      className="w-full h-48"
                      resizeMode="cover"
                    />

                    {/* REMOVE */}
                    <TouchableOpacity
                      onPress={() => removeItem(item.id)}
                      className="absolute top-3 right-3 bg-white rounded-full p-2"
                    >
                      <Heart size={18} color="#ef4444" fill="#ef4444" />
                    </TouchableOpacity>
                  </View>

                  {/* DIVIDER */}
                  <View className="border-t border-neutral-200" />

                  {/* INFO */}
                  <View className="p-3">
                    <Text
                      className="text-base font-semibold text-neutral-900"
                      numberOfLines={1}
                    >
                      {item.name}
                    </Text>

                    <Text className="text-lg font-bold text-black mt-1">
                      ${item.price}
                    </Text>
                  </View>
                </View>
              ))}

            {/* EMPTY */}
            {!loading && savedProducts.length === 0 && (
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
