"use server";

import { Post } from "@/model/Post";
import { createServerSupabaseClient } from "@/utils/supabase/server";

export async function getSinglePost(postId: string) {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("posts")
    .select("*, profiles (*), postImages (*), comments (*)")
    .eq("id", postId)
    .maybeSingle();

  if (error || !data) {
    throw new Error("Failed to fetch post");
  }

  return data as Post;
}
