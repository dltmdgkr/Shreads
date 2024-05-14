import { PostWithProfiles } from "@/app/(afterLogin)/(home)/_lib/getFollowingPosts";
import { TypedSupabaseClient } from "@/utils/types";

export async function getSinglePost(
  client: TypedSupabaseClient,
  postId: string
) {
  const { data, error } = await client
    .from("posts")
    .select("*, profiles (*)")
    .eq("id", postId)
    .single();

  if (error || !data) {
    throw new Error("Failed to fetch post");
  }

  return data as PostWithProfiles;
}
