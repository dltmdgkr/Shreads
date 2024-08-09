"use server";

import { createServerSupabaseClient } from "@/utils/supabase/server";

export async function getFollowingUsers(userId: string) {
  const supabase = await createServerSupabaseClient();

  if (!userId || userId.trim() === "") {
    console.error("Invalid user ID:", userId);
    return [];
  }

  const { data, error } = await supabase
    .from("follows")
    .select("followed_id")
    .eq("follower_id", userId);

  if (error) {
    console.error("Error fetching following user IDs:", error);
    return [];
  }

  return data ? data.map((follow) => follow.followed_id) : [];
}
