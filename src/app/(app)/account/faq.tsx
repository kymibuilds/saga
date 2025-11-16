import { View, Text, TouchableOpacity, LayoutAnimation, Platform, UIManager } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft, ChevronDown } from "lucide-react-native";
import { router } from "expo-router";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

const faqData = [
  {
    q: "How can I track my order?",
    a: "You can track your order from the 'My Orders' section. Each order shows its status and expected delivery date."
  },
  {
    q: "How can I change my account details?",
    a: "Go to 'My Details' inside the Account section to update your profile, email, or phone number."
  },
  {
    q: "Can I cancel my order?",
    a: "Orders can be canceled within 24 hours of placing them unless already shipped."
  },
  {
    q: "What payment methods do you support?",
    a: "We support all major cards, UPI, Net Banking, and popular wallets."
  },
  {
    q: "How do I contact support?",
    a: "You can reach our support team from the 'Help & Support' button inside the app."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <SafeAreaView className="flex-1 bg-neutral-50">
      <View className="px-6 pt-4 flex-1">

        {/* Header */}
        <View className="relative flex items-center mb-6">
          <TouchableOpacity
            className="absolute left-0"
            onPress={() => {
              if (router.canGoBack()) router.back();
              else router.push("/(app)/account");
            }}
          >
            <ArrowLeft size={30} strokeWidth={2.3} color="black" />
          </TouchableOpacity>

          <Text className="text-4xl font-bold tracking-tight text-black">
            FAQ
          </Text>
        </View>

        {/* FAQ LIST */}
        <View className="flex-1">
          {faqData.map((item, i) => {
            const isOpen = openIndex === i;

            return (
              <View key={i} className="mb-4">
                
                {/* Question */}
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => toggle(i)}
                  className="flex flex-row items-center justify-between py-4"
                >
                  <Text className="text-lg font-medium text-black flex-1 pr-6">
                    {item.q}
                  </Text>

                  <ChevronDown
                    size={22}
                    strokeWidth={2}
                    color="black"
                    style={{
                      transform: [{ rotate: isOpen ? "180deg" : "0deg" }],
                    }}
                  />
                </TouchableOpacity>

                {/* Answer */}
                {isOpen && (
                  <Text className="text-neutral-600 leading-6 pl-1 pr-4 pb-2">
                    {item.a}
                  </Text>
                )}

                {/* Divider */}
                <View className="h-px bg-neutral-200 mt-2" />
              </View>
            );
          })}
        </View>

      </View>
    </SafeAreaView>
  );
}
