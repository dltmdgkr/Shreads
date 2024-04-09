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

export default async function Home() {
  const queryClient = new QueryClient();
  const dehydratedState = dehydrate(queryClient);

  await queryClient.prefetchQuery({
    queryKey: ["posts", "recommends"],
    queryFn: getPostRecommends,
  });

  return (
    <main className="h-screen overflow-y-auto">
      <HydrationBoundary state={dehydratedState}>
        <PostsToggleProvider>
          <PostForm />
          <PostDecider />
          <ToggleButton />
        </PostsToggleProvider>
      </HydrationBoundary>
    </main>
  );
}
