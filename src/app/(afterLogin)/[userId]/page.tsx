import UserProfileBottomNavigation from "./_component/UserProfileBottomNavigation";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import UserInfo from "./_component/UserInfo";
import BackButton from "../_component/BackButton";

export default async function UserPage({
  params,
}: {
  params: { userId: string };
}) {
  const { userId } = params;
  const queryClient = new QueryClient();
  const dehydratedState = dehydrate(queryClient);

  return (
    <>
      <div className="ml-4 my-2">
        <BackButton />
      </div>
      <HydrationBoundary state={dehydratedState}>
        <div className="p-6">
          <UserInfo userId={userId} />
          <UserProfileBottomNavigation userId={userId} />
        </div>
      </HydrationBoundary>
    </>
  );
}
