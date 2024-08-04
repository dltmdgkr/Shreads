"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../_lib/getAllUsers";
import Room from "./Room";
import { createBrowserSupabaseClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

type Presence = {
  [userId: string]: Array<{ onlineAt: string }>;
};

export default function RoomList({ loggedInUser }: any) {
  const supabase = createBrowserSupabaseClient();
  const [presence, setPresence] = useState<Presence | null>(null);

  const getAllUsersQuery = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const allUsers = await getAllUsers();
      return allUsers?.filter((user) => user.id !== loggedInUser.id);
    },
  });

  useEffect(() => {
    const channel = supabase.channel("online_users", {
      config: {
        presence: {
          key: loggedInUser?.id,
        },
      },
    });

    channel.on("presence", { event: "sync" }, () => {
      const newState = channel.presenceState();
      const newStateObj = JSON.parse(JSON.stringify(newState));
      setPresence(newStateObj);
    });

    channel.subscribe(async (status) => {
      if (status !== "SUBSCRIBED") {
        return;
      }

      await channel.track({
        onlineAt: new Date().toISOString(),
      });
    });

    return () => {
      channel.unsubscribe();
    };
  }, []);

  return (
    <>
      {getAllUsersQuery.data?.map((user) => (
        <div key={user.id}>
          <Room user={user} onlineAt={presence?.[user.id]?.[0]?.onlineAt} />
        </div>
      ))}
    </>
  );
}
