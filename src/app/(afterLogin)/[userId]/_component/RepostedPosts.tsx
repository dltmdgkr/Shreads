"use client";

import { useQuery } from "@tanstack/react-query";
import { getRepostedPosts } from "../_lib/getRepostedPosts";
import Post from "../../_component/Post";
import { Post as PostType } from "@/model/Post";
import { FadeLoader } from "react-spinners";

export default function RepostedPosts({ userId }: { userId: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ["reposts", userId],
    queryFn: () => getRepostedPosts(userId),
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center sm:w-full w-[80vw] h-full text-center mt-8">
        <FadeLoader color="#adb5bd" />
      </div>
    );
  }

  const posts: PostType[] = Array.isArray(data) ? data : [];

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center sm:w-full w-[65vw] h-full text-center mt-8">
        <p className="mt-2 text-gray-500">
          아직 게시글을 리포스트하지 않았습니다.
        </p>
      </div>
    );
  }

  return posts.map((post: PostType) => <Post key={post.id} post={post} />);
}
