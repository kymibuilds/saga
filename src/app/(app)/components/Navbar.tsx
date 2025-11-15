import { View, TouchableOpacity, Text } from "react-native";
import { Home, Search, Heart, ShoppingCart, User } from "lucide-react-native";
import { router, usePathname } from "expo-router";

export default function Navbar() {
  const path = usePathname();

  const navItems = [
    { name: "Home", route: "/(app)/home", icon: Home },
    { name: "Search", route: "/(app)/search", icon: Search },
    { name: "Saved", route: "/(app)/saved", icon: Heart },
    { name: "Cart", route: "/(app)/cart", icon: ShoppingCart },
    { name: "Account", route: "/(app)/account", icon: User },
  ];

  return (
    <View className="flex flex-row justify-around items-center bg-white border-t border-neutral-300 h-24 pb-4">
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = path === item.route;

        return (
          <TouchableOpacity
            key={item.route}
            onPress={() => router.replace(item.route)}
            className="items-center justify-center"
          >
            <Icon
              size={26}
              strokeWidth={active ? 3 : 2}
              color={active ? "black" : "#777"}
            />
            <Text className={`text-xs mt-1 ${active ? "text-black" : "text-neutral-500"}`}>
              {item.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
