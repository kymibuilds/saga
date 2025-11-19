import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft, Plus, Minus, Trash2 } from "lucide-react-native";
import { router } from "expo-router";
import { useUser } from "@clerk/clerk-expo";

import {
  getCart,
  updateQuantity,
  removeFromCart,
} from "@/api/cart";

export default function Cart() {
  const { user } = useUser();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  /* -------------------------
       LOAD CART ON MOUNT
  -------------------------- */
  useEffect(() => {
    if (user) loadCart();
  }, [user]);

  async function loadCart() {
    setLoading(true);
    const items = await getCart(user.id);
    setCart(items || []);
    setLoading(false);
  }

  /* -------------------------
      UPDATE QUANTITY
  -------------------------- */
  async function handleQty(id, delta, currentQty) {
    const newQty = currentQty + delta;

    if (newQty <= 0) {
      await removeFromCart(user.id, id);
      setCart((prev) => prev.filter((item) => item.product_id !== id));
      return;
    }

    await updateQuantity(user.id, id, newQty);

    setCart((prev) =>
      prev.map((item) =>
        item.product_id === id ? { ...item, qty: newQty } : item
      )
    );
  }

  /* -------------------------
      REMOVE ITEM
  -------------------------- */
  async function handleRemove(id) {
    await removeFromCart(user.id, id);
    setCart((prev) => prev.filter((item) => item.product_id !== id));
  }

  /* -------------------------
      TOTALS
  -------------------------- */
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const shipping = subtotal > 0 ? 6.99 : 0;
  const total = subtotal + shipping;

  /* -------------------------
           UI
  -------------------------- */

  return (
    <SafeAreaView className="flex-1 bg-white px-6 pt-6 pb-40">
      
      {/* HEADER */}
      <View className="flex flex-row items-center mb-6">
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() =>
            router.canGoBack()
              ? router.back()
              : router.push("/(app)/home")
          }
        >
          <ArrowLeft size={28} strokeWidth={2.4} color="black" />
        </TouchableOpacity>

        <Text className="text-5xl font-semibold tracking-tighter ml-4">
          Cart
        </Text>
      </View>

      {/* EMPTY STATE */}
      {!loading && cart.length === 0 && (
        <View className="mt-20 items-center">
          <Text className="text-neutral-500 text-base">
            Your cart is empty
          </Text>
        </View>
      )}

      {/* CART LIST */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: cart.length > 0 ? 280 : 100,
        }}
      >
        {cart.map((item) => (
          <View
            key={item.product_id}
            className="bg-white rounded-xl border border-neutral-200 p-4 mb-4"
          >
            <View className="flex flex-row gap-4">
              <Image
                source={{ uri: item.image_url }}
                className="w-20 h-20 rounded-xl"
                resizeMode="cover"
              />

              <View className="flex-1 justify-center">
                <Text className="text-base font-semibold text-neutral-900">
                  {item.name}
                </Text>
                <Text className="text-lg font-bold text-black mt-1">
                  ${item.price}
                </Text>
              </View>

              {/* REMOVE */}
              <TouchableOpacity
                onPress={() => handleRemove(item.product_id)}
                activeOpacity={0.9}
                className="self-start"
              >
                <Trash2 size={20} color="#525252" strokeWidth={2.5} />
              </TouchableOpacity>
            </View>

            {/* Divider */}
            <View className="border-t border-neutral-200 my-3" />

            {/* Quantity Controls */}
            <View className="flex flex-row items-center justify-between">
              <View className="flex flex-row items-center gap-3">
                <TouchableOpacity
                  onPress={() =>
                    handleQty(item.product_id, -1, item.qty)
                  }
                  activeOpacity={0.9}
                  className="w-10 h-10 bg-neutral-50 border border-neutral-300 items-center justify-center rounded-xl"
                >
                  <Minus size={18} color="black" strokeWidth={2.5} />
                </TouchableOpacity>

                <Text className="text-base font-semibold text-black min-w-[20px] text-center">
                  {item.qty}
                </Text>

                <TouchableOpacity
                  onPress={() =>
                    handleQty(item.product_id, 1, item.qty)
                  }
                  activeOpacity={0.9}
                  className="w-10 h-10 bg-black items-center justify-center rounded-xl"
                >
                  <Plus size={18} color="white" strokeWidth={2.5} />
                </TouchableOpacity>
              </View>

              <Text className="text-lg font-bold text-black">
                ${(item.price * item.qty).toFixed(2)}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* TOTAL SECTION */}
      {cart.length > 0 && (
        <View className="absolute bottom-20 left-0 right-0 bg-white px-6 pb-6 pt-4 border-t border-neutral-200">
          <View className="flex flex-row justify-between mb-2">
            <Text className="text-neutral-600 text-base">Subtotal</Text>
            <Text className="text-black font-semibold text-base">
              ${subtotal.toFixed(2)}
            </Text>
          </View>

          <View className="flex flex-row justify-between mb-3">
            <Text className="text-neutral-600 text-base">Shipping</Text>
            <Text className="text-black font-semibold text-base">
              ${shipping.toFixed(2)}
            </Text>
          </View>

          <View className="border-t border-neutral-200 my-3" />

          <View className="flex flex-row justify-between mb-5">
            <Text className="text-xl font-bold text-black">Total</Text>
            <Text className="text-xl font-bold text-black">
              ${total.toFixed(2)}
            </Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.9}
            className="bg-black rounded-xl py-4"
          >
            <Text className="text-center text-white text-base font-semibold">
              Proceed to Checkout
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}
