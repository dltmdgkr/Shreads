import UserProfileBottomNavigation from "./_component/UserProfileBottomNavigation";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import UserInfo from "./_component/UserInfo";
import BackButton from "../_component/BackButton";
import { getUserById } from "../messages/_lib/getUserById";

interface UserPageProps {
  params: { userId: string };
}

export async function generateMetadata({ params: { userId } }: UserPageProps) {
  const user = await getUserById(userId);
  return {
    title: `Shreads의 ${user?.user_name}(@${user?.email?.split("@")[0]})님`,
  };
}

export default async function UserPage({ params: { userId } }: UserPageProps) {
  const queryClient = new QueryClient();
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="h-[100dvh] overflow-y-auto scrollbar-hide">
      <div className="ml-4 mt-2 hidden sm:block">
        <BackButton />
      </div>
      <HydrationBoundary state={dehydratedState}>
        <div className="p-6">
          <UserInfo userId={userId} />
          <UserProfileBottomNavigation userId={userId} />
        </div>
      </HydrationBoundary>
    </div>
  );
}
