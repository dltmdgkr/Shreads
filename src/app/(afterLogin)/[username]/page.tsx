import UserProfileBottomNavigation from "./_component/UserProfileBottomNavigation";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getUserInfo } from "./_lib/getUserInfo";
import UserInfo from "./_component/UserInfo";

export default async function UserPage({
  params,
}: {
  params: { username: string };
}) {
  const { username } = params;
  const queryClient = new QueryClient();
  const dehydratedState = dehydrate(queryClient);

  await queryClient.prefetchQuery({
    queryKey: ["users", username],
    queryFn: getUserInfo,
  });

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="max-w-xl mx-auto p-6">
        <UserInfo username={username} />
        <UserProfileBottomNavigation />
      </div>
    </HydrationBoundary>
  );
}
