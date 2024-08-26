import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import SinglePost from "./_component/SinglePost";
import { getSinglePost } from "./_lib/getSinglePost";
import Comments from "./_component/Comments";
import { getComments } from "./_lib/getComments";
import CommentForm from "./_component/CommentForm";
import { createServerSupabaseClient } from "@/utils/supabase/server";
import BackButton from "@/app/(afterLogin)/_component/BackButton";

export default async function Page({ params }: { params: { postId: string } }) {
  const { postId } = params;
  const supabase = await createServerSupabaseClient();
  const queryClient = new QueryClient();
  const dehydratedState = dehydrate(queryClient);

  await queryClient.prefetchQuery({
    queryKey: ["posts", postId],
    queryFn: () => getSinglePost(supabase, postId),
  });

  const post = queryClient.getQueryData(["posts", postId]);

  await queryClient.prefetchQuery({
    queryKey: ["posts", postId, "comments"],
    queryFn: () => getComments(supabase, postId),
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <div className="ml-4 mt-2 mb-6">
        <BackButton />
      </div>
      <HydrationBoundary state={dehydratedState}>
        <SinglePost postId={postId} userId={user?.id} />
        <Comments postId={postId} post={post} />
        <CommentForm post={post} />
      </HydrationBoundary>
    </>
  );
}
