"use server";

import { createServerSupabaseClient } from "@/utils/supabase/server";

export async function searchUsers(search = "") {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .like("user_name", `%${search}%`);

  if (error) {
    return null;
  }

  return data;
}
