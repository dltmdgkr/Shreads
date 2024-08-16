import UserProfileBottomNavigation from "./_component/UserProfileBottomNavigation";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import UserInfo from "./_component/UserInfo";

export default async function UserPage({
  params,
}: {
  params: { userId: string };
}) {
  const { userId } = params;
  const queryClient = new QueryClient();
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="p-6">
        <UserInfo userId={userId} />
        <UserProfileBottomNavigation userId={userId} />
      </div>
    </HydrationBoundary>
  );
}
