"use client";

import Link from "next/link";
import BackButton from "../../_component/BackButton";
import Message from "../_component/Message";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUserById } from "../_lib/getUserById";
import { useEffect, useState } from "react";
import { useFetchUser } from "../../_hook/useFetchUser";
import { sendMessage } from "../_lib/sendMessage";
import { getAllMessages } from "../_lib/getAllMessages";
import { createBrowserSupabaseClient } from "@/utils/supabase/client";

interface ChatRoomProps {
  params: {
    room: string;
  };
}

export default function ChatRoom({ params }: ChatRoomProps) {
  const { user } = useFetchUser();
  const supabase = createBrowserSupabaseClient();

  const [windowWidth, setWindowWidth] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  let maxWidthClass;
  if (windowWidth >= 1200) {
    maxWidthClass = "max-w-4xl";
  } else if (windowWidth >= 1024) {
    maxWidthClass = "max-w-xl";
  } else if (windowWidth >= 900) {
    maxWidthClass = "max-w-4xl";
  } else {
    maxWidthClass = "max-w-xl";
  }

  const selectedUserQuery = useQuery({
    queryKey: ["users", params.room],
    queryFn: () => getUserById(params.room),
  });

  const sendMessageMutation = useMutation({
    mutationFn: () =>
      sendMessage({
        message,
        chatUserId: params.room,
      }),
    onSuccess: () => {
      setMessage("");
      getAllMessagesQuery.refetch();
    },
  });

  const getAllMessagesQuery = useQuery({
    queryKey: ["messages", params.room],
    queryFn: () => getAllMessages({ chatUserId: params.room }),
  });

  useEffect(() => {
    const channel = supabase
      .channel("messages_postgres_changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        (payload) => {
          if (payload.eventType === "INSERT" && !payload.errors) {
            getAllMessagesQuery.refetch();
          }
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  return (
    <main className="w-full min-h-screen border-gray-200 flex flex-col">
      <div className="h-16 flex items-center px-4">
        <BackButton />
      </div>
      <Link
        href={`/${selectedUserQuery.data?.user_name}`}
        className="px-16 py-4 flex flex-col items-center transition duration-200 border-b border-gray-200 hover:bg-gray-100"
      >
        <img
          src={selectedUserQuery.data?.avatar_url}
          alt="프로필 이미지"
          style={{ width: 64, height: 64, borderRadius: "50%" }}
        />
        <div className="flex flex-col items-center mt-3">
          <b>{selectedUserQuery.data?.user_name}</b>
          <div>@{selectedUserQuery.data?.email?.split("@")[0]}</div>
        </div>
      </Link>
      <div className="flex flex-col space-y-16 px-16 py-8 mb-48">
        {getAllMessagesQuery.data?.map((message) => (
          <Message
            key={message.id}
            message={message}
            isFromMe={message.receiver === params.room}
          />
        ))}
      </div>
      <div
        className={`flex fixed bottom-1 w-full p-2 border border-gray-300 rounded-full items-center bg-white ${maxWidthClass}`}
      >
        <img
          src={user.avatar_url}
          alt="프로필 이미지"
          className="w-8 h-8 rounded-full mr-2"
        />
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={`${selectedUserQuery.data?.user_name}님에게 메세지 보내기`}
          className="flex-1 focus:outline-none resize-none"
        />
        <button
          onClick={() => sendMessageMutation.mutate()}
          className="px-4 py-2 rounded-full bg-black text-white text-sm"
        >
          <span>전송</span>
        </button>
      </div>
    </main>
  );
}
