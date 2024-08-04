"use server";

import { createServerSupabaseAdminClient } from "@/utils/supabase/server";

export async function getUserById(userId: string) {
  const supabase = await createServerSupabaseAdminClient();

  const { data, error } = await supabase.auth.admin.getUserById(userId);

  if (error) {
    return null;
  }

  return {
    id: data.user.id,
    user_name: data.user.user_metadata?.user_name,
    email: data.user.email,
    avatar_url: data.user.user_metadata?.avatar_url,
  };
}
