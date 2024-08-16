import { Comment } from "@/model/Comment";
import { TypedSupabaseClient } from "@/utils/types";

export async function getSingleComment(
  client: TypedSupabaseClient,
  commentId: string
) {
  const { data, error } = await client
    .from("comments")
    .select("*, profiles (*), commentImages (*)")
    .eq("id", commentId)
    .maybeSingle();

  if (error || !data) {
    throw new Error("Failed to fetch post");
  }

  return data as Comment;
}
