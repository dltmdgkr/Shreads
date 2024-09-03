"use client";

import { useEffect } from "react";
import { createBrowserSupabaseClient } from "@/utils/supabase/client";
import { usePresenceStore } from "@/store/usePresenceStore";

export default function PresenceTracker({ loggedInUser }: any) {
  const supabase = createBrowserSupabaseClient();
  const setPresence = usePresenceStore((state) => state.setPresence);

  useEffect(() => {
    if (!loggedInUser) return;

    const channel = supabase.channel("online_users", {
      config: {
        presence: {
          key: loggedInUser.id,
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
  }, [loggedInUser, supabase, setPresence]);

  return null;
}
