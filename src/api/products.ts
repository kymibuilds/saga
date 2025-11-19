import { supabase } from "@/lib/supabase";

export async function fetchProducts() {
  return await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });
}

export async function fetchProductById(id: string) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  return { data, error };
}
