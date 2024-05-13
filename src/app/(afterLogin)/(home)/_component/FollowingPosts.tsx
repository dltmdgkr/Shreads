"use client";

import { useQuery } from "@tanstack/react-query";
import Post from "../../_component/Post";
import { getFollowingPosts } from "../_lib/getFollowingPosts";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function FollowingPosts() {
  const supabase = createClientComponentClient();

  const { data } = useQuery({
    queryKey: ["posts", "followings"],
    queryFn: () => getFollowingPosts(supabase),
    staleTime: 60 * 1000,
  });

  if (!data || !data.data) return null;

  const posts = data.data || [];

  return posts.map((post) => <Post key={post.id} post={post} />);
}
