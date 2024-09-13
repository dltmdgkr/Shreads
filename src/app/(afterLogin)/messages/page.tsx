import type { Metadata } from "next";
import { QueryClient } from "@tanstack/react-query";
import { getAllUsers } from "./_lib/getAllUsers";
import { createServerSupabaseClient } from "@/utils/supabase/server";
import RoomList from "./_component/RoomList";
import BackButton from "../_component/BackButton";

export const metadata: Metadata = {
  title: "메시지함",
};

export default async function ChatRoomListPage() {
  const supabase = await createServerSupabaseClient();
  const queryClient = new QueryClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  await queryClient.prefetchQuery({
    queryKey: ["users"],
    queryFn: () => getAllUsers(),
  });

  return (
    <div className="h-[100dvh] overflow-y-auto scrollbar-hide">
      <div className="ml-4 mt-2 mb-2 hidden sm:block">
        <BackButton />
      </div>
      <main className="flex flex-col">
        <RoomList loggedInUser={session?.user} />
      </main>
    </div>
  );
}
