"use server";

import { createServerSupabaseAdminClient } from "@/utils/supabase/server";

export async function getAllUsers() {
  const supabase = await createServerSupabaseAdminClient();

  const { data, error } = await supabase.auth.admin.listUsers();

  if (error) {
    return [];
  }

  return data.users.map((user) => ({
    id: user.id,
    user_name: user.user_metadata.user_name,
    email: user.email,
    avatar_url: user.user_metadata.avatar_url,
  }));
}
