"use client";

import Post from "@/app/(afterLogin)/_component/Post";
import { useQuery } from "@tanstack/react-query";
import getSearchResult from "../_lib/getSearchResult";
import { Post as IPost } from "@/model/Post";

type Props = {
  searchParams: { q: string };
};

export default function SearchResult({ searchParams }: Props) {
  const { data } = useQuery<IPost[]>({
    queryKey: ["posts", "search", searchParams],
    queryFn: () => getSearchResult({ searchParams }),
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  return data?.map((post: IPost) => <Post key={post.postId} post={post} />);
}
