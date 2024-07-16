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
import { cookies } from "next/headers";
import { getFollowingPosts } from "./_lib/getFollowingPosts";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function Home() {
  const queryClient = new QueryClient();
  const dehydratedState = dehydrate(queryClient);

  const cookieStore = cookies();
  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  });

  await queryClient.prefetchQuery({
    queryKey: ["posts", "followings"],
    queryFn: () => getFollowingPosts(supabase),
  });

  await queryClient.prefetchQuery({
    queryKey: ["posts", "recommends"],
    queryFn: () => getPostRecommends(supabase),
  });

  return (
    <main className="lg:max-w-[50vw] h-screen overflow-y-auto scrollbar-hide">
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
