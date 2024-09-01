import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import ExploreContainer from "./_component/ExploreContainer";
import { searchUsers } from "./_lib/searchUsers";
import { isFollowingUser } from "./_lib/isFollowingUser";
import { createServerSupabaseClient } from "@/utils/supabase/server";
import { User } from "@/model/User";
import { getFollowerCount } from "./_lib/getFollowerCount";

export default async function Page() {
  const queryClient = new QueryClient();
  const supabase = await createServerSupabaseClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  await queryClient.prefetchQuery({
    queryKey: ["users", ""],
    queryFn: () => searchUsers(""),
  });

  const users = queryClient.getQueryData<User[]>(["users", ""]) || [];

  if (users && session) {
    const filteredUsers = users.filter((user) => user.id !== session.user.id);

    await Promise.all(
      filteredUsers.map(async (user: User) => {
        await queryClient.prefetchQuery({
          queryKey: ["users", user.id, "followStatus"],
          queryFn: () => isFollowingUser(user.id, session.user.id),
        });
        await queryClient.prefetchQuery({
          queryKey: ["users", user.id, "follows"],
          queryFn: () => getFollowerCount(user.id),
        });
      })
    );
  }

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <ExploreContainer />
    </HydrationBoundary>
  );
}
