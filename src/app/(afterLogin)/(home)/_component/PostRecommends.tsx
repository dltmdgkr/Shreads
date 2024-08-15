"use client";

import { useQuery } from "@tanstack/react-query";
import { getPostRecommends } from "../_lib/getPostRecommends";
import Post from "../../_component/Post";

export default function PostRecommends() {
  const { data } = useQuery({
    queryKey: ["posts", "recommends"],
    queryFn: () => getPostRecommends(),
    staleTime: 60 * 1000,
  });

  const posts = Array.isArray(data) ? data : [];

  return posts.map((post) => <Post key={post.id} post={post} />);
}
