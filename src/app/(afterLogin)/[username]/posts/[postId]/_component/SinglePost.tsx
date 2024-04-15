"use client";

import { useQuery } from "@tanstack/react-query";
import { getSinglePost } from "../_lib/getSinglePost";
import Post from "@/app/(afterLogin)/_component/Post";
import { Post as IPost } from "@/model/Post";

export default function SinglePost({ postId }: { postId: string }) {
  const { data: post } = useQuery<
    IPost,
    Object,
    IPost,
    [_1: string, _2: string]
  >({
    queryKey: ["posts", postId],
    queryFn: getSinglePost,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });
  if (!post) {
    return null;
  }
  return <Post key={post.postId} post={post} />;
}
