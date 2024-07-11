import UserProfileBottomNavigation from "./_component/UserProfileBottomNavigation";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getUserInfo } from "./_lib/getUserInfo";
import UserInfo from "./_component/UserInfo";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function UserPage({
  params,
}: {
  params: { username: string };
}) {
  const { username } = params;
  const queryClient = new QueryClient();
  const dehydratedState = dehydrate(queryClient);

  const cookieStore = cookies();
  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  });

  await queryClient.prefetchQuery({
    queryKey: ["users", username],
    queryFn: () => getUserInfo(supabase),
  });

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="p-6">
        <UserInfo username={username} />
        <UserProfileBottomNavigation />
      </div>
    </HydrationBoundary>
  );
}
