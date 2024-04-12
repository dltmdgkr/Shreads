"use client";

import { User } from "@/model/User";
import { useQuery } from "@tanstack/react-query";
import { getFollowRecommends } from "../_lib/getFollowRecommends";
import SearchList from "./SearchList";

export default function FollowRecommends() {
  const { data } = useQuery<User[]>({
    queryKey: ["users", "followRecommends"],
    queryFn: getFollowRecommends,
    staleTime: 60 * 1000,
  });
  return data?.map((user) => <SearchList user={user} key={user.id} />);
}
