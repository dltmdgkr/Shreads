import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import SinglePost from "./_component/SinglePost";
import { getSinglePost } from "./_lib/getSinglePost";

export default async function Page({ params }: { params: { postId: string } }) {
  const { postId } = params;
  const queryClient = new QueryClient();
  const dehydratedState = dehydrate(queryClient);

  await queryClient.prefetchQuery({
    queryKey: ["posts", postId],
    queryFn: getSinglePost,
  });

  return (
    <HydrationBoundary state={dehydratedState}>
      <SinglePost postId={postId} />
    </HydrationBoundary>
  );
}
