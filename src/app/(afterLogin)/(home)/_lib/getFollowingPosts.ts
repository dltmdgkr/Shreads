"use server";

import { Post } from "@/model/Post";
import { createServerSupabaseClient } from "@/utils/supabase/server";

export async function getFollowingPosts() {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("posts")
    .select("*, profiles (*), postImages (*), comments (*)")
    .returns<Post[]>()
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
    console.error("getFollowingPosts 에러발생", error.message);
  }

  return data;
}
