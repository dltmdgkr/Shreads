"use server";

import { createServerSupabaseClient } from "@/utils/supabase/server";

export async function followUser(
  followedId: string,
  followerId: string,
  isFollowing: boolean | null
) {
  const supabase = await createServerSupabaseClient();

  if (isFollowing) {
    await supabase.from("follows").insert([
      {
        followed_id: followedId,
        follower_id: followerId,
      },
    ]);
  } else {
    await supabase
      .from("follows")
      .delete()
      .eq("followed_id", followedId)
      .eq("follower_id", followerId);
  }
}
