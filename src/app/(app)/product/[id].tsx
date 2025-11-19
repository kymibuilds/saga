// app/(app)/product/[id].tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft, Heart, Star } from "lucide-react-native";
import { useLocalSearchParams, router } from "expo-router";
import { fetchProductById } from "@/api/products";
import { useUser } from "@clerk/clerk-expo";
import {
  getSavedProducts,
  saveProduct,
  removeSavedProduct,
} from "@/api/saved";
import { addToCart } from "@/api/cart";

export default function ProductDetail() {
  const params = useLocalSearchParams();
  const id = params?.id as string | undefined;

  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [adding, setAdding] = useState(false);

  const { user } = useUser();

  /* LOAD PRODUCT */
  useEffect(() => {
    if (id) load();
  }, [id]);

  /* LOAD SAVED IDS */
  useEffect(() => {
    if (user && id) loadSaved();
  }, [user]);

  async function load() {
    setLoading(true);

    const { data } = await fetchProductById(String(id));
    setProduct(data || null);

    if (user) await loadSaved();

    setLoading(false);
  }

  async function loadSaved() {
    if (!user) return;
    const ids = await getSavedProducts(user.id);
    setSavedIds(ids.map(String));
  }

  const isSaved = product && savedIds.includes(product.id);

  /* TOGGLE SAVE */
  async function toggleSave() {
    if (!user || !product) return;
    setSaving(true);

    if (isSaved) {
      await removeSavedProduct(user.id, product.id);
      setSavedIds((prev) => prev.filter((x) => x !== product.id));
    } else {
      await saveProduct(user.id, product.id);
      setSavedIds((prev) => [...prev, product.id]);
    }

    setSaving(false);
  }

  /* ADD TO CART (REAL) */
  async function handleAddToCart() {
    if (!user || !product || product.stock <= 0) return;

    setAdding(true);
    await addToCart(user.id, product.id); // real API
    setAdding(false);
  }

  /* LOADING STATES */
  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  if (!product) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center px-6">
        <Text className="text-lg text-neutral-600">Product not found</Text>
      </SafeAreaView>
    );
  }

  /* UI */
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <View className="px-6 pt-4">

          {/* Header */}
          <View className="relative flex items-center mb-6">
            <TouchableOpacity
              className="absolute left-0"
              onPress={() => {
                if (router.canGoBack()) router.back();
                else router.push("/(app)/home");
              }}
            >
              <ArrowLeft size={28} strokeWidth={2.3} color="black" />
            </TouchableOpacity>

            <Text className="text-2xl font-bold">Details</Text>
          </View>

          {/* Image */}
          <View className="rounded-xl overflow-hidden bg-neutral-100">
            <Image
              source={{ uri: product.image_url }}
              className="w-full h-96"
              resizeMode="cover"
            />
          </View>

          {/* Content */}
          <View className="mt-4 px-0">
            <View className="flex-row justify-between items-start">
              <View style={{ flex: 1 }}>
                <Text className="text-2xl font-bold">{product.name}</Text>
                <Text className="text-lg font-semibold mt-2">${product.price}</Text>

                <View className="flex flex-row gap-0 items-center">
                  <Star color="black" size={12} fill="black" />
                  <Star color="black" size={12} fill="black" />
                  <Star color="black" size={12} fill="black" />
                  <Text className="px-2 text-neutral-500">(45 reviews)</Text>
                </View>
              </View>

              <TouchableOpacity
                onPress={toggleSave}
                activeOpacity={0.8}
                className="ml-4 bg-white rounded-full p-2"
              >
                <Heart
                  size={20}
                  color={isSaved ? "#ef4444" : "#525252"}
                  fill={isSaved ? "#ef4444" : "transparent"}
                />
              </TouchableOpacity>
            </View>

            <Text className="text-neutral-700 mt-4">{product.description}</Text>

            <Text className="text-sm text-neutral-600 mt-3">
              {product.stock > 0 ? `In stock: ${product.stock}` : "Out of stock"}
            </Text>

            {/* ACTION BUTTONS */}
            <View className="mt-6 flex-row gap-3">
              {/* Add to cart */}
              <TouchableOpacity
                onPress={handleAddToCart}
                disabled={product.stock <= 0 || adding}
                className={`flex-1 py-4 rounded-xl items-center justify-center ${
                  product.stock <= 0 ? "bg-neutral-200" : "bg-black"
                }`}
              >
                <Text
                  className={`text-base font-semibold ${
                    product.stock <= 0 ? "text-neutral-500" : "text-white"
                  }`}
                >
                  {adding ? "Adding..." : "Add to cart"}
                </Text>
              </TouchableOpacity>

              {/* Buy Now */}
              <TouchableOpacity
                onPress={async () => {
                  await handleAddToCart();
                  router.push("/(app)/cart");
                }}
                disabled={product.stock <= 0}
                className={`py-4 px-4 rounded-xl items-center justify-center border border-neutral-200 ${
                  product.stock <= 0 ? "bg-neutral-100" : "bg-white"
                }`}
              >
                <Text className="text-base font-semibold">Buy</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
