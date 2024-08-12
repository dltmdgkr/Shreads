"use client";

import { useQuery } from "@tanstack/react-query";
import { getPostRecommends } from "../_lib/getPostRecommends";
import Post from "../../_component/Post";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function PostRecommends() {
  const supabase = createClientComponentClient();

  const { data } = useQuery({
    queryKey: ["posts", "recommends"],
    queryFn: () => getPostRecommends(),
    staleTime: 60 * 1000,
  });

  const posts = data || [];

  return posts.map((post) => <Post key={post.id} post={post} />);
}
