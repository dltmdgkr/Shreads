import { Comment } from "@/model/Comment";
import { TypedSupabaseClient } from "@/utils/types";

export async function getComments(client: TypedSupabaseClient, postId: string) {
  return await client
    .from("comments")
    .select("*, profiles (*), commentImages (*)")
    .eq("post_id", postId)
    .returns<Comment[]>();
}
