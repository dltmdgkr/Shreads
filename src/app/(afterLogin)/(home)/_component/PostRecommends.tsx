"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getPostRecommends } from "../_lib/getPostRecommends";
import Post from "../../_component/Post";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useFetchUser } from "../../_hook/useFetchUser";
import { ClipLoader } from "react-spinners";

export default function PostRecommends() {
  const { user } = useFetchUser();
  const { data, fetchNextPage, isFetching, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["posts", "recommends"],
      queryFn: ({ pageParam = 1 }) =>
        getPostRecommends({ page: pageParam, pageSize: 5 }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        if (lastPage && typeof lastPage.page !== "undefined") {
          return lastPage.hasNextPage ? lastPage.page + 1 : undefined;
        }
        return undefined;
      },
      staleTime: 60 * 1000,
      gcTime: 300 * 1000,
    });

  const posts = data?.pages.flatMap((page) => page?.data) || [];

  const { inView, ref } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetching && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, isFetchingNextPage, hasNextPage, fetchNextPage]);

  return (
    <>
      {posts.map((post) => (
        <Post key={post.id} post={post} userId={user?.id} />
      ))}

      {isFetchingNextPage && (
        <div className="flex justify-center mt-4 mb-4">
          <ClipLoader color="#adb5bd" />
        </div>
      )}
      <div className="h-24" ref={ref} />
    </>
  );
}
