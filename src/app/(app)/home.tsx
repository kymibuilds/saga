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
import { fetchProducts } from "@/api/products";
import { useUser } from "@clerk/clerk-expo";
import {
  getSavedProducts,
  saveProduct,
  removeSavedProduct,
} from "@/api/saved";

const categories = ["All", "TShirts", "Hoodies", "Jeans", "Shoes", "Accessories"];

const Home = () => {
  const [active, setActive] = React.useState("All");
  const [products, setProducts] = React.useState([]);
  const [savedIds, setSavedIds] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const { user } = useUser();

  /* Load Products */
  React.useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    const { data } = await fetchProducts();
    setProducts(data || []);
    setLoading(false);
  }

  /* Load Saved Items */
  React.useEffect(() => {
    if (user && products.length > 0) {
      loadSaved();
    }
  }, [user, products]);

  async function loadSaved() {
    const ids = await getSavedProducts(user.id);
    setSavedIds(ids.map(String));
  }

  /* Toggle Favorite */
  async function toggleFavorite(productId: string) {
    if (!user) return;

    const isSaved = savedIds.includes(productId);

    if (isSaved) {
      await removeSavedProduct(user.id, productId);
      setSavedIds((prev) => prev.filter((id) => id !== productId));
    } else {
      await saveProduct(user.id, productId);
      setSavedIds((prev) => [...prev, productId]);
    }
  }

  const filtered =
    active === "All" ? products : products.filter((p) => p.category === active);

  /* UI */
  return (
    <SafeAreaView className="flex-1 bg-white px-6 py-6">
      {/* Header */}
      <View className="flex flex-row items-center justify-between mb-6">
        <Text className="text-5xl font-bold tracking-tighter">Discover</Text>
        <TouchableOpacity
          className="p-2"
          onPress={() => router.push("/(app)/notifications")}
        >
          <Bell size={28} strokeWidth={2.5} color="black" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View className="flex flex-row items-center gap-2 mb-6">
        <View className="flex-1 h-14 flex-row items-center bg-white rounded-xl px-4 border border-neutral-200">
          <TextInput
            placeholder="Search for clothes ..."
            placeholderTextColor="#9CA3AF"
            className="flex-1 text-black text-base"
          />
        </View>

        <TouchableOpacity className="h-14 w-14 bg-black rounded-xl items-center justify-center">
          <Settings2 color="white" size={22} strokeWidth={2} />
        </TouchableOpacity>
      </View>

      {/* Category Bar */}
      <View className="mb-4 -mx-6">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 6, paddingLeft: 24, paddingRight: 24 }}
        >
          {categories.map((item) => (
            <TouchableOpacity
              key={item}
              onPress={() => setActive(item)}
              className={`px-5 py-2 rounded-xl ${
                active === item
                  ? "bg-black"
                  : "bg-white border border-neutral-200"
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

      {/* Products */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="flex flex-row flex-wrap justify-between">
          {filtered.map((prod) => (
            <TouchableOpacity key={prod.id} className="w-[48%] mb-4"
            onPress={() => router.push(`/(app)/product/${prod.id}`)}
            >
              <View className="bg-white rounded-xl overflow-hidden border border-neutral-200">
                <View className="relative">
                  <Image
                    source={{ uri: prod.image_url }}
                    className="w-full h-48"
                    resizeMode="cover"
                  />

                  <TouchableOpacity
                    onPress={() => toggleFavorite(prod.id)}
                    className="absolute top-3 right-3 bg-white rounded-full p-2"
                  >
                    <Heart
                      size={18}
                      color={
                        savedIds.includes(prod.id) ? "#ef4444" : "#525252"
                      }
                      fill={
                        savedIds.includes(prod.id)
                          ? "#ef4444"
                          : "transparent"
                      }
                      strokeWidth={2.5}
                    />
                  </TouchableOpacity>
                </View>

                <View className="border-tb border-neutral-200" />

                <View className="p-3">
                  <Text className="text-base font-semibold text-neutral-900 truncate">
                    {prod.name}
                  </Text>
                  <Text className="text-lg font-bold text-black mt-1">
                    ${prod.price}
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
