"use server";

import {
  createServerSupabaseAdminClient,
  createServerSupabaseClient,
} from "@/utils/supabase/server";

export async function getUserById(userId: string) {
  // const supabase = await createServerSupabaseAdminClient();
  const supabase = await createServerSupabaseClient();

  // const { data, error } = await supabase.auth.admin.getUserById(userId);
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    return null;
  }

  return {
    // id: data.user.id,
    // user_name: data.user.user_metadata?.user_name,
    // email: data.user.email,
    // avatar_url: data.user.user_metadata?.avatar_url,

    id: data.id,
    user_name: data.user_name,
    email: data.email,
    avatar_url: data.avatar_url,
  };
}
