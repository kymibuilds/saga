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
    <View className="absolute bottom-0 left-0 right-0 flex flex-row justify-around items-center bg-white border-t border-neutral-200 h-20 pb-2">
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = path === item.route || path.includes(item.route.split('/').pop());
        return (
          <TouchableOpacity
            key={item.route}
            onPress={() => router.push(item.route)}
            className="items-center justify-center py-2"
          >
            <Icon
              size={24}
              strokeWidth={active ? 2.5 : 1.5}
              color={active ? "#000000" : "#9CA3AF"}
            />
            <Text
              className={`text-[10px] mt-1 ${
                active ? "text-black font-semibold" : "text-gray-400"
              }`}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}