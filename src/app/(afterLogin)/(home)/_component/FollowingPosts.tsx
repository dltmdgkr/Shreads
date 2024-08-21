"use client";

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import Post from "../../_component/Post";
import { getFollowingPosts } from "../_lib/getFollowingPosts";
import { useFetchUser } from "../../_hook/useFetchUser";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { getFollowingUsers } from "../_lib/getFollowingUsers";

export default function FollowingPosts() {
  const { user, loading } = useFetchUser();

  const { data: usersData } = useQuery({
    queryKey: ["users", "followings"],
    queryFn: () => getFollowingUsers(user?.id),
    staleTime: 60 * 1000,
    enabled: !!user && !loading,
  });

  const followingUsers = Array.isArray(usersData) ? usersData : [];

  const { data, fetchNextPage, isFetching, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["posts", "followings", followingUsers],
      queryFn: ({ pageParam = 1 }) =>
        getFollowingPosts({
          userId: user?.id,
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
      page.data.filter((post) => followingUsers.includes(post.user_id))
    ) || [];

  const { inView, ref } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetching && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetching, isFetchingNextPage, fetchNextPage]);

  return (
    <>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      <div ref={ref} />
    </>
  );
}
