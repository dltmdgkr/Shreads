import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import UserInfo from "../[userId]/_component/UserInfo";
import UserProfileBottomNavigation from "../[userId]/_component/UserProfileBottomNavigation";
import { createServerSupabaseClient } from "@/utils/supabase/server";

export default async function UserPage() {
  const supabase = await createServerSupabaseClient();
  const queryClient = new QueryClient();
  const dehydratedState = dehydrate(queryClient);

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const userId = user!.id;

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="p-6">
        <UserInfo userId={userId} />
        <UserProfileBottomNavigation userId={userId} />
      </div>
    </HydrationBoundary>
  );
}
