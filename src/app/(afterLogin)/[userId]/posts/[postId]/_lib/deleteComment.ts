"use server";

import { createServerSupabaseClient } from "@/utils/supabase/server";

export async function deleteComment(
  commentId: number,
  userId: string | undefined
) {
  const supabase = await createServerSupabaseClient();

  if (!userId) {
    console.error("User ID is undefined. Cannot delete comment.");
    return null;
  }

  const { error } = await supabase
    .from("comments")
    .delete()
    .eq("id", commentId)
    .eq("user_id", userId);

  if (error) {
    console.error("Error deleting comment:", error.message);
    return null;
  }
}
