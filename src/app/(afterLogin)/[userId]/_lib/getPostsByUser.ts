"use server";

import { Post } from "@/model/Post";
import { createServerSupabaseClient } from "@/utils/supabase/server";

export async function getPostsByUser({ userId }: { userId: string }) {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("posts")
    .select("*, profiles (*), postImages (*), comments (*)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .returns<Post[]>();

  if (error) {
    console.error("getPostsByUser error", error);
    return [];
  }

  return data;
}
