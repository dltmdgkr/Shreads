"use server";

import { createServerSupabaseClient } from "@/utils/supabase/server";

export async function getAllUsers() {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase.from("profiles").select("*");

  if (error) {
    return null;
  }

  if (error) {
    return [];
  }

  return data.map((user) => ({
    id: user.id,
    user_name: user.user_name,
    email: user.email,
    avatar_url: user.avatar_url,
  }));
}
