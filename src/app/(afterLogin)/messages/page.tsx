import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { QueryClient } from "@tanstack/react-query";
import { getAllUsers } from "./_lib/getAllUsers";
import { createServerSupabaseClient } from "@/utils/supabase/server";
import RoomList from "./_component/RoomList";

export default async function Page() {
  const supabase = await createServerSupabaseClient();
  const queryClient = new QueryClient();

  const cookieStore = cookies();
  createServerComponentClient({
    cookies: () => cookieStore,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  await queryClient.prefetchQuery({
    queryKey: ["users"],
    queryFn: () => getAllUsers(),
  });

  return (
    <main className="flex flex-col">
      <RoomList loggedInUser={session?.user} />
    </main>
  );
}
