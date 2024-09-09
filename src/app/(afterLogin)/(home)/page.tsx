import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getPostRecommends } from "./_lib/getPostRecommends";
import { getFollowingPosts } from "./_lib/getFollowingPosts";
import PostsToggleProvider from "./_component/PostsToggleProvider";
import PostForm from "./_component/PostForm";
import PostNavigation from "./_component/PostNavigation";
import PostDecider from "./_component/PostDecider";
import ToggleButton from "./_component/ToggleButton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "홈",
};

export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["posts", "followings"],
    queryFn: ({ pageParam = 1 }) =>
      getFollowingPosts({ page: pageParam, pageSize: 5 }),
    initialPageParam: 1,
  });

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["posts", "recommends"],
    queryFn: ({ pageParam = 1 }) =>
      getPostRecommends({ page: pageParam, pageSize: 5 }),
    initialPageParam: 1,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <main className="lg:max-w-[50vw] h-[100dvh] overflow-y-auto scrollbar-hide">
        <PostsToggleProvider>
          <PostForm />
          <div className="lg:hidden">
            <PostNavigation />
          </div>
          <div className="hidden lg:block">
            <PostDecider />
            <ToggleButton />
          </div>
        </PostsToggleProvider>
      </main>
    </HydrationBoundary>
  );
}
