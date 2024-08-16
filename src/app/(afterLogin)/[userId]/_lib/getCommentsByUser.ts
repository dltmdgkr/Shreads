"use server";

import { Comment } from "@/model/Comment";
import { createServerSupabaseClient } from "@/utils/supabase/server";

export async function getCommentsByUser({ userId }: { userId: string }) {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("comments")
    .select("*, profiles (*), commentImages (*)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .returns<Comment[]>();

  if (error) {
    console.error("getPostsByUser error", error);
    return [];
  }

  return data;
}
