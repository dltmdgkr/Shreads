"use client";

import { useQuery } from "@tanstack/react-query";
import { getRepostedPosts } from "../_lib/getRepostedPosts";
import Post from "../../_component/Post";
import { Post as PostType } from "@/model/Post";

export default function RepostedPosts({ userId }: { userId: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ["reposts", userId],
    queryFn: () => getRepostedPosts(userId),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const posts: PostType[] = Array.isArray(data) ? data : [];

  if (posts.length === 0) {
    return <div>리포스트한 게시글이 없습니다.</div>;
  }

  return posts.map((post: PostType) => <Post key={post.id} post={post} />);
}
