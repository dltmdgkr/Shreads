"use server";

import { createServerSupabaseClient } from "@/utils/supabase/server";

export async function getAllMessages({ chatUserId }: { chatUserId: string }) {
  const supabase = await createServerSupabaseClient();

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error || !session?.user) {
    throw new Error("User is not authenticated");
  }

  const { data, error: getAllMessagesError } = await supabase
    .from("messages")
    .select("*")
    .or(`receiver.eq.${chatUserId},receiver.eq.${session.user.id}`)
    .or(`sender.eq.${chatUserId},sender.eq.${session.user.id}`)
    .order("created_at", { ascending: true });

  if (getAllMessagesError) {
    return [];
  }

  return data;
}
