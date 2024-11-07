import { supabase } from "./supabase";

export const apiGetServiceById = async (id) => {
  let { data, error } = await supabase
    .from("prices")
    .select("*")
    .eq("id", id)
    .single();

  return { data, error };
};
