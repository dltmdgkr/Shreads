"use client";

import { useQuery } from "@tanstack/react-query";
import { getSinglePost } from "../_lib/getSinglePost";
import Post from "@/app/(afterLogin)/_component/Post";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function SinglePost({
  postId,
  userId,
}: {
  postId: string;
  userId: string | undefined;
}) {
  const supabase = createClientComponentClient();

  const { data: post } = useQuery({
    queryKey: ["posts", postId],
    queryFn: () => getSinglePost(supabase, postId),
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  if (!post) return null;

  return <Post key={post.id} post={post} userId={userId} />;
}
