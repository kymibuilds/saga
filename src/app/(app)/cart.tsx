import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft, Plus, Minus, Trash2 } from "lucide-react-native";
import { router } from "expo-router";

/* ------------------------
   MOCK CART DATA
------------------------- */
const initialCart = [
  {
    id: "1",
    name: "Classic Tee",
    price: 29,
    qty: 1,
    image: { uri: "https://source.unsplash.com/400x500/?tshirt" },
  },
  {
    id: "2",
    name: "Cozy Hoodie",
    price: 49,
    qty: 1,
    image: { uri: "https://source.unsplash.com/400x500/?hoodie" },
  },
];

export default function Cart() {
  const [cart, setCart] = useState(initialCart);

  const updateQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, qty: Math.max(1, item.qty + delta) }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = subtotal > 0 ? 6.99 : 0;
  const total = subtotal + shipping;

  return (
    <SafeAreaView className="flex-1 bg-white px-6 pt-6 pb-40">
      
      {/* Header */}
      <View className="flex flex-row items-center mb-6">
        <Text className="text-5xl font-semibold tracking-tighter">Cart</Text>
      </View>

      {/* CART LIST */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: cart.length > 0 ? 280 : 100 }}
      >
        {cart.map((item) => (
          <View
            key={item.id}
            className="bg-white rounded-xl border border-neutral-200 p-4 mb-4"
          >
            <View className="flex flex-row gap-4">
              <Image
                source={item.image}
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
                onPress={() => removeItem(item.id)}
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
                  onPress={() => updateQty(item.id, -1)}
                  activeOpacity={0.9}
                  className="w-10 h-10 bg-neutral-50 border border-neutral-300 items-center justify-center rounded-xl"
                >
                  <Minus size={18} color="black" strokeWidth={2.5} />
                </TouchableOpacity>

                <Text className="text-base font-semibold text-black min-w-[20px] text-center">
                  {item.qty}
                </Text>

                <TouchableOpacity
                  onPress={() => updateQty(item.id, 1)}
                  activeOpacity={0.9}
                  className="w-10 h-10 bg-black items-center justify-center rounded-xl"
                >
                  <Plus size={18} color="white" strokeWidth={2.5} />
                </TouchableOpacity>

              </View>

              <Text className="text-lg font-bold text-black">
                ${item.price * item.qty}
              </Text>
            </View>
          </View>
        ))}

        {/* If empty */}
        {cart.length === 0 && (
          <View className="mt-20 items-center">
            <Text className="text-neutral-500 text-base">Your cart is empty</Text>
          </View>
        )}
      </ScrollView>

      {/* TOTAL SECTION ABOVE NAVBAR */}
      {cart.length > 0 && (
        <View className="absolute bottom-20 left-0 right-0 bg-white px-6 pb-6 pt-4 border-t border-neutral-200">
          <View className="flex flex-row justify-between mb-2">
            <Text className="text-neutral-600 text-base">Subtotal</Text>
            <Text className="text-black font-semibold text-base">${subtotal.toFixed(2)}</Text>
          </View>

          <View className="flex flex-row justify-between mb-3">
            <Text className="text-neutral-600 text-base">Shipping</Text>
            <Text className="text-black font-semibold text-base">${shipping.toFixed(2)}</Text>
          </View>

          <View className="border-t border-neutral-200 my-3" />

          <View className="flex flex-row justify-between mb-5">
            <Text className="text-xl font-bold text-black">Total</Text>
            <Text className="text-xl font-bold text-black">
              ${total.toFixed(2)}
            </Text>
          </View>

          {/* Checkout Button */}
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
