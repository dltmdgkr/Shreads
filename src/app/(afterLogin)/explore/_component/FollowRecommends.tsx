"use client";

import { useQuery } from "@tanstack/react-query";
import SearchList from "./SearchList";
import { searchUsers } from "../_lib/searchUsers";
import { useFetchUser } from "../../_hook/useFetchUser";
import SearchListSkeleton from "./SearchListSkeleton";

export default function FollowRecommends({ search }: { search: string }) {
  const { user, loading } = useFetchUser();

  const { data, isLoading } = useQuery({
    queryKey: ["users", search],
    queryFn: async () => {
      const recommendUsers = await searchUsers(search);
      return recommendUsers?.filter(
        (recommendUser) => recommendUser.id !== user.id
      );
    },
    enabled: !loading,
  });

  if (loading || isLoading) {
    return (
      <div className="flex flex-col gap-4 p-2">
        {[...Array(3)].map((_, index) => (
          <SearchListSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (data?.length === 0) {
    return <div className="ml-2">검색 결과가 없습니다.</div>;
  }

  return (
    <>
      {data?.map((user) => (
        <SearchList key={user.id} user={user} />
      ))}
    </>
  );
}
