import { supabase } from "@/lib/supabase";

export async function getSavedProducts(userId: string) {
  const { data, error } = await supabase
    .from("saved_products")
    .select("product_id")
    .eq("user_id", userId);

  if (error || !data) return [];
  return data.map((item) => item.product_id);
}

export async function saveProduct(userId: string, productId: string) {
  return await supabase
    .from("saved_products")
    .insert({
      user_id: userId,
      product_id: productId,
    })
    .select();
}

export async function removeSavedProduct(userId: string, productId: string) {
  return await supabase
    .from("saved_products")
    .delete()
    .eq("user_id", userId)
    .eq("product_id", productId)
    .select();
}
