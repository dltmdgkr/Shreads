"use server";

import { createServerSupabaseClient } from "@/utils/supabase/server";

export async function followUser(
  followedId: string,
  followerId: string,
  isFollowing: boolean
) {
  const supabase = await createServerSupabaseClient();

  if (isFollowing) {
    const { error } = await supabase.from("follows").insert([
      {
        followed_id: followedId,
        follower_id: followerId,
      },
    ]);
    if (error) console.error("Error inserting follow:", error);
  } else {
    const { error } = await supabase
      .from("follows")
      .delete()
      .eq("followed_id", followedId)
      .eq("follower_id", followerId);
    if (error) console.error("Error deleting follow:", error);
  }
}
