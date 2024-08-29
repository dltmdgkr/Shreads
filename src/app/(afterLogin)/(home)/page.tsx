import dynamic from "next/dynamic";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getPostRecommends } from "./_lib/getPostRecommends";
import { getFollowingPosts } from "./_lib/getFollowingPosts";

const PostForm = dynamic(() => import("./_component/PostForm"), { ssr: false });
const PostDecider = dynamic(() => import("./_component/PostDecider"), {
  ssr: false,
});
const ToggleButton = dynamic(() => import("./_component/ToggleButton"), {
  ssr: false,
});
const PostNavigation = dynamic(() => import("./_component/PostNavigation"), {
  ssr: false,
});
const PostsToggleProvider = dynamic(
  () => import("./_component/PostsToggleProvider"),
  { ssr: false }
);

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
