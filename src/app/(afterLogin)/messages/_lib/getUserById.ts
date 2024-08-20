"use server";

import { createServerSupabaseClient } from "@/utils/supabase/server";

export async function getUserById(userId: string) {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    return null;
  }

  return {
    id: data.id,
    user_name: data.user_name,
    email: data.email,
    avatar_url: data.avatar_url,
  };
}
