"use client";

import { useQuery } from "@tanstack/react-query";
import getComments from "../_lib/getComments";
import { Post } from "@/model/Post";
import Comment from "./Comment";

export default function Comments({ postId }: { postId: string }) {
  const { data: comments } = useQuery<
    Post[],
    Object,
    Post[],
    [_1: string, _2: string, _3: string]
  >({
    queryKey: ["posts", postId, "comments"],
    queryFn: getComments,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });
  if (!comments) {
    return null;
  }
  return comments.map((comment) => (
    <Comment key={comment.content} comment={comment} />
  ));
}
