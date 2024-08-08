"use server";

import { createServerSupabaseClient } from "@/utils/supabase/server";

export async function isFollowingUser(userId: string, currentUserId: string) {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("follows")
    .select("*")
    .eq("follower_id", currentUserId) // 현재 로그인한 사용자의 ID
    .eq("followed_id", userId) // 팔로우하려는 사용자의 ID
    .maybeSingle();

  if (error) {
    console.error("Error fetching follow status:", error);
  }

  return !!data;
}
