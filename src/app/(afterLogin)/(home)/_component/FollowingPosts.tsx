"use client";

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import Post from "../../_component/Post";
import { getFollowingPosts } from "../_lib/getFollowingPosts";
import { useFetchUser } from "../../_hook/useFetchUser";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { getFollowingUsers } from "../_lib/getFollowingUsers";
import Link from "next/link";

export default function FollowingPosts() {
  const { user, loading } = useFetchUser();

  const { data: usersData, isLoading: isUsersLoading } = useQuery({
    queryKey: ["users", "followings"],
    queryFn: () => getFollowingUsers(user?.id),
    staleTime: 60 * 1000,
    enabled: !!user && !loading,
  });

  const followingUsers = Array.isArray(usersData) ? usersData : [];

  const {
    data,
    fetchNextPage,
    isFetching,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isPostsLoading,
  } = useInfiniteQuery({
    queryKey: ["posts", "followings"],
    queryFn: ({ pageParam = 1 }) =>
      getFollowingPosts({
        page: pageParam,
        pageSize: 5,
      }),
    initialPageParam: 1,
    enabled: !!followingUsers,
    getNextPageParam: (lastPage) => {
      if (lastPage && typeof lastPage.page !== "undefined") {
        return lastPage.hasNextPage ? lastPage.page + 1 : undefined;
      }
      return undefined;
    },
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  const posts =
    data?.pages.flatMap((page) =>
      page?.data.filter((post) => followingUsers.includes(post.user_id))
    ) || [];

  const { inView, ref } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetching && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetching, isFetchingNextPage, fetchNextPage]);

  if (isUsersLoading || isPostsLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center mt-8">
        <p className="text-lg font-semibold text-gray-700">Loading...</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center mt-8">
        <p className="text-lg font-semibold text-gray-700">
          아직 팔로우 중인 유저가 없어서 새로운 게시글을 볼 수 없어요.
        </p>
        <p className="mt-2 text-gray-500">
          다양한 사용자들의 게시글을 확인하고 싶다면, 아래 버튼을 눌러
          탐색해보세요.
        </p>
        <Link
          href="/explore"
          className="mt-4 inline-block bg-black text-white px-4 py-2 rounded-md"
        >
          사용자 탐색하기
        </Link>
      </div>
    );
  }

  return (
    <>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      <div className="h-24" ref={ref} />
    </>
  );
}
