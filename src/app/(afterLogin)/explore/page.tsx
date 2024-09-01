import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import ExploreContainer from "./_component/ExploreContainer";
import { createServerSupabaseClient } from "@/utils/supabase/server";
import { User } from "@/model/User";
import { searchUsers } from "./_lib/searchUsers";
import { isFollowingUser } from "./_lib/isFollowingUser";

async function searchUsersFiltered(excludeUserId: string) {
  const allUsers = await searchUsers("");
  return allUsers!.filter((user) => user.id !== excludeUserId);
}

export default async function Page() {
  const queryClient = new QueryClient();
  const supabase = await createServerSupabaseClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  await queryClient.prefetchQuery({
    queryKey: ["users", ""],
    queryFn: () => searchUsersFiltered(session!.user.id),
  });

  const users = queryClient.getQueryData<User[]>(["users", ""]);

  if (users && session) {
    await Promise.all(
      users.map(async (user: User) => {
        await queryClient.prefetchQuery({
          queryKey: ["users", user.id, "followStatus"],
          queryFn: () => isFollowingUser(user.id, session.user.id),
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
