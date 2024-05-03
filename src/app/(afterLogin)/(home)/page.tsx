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
// import useSupabaseServer from "@/utils/supabase/server";
import { prefetchQuery } from "@supabase-cache-helpers/postgrest-react-query";
import { getFollowingPosts } from "./_lib/getFollowingPosts";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function Home() {
  const queryClient = new QueryClient();

  // await queryClient.prefetchInfiniteQuery({
  //   queryKey: ["posts", "recommends"],
  //   queryFn: getPostRecommends,
  //   initialPageParam: 0,
  // });

  const dehydratedState = dehydrate(queryClient);

  const cookieStore = cookies();
  // const supabase = useSupabaseServer(cookieStore);
  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  });

  await queryClient.prefetchQuery({
    queryKey: ["posts", "followings"],
    queryFn: () => getFollowingPosts(supabase),
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
