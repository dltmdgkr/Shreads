"use server";

import { createServerSupabaseClient } from "@/utils/supabase/server";

export async function deletePost(postId: number, userId: string | undefined) {
  const supabase = await createServerSupabaseClient();

  if (!userId) {
    console.error("User ID is undefined. Cannot delete post.");
    return null;
  }

  const { error } = await supabase
    .from("posts")
    .delete()
    .eq("id", postId)
    // .eq("user_id", userId);
    .maybeSingle();

  if (error) {
    console.error("Error deleting post:", error.message);
    return null;
  }
}
