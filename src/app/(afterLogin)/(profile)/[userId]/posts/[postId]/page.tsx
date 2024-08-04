import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import SinglePost from "./_component/SinglePost";
import { getSinglePost } from "./_lib/getSinglePost";
import Comments from "./_component/Comments";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { getComments } from "./_lib/getComments";
import CommentForm from "./_component/CommentForm";

export default async function Page({ params }: { params: { postId: string } }) {
  const { postId } = params;
  const supabase = createClientComponentClient();
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

  return (
    <HydrationBoundary state={dehydratedState}>
      <SinglePost postId={postId} />
      <Comments postId={postId} />
      <CommentForm post={post} />
    </HydrationBoundary>
  );
}
