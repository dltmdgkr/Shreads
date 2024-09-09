"use client";

import { useQueries, useQuery } from "@tanstack/react-query";
import SearchList from "./SearchList";
import { searchUsers } from "../_lib/searchUsers";
import { useFetchUser } from "../../_hook/useFetchUser";
import SearchListSkeleton from "./SearchListSkeleton";
import { getFollowerCount } from "../_lib/getFollowerCount";

export default function FollowRecommends({
  debouncedValue,
}: {
  debouncedValue: string;
}) {
  const { user, loading } = useFetchUser();

  const { data: recommendUsers, isLoading: isUsersLoading } = useQuery({
    queryKey: ["users", debouncedValue],
    queryFn: async () => {
      console.log("함수 호출하는중...");
      const users = await searchUsers(debouncedValue);
      return users?.filter((u) => u.id !== user.id) ?? [];
    },
    enabled: !loading,
  });

  const followerQueries = useQueries({
    queries:
      recommendUsers?.map((user) => ({
        queryKey: ["users", user.id, "follows"],
        queryFn: async () => {
          const followerCount = await getFollowerCount(user.id);
          return { userId: user.id, follower_count: followerCount };
        },
        enabled: !!user.id,
      })) ?? [],
  });

  const isFollowerCountLoading = followerQueries.some(
    (query) => query.isLoading
  );

  const isLoading = loading || isUsersLoading || isFollowerCountLoading;

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 p-2">
        {[...Array(3)].map((_, index) => (
          <SearchListSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (recommendUsers?.length === 0) {
    return <div className="ml-2">검색 결과가 없습니다.</div>;
  }

  return (
    <>
      {recommendUsers?.map((user) => {
        const followerData = followerQueries.find(
          (query) => query.data?.userId === user.id
        )?.data;

        return (
          <SearchList key={user.id} user={user} followerData={followerData} />
        );
      })}
    </>
  );
}
