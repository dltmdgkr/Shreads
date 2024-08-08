"use server";

import { createServerSupabaseClient } from "@/utils/supabase/server";

export async function getFollowerCount(userId: string): Promise<number> {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("follows")
    .select("id", { count: "exact" })
    .eq("followed_id", userId);

  if (error) {
    console.error("Error fetching follower count:", error.message);
    return 0;
  }

  return data?.length ?? 0;
}
