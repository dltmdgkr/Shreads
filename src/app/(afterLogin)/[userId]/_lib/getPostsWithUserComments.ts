"use server";

import { Post } from "@/model/Post";
import { createServerSupabaseClient } from "@/utils/supabase/server";

export async function getPostsWithComments() {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("posts")
    .select(
      `
      *,
      profiles (*),
      postImages (*),
      comments (
        *,
        profiles (*),
        commentImages (*)
      )
    `
    )
    .order("created_at", { ascending: false })
    .returns<Post[]>();

  if (error) {
    console.error("getPostsWithComments error", error);
    return [];
  }

  return data;
}
