"use server";

import { createServerSupabaseClient } from "@/utils/supabase/server";

export async function repostPost(
  userId: string,
  postId: number,
  reposted: boolean
) {
  const supabase = await createServerSupabaseClient();

  if (reposted) {
    const { error } = await supabase
      .from("reposts")
      .insert([{ user_id: userId, post_id: postId }]);

    if (error) {
      console.error("Error creating repost:", error);
      throw new Error("Repost failed");
    }
  } else {
    const { error } = await supabase
      .from("reposts")
      .delete()
      .eq("user_id", userId)
      .eq("post_id", postId);

    if (error) {
      console.error("Error deleting repost:", error);
      throw error;
    }
  }

  const { count: repostCount, error: repostCountError } = await supabase
    .from("reposts")
    .select("*", { count: "exact", head: true })
    .eq("post_id", postId);

  if (repostCountError) {
    console.error("Error fetching repost count:", repostCountError);
    throw repostCountError;
  }

  const { error: updatePostError } = await supabase
    .from("posts")
    .update({ repost_count: repostCount })
    .eq("id", postId);

  if (updatePostError) {
    console.error("Error updating post repost count:", updatePostError);
    throw updatePostError;
  }
}
