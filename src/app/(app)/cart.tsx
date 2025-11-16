import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft, Plus, Minus, Trash } from "lucide-react-native";

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

  const updateQty = (id: string, delta: number) => {
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

  const removeItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = subtotal > 0 ? 6.99 : 0;
  const total = subtotal + shipping;

  return (
    <SafeAreaView className="flex-1 bg-neutral-50">
      <View className="px-6 pt-4 flex-1">

        {/* Header */}
        <View className="relative flex items-center mb-6">
          <Text className="text-4xl font-bold tracking-tight text-black">
            Cart
          </Text>
        </View>

        {/* CART LIST */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
        >
          {cart.map((item) => (
            <View
              key={item.id}
              className="bg-white rounded-2xl p-4 mb-5 shadow-sm"
            >
              <View className="flex flex-row gap-4">
                <Image
                  source={item.image}
                  className="w-20 h-20 rounded-xl"
                  resizeMode="cover"
                />

                <View className="flex-1 justify-center">
                  <Text className="text-lg font-semibold text-black">
                    {item.name}
                  </Text>
                  <Text className="text-neutral-800 font-medium mt-1">
                    ${item.price}
                  </Text>
                </View>

                {/* REMOVE */}
                <TouchableOpacity onPress={() => removeItem(item.id)}>
                  <Trash size={22} color="#444" strokeWidth={1.8} />
                </TouchableOpacity>
              </View>

              {/* Quantity Controls */}
              <View className="flex flex-row items-center justify-between mt-4">
                <View className="flex flex-row items-center gap-3">

                  <TouchableOpacity
                    onPress={() => updateQty(item.id, -1)}
                    className="w-10 h-10 bg-neutral-200 items-center justify-center rounded-xl"
                  >
                    <Minus size={18} color="black" />
                  </TouchableOpacity>

                  <Text className="text-lg font-semibold">{item.qty}</Text>

                  <TouchableOpacity
                    onPress={() => updateQty(item.id, 1)}
                    className="w-10 h-10 bg-black items-center justify-center rounded-xl"
                  >
                    <Plus size={18} color="white" />
                  </TouchableOpacity>

                </View>

                <Text className="text-lg font-semibold text-black">
                  ${item.price * item.qty}
                </Text>
              </View>
            </View>
          ))}

          {/* If empty */}
          {cart.length === 0 && (
            <View className="mt-20 items-center">
              <Text className="text-neutral-600 text-lg">Your cart is empty</Text>
            </View>
          )}
        </ScrollView>

        {/* TOTAL SECTION */}
        {cart.length > 0 && (
          <View className="absolute bottom-0 left-0 right-0 bg-white p-6 border-t border-neutral-200">
            <View className="flex flex-row justify-between mb-2">
              <Text className="text-neutral-600">Subtotal</Text>
              <Text className="text-black font-medium">${subtotal.toFixed(2)}</Text>
            </View>

            <View className="flex flex-row justify-between mb-3">
              <Text className="text-neutral-600">Shipping</Text>
              <Text className="text-black font-medium">${shipping.toFixed(2)}</Text>
            </View>

            <View className="h-px bg-neutral-200 my-2" />

            <View className="flex flex-row justify-between mb-5">
              <Text className="text-xl font-semibold text-black">Total</Text>
              <Text className="text-xl font-semibold text-black">
                ${total.toFixed(2)}
              </Text>
            </View>

            {/* Checkout Button */}
            <TouchableOpacity
              activeOpacity={0.9}
              className="bg-black rounded-xl py-4"
            >
              <Text className="text-center text-white text-lg font-semibold">
                Proceed to Checkout
              </Text>
            </TouchableOpacity>
          </View>
        )}

      </View>
    </SafeAreaView>
  );
}
