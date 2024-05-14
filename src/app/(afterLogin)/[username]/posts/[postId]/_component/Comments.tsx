"use client";

import { useQuery } from "@tanstack/react-query";
import Comment from "./Comment";
import { getComments } from "../_lib/getComments";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function Comments({ postId }: { postId: string }) {
  const supabase = createClientComponentClient();
  const { data } = useQuery({
    queryKey: ["posts", postId, "comments"],
    queryFn: () => getComments(supabase, postId),
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  if (!data || !data.data) return null;

  const comments = data.data || [];

  return comments.map((comment) => (
    <Comment key={comment.id} comment={comment} />
  ));
}
