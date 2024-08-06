"use client";

import { useQuery } from "@tanstack/react-query";
import SearchList from "./SearchList";
import { searchUsers } from "../_lib/searchUsers";
import { useFetchUser } from "../../_hook/useFetchUser";

export default function FollowRecommends({ search }: { search: string }) {
  const { user, loading } = useFetchUser();

  const { data } = useQuery({
    queryKey: ["users", search],
    queryFn: async () => {
      const recommendUsers = await searchUsers(search);
      return recommendUsers?.filter(
        (recommendUser) => recommendUser.id !== user.id
      );
    },
    enabled: !loading,
  });

  if (loading) return null;

  if (data?.length === 0) {
    return <div className="ml-2">검색 결과가 없습니다.</div>;
  }

  return data?.map((user) => <SearchList key={user.id} user={user} />);
}
