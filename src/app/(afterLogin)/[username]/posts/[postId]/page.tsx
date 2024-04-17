import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import SinglePost from "./_component/SinglePost";
import { getSinglePost } from "./_lib/getSinglePost";
import Comments from "./_component/Comments";
import getComments from "./_lib/getComments";

export default async function Page({ params }: { params: { postId: string } }) {
  const { postId } = params;
  const queryClient = new QueryClient();
  const dehydratedState = dehydrate(queryClient);

  await queryClient.prefetchQuery({
    queryKey: ["posts", postId],
    queryFn: getSinglePost,
  });

  await queryClient.prefetchQuery({
    queryKey: ["posts", postId, "comments"],
    queryFn: getComments,
  });

  return (
    <HydrationBoundary state={dehydratedState}>
      <SinglePost postId={postId} />
      <Comments postId={postId} />
    </HydrationBoundary>
  );
}
