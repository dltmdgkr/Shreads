"use client";

import { useQuery } from "@tanstack/react-query";
import { getPostRecommends } from "../_lib/getPostRecommends";
import Post from "../../_component/Post";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function PostRecommends() {
  const supabase = createClientComponentClient();

  const { data } = useQuery({
    queryKey: ["posts", "recommends"],
    queryFn: () => getPostRecommends(supabase),
    staleTime: 60 * 1000,
  });

  if (!data || !data.data) return null;

  const posts = data.data || [];

  return posts.map((post) => <Post key={post.id} post={post} />);
}
