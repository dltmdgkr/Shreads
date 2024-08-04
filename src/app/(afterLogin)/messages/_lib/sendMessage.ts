"use server";

import { createServerSupabaseClient } from "@/utils/supabase/server";

interface sendMessageProps {
  message: string;
  chatUserId: string;
}

export async function sendMessage({ message, chatUserId }: sendMessageProps) {
  const supabase = await createServerSupabaseClient();

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error || !session?.user) {
    throw new Error("User is not authenticated");
  }

  const { data, error: sendMessageError } = await supabase
    .from("messages")
    .insert({
      message,
      receiver: chatUserId,
      sender: session.user.id,
    });

  if (sendMessageError) {
    throw new Error(sendMessageError.message);
  }

  return data;
}
