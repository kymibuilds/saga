// api/cart.ts
import { supabase } from "@/lib/supabase";

/* --------------------------------------------------
   GET CART FOR USER
--------------------------------------------------- */
export async function getCart(userId: string) {
  const { data, error } = await supabase
    .from("cart")
    .select("product_id, quantity")
    .eq("user_id", userId);

  if (error || !data) return [];
  return data; // [{product_id, quantity}, ...]
}

/* --------------------------------------------------
   ADD TO CART
   - If item exists → increase quantity by 1
   - If not        → insert new row
--------------------------------------------------- */
export async function addToCart(userId: string, productId: string) {
  // Check if item already exists
  const { data: existing } = await supabase
    .from("cart")
    .select("*")
    .eq("user_id", userId)
    .eq("product_id", productId)
    .maybeSingle();

  if (existing) {
    // Increase quantity
    const { data, error } = await supabase
      .from("cart")
      .update({ quantity: existing.quantity + 1 })
      .eq("id", existing.id)
      .select();

    return { data, error };
  }

  // Insert new row if it doesn't exist
  const { data, error } = await supabase
    .from("cart")
    .insert({
      user_id: userId,
      product_id: productId,
      quantity: 1,
    })
    .select();

  return { data, error };
}

/* --------------------------------------------------
   UPDATE QUANTITY (manual +/-)
--------------------------------------------------- */
export async function updateQuantity(
  userId: string,
  productId: string,
  quantity: number
) {
  if (quantity <= 0) {
    return removeFromCart(userId, productId);
  }

  const { data, error } = await supabase
    .from("cart")
    .update({ quantity })
    .eq("user_id", userId)
    .eq("product_id", productId)
    .select();

  return { data, error };
}

/* --------------------------------------------------
   REMOVE ITEM FROM CART
--------------------------------------------------- */
export async function removeFromCart(userId: string, productId: string) {
  const { data, error } = await supabase
    .from("cart")
    .delete()
    .eq("user_id", userId)
    .eq("product_id", productId)
    .select();

  return { data, error };
}
