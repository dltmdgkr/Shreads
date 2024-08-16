"use server";

import { Post } from "@/model/Post";
import { createServerSupabaseClient } from "@/utils/supabase/server";

export async function getRepostedPosts(userId: string) {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("reposts")
    .select("post_id, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching reposted posts:", error);
    throw new Error("Failed to fetch reposted posts");
  }

  const postIds = data.map((repost) => repost.post_id);

  const { data: posts, error: postsError } = await supabase
    .from("posts")
    .select("*, profiles (*), postImages (*), comments (*)")
    .in("id", postIds)
    .returns<Post[]>();

  if (postsError) {
    console.error("Error fetching posts:", postsError);
    throw new Error("Failed to fetch posts");
  }

  const sortedPosts = postIds
    .map((postId) => posts.find((post) => post.id === postId))
    .filter((post): post is Post => post !== undefined);

  return sortedPosts;
}
