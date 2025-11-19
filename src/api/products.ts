import { supabase } from "@/lib/supabase";

export async function fetchProducts() {
  return await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });
}
