import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import PostForm from "./_component/PostForm";
import { getPostRecommends } from "./_lib/getPostRecommends";
import ToggleButton from "./_component/ToggleButton";
import PostsToggleProvider from "./_component/PostsToggleProvider";
import PostDecider from "./_component/PostDecider";
import { getFollowingPosts } from "./_lib/getFollowingPosts";
import PostNavigation from "./_component/PostNavigation";

export default async function Home() {
  const queryClient = new QueryClient();
  const dehydratedState = dehydrate(queryClient);

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

  return (
    <main className="lg:max-w-[50vw] h-[100dvh] overflow-y-auto scrollbar-hide">
      <HydrationBoundary state={dehydratedState}>
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
      </HydrationBoundary>
    </main>
  );
}
