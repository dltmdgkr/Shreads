import { Post } from "@/model/Post";
import { TypedSupabaseClient } from "@/utils/types";

export async function getSinglePost(
  client: TypedSupabaseClient,
  postId: string
) {
  const { data, error } = await client
    .from("posts")
    .select("*, profiles (*), postImages (*)")
    .eq("id", postId)
    .single();

  if (error || !data) {
    throw new Error("Failed to fetch post");
  }

  return data as Post;
}
