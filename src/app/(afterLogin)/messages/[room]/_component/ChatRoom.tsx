"use client";

import Link from "next/link";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { createBrowserSupabaseClient } from "@/utils/supabase/client";
import { usePresenceStore } from "@/store/usePresenceStore";
import dayjs from "dayjs";
import { useFetchUser } from "@/app/(afterLogin)/_hook/useFetchUser";
import { getUserById } from "../../_lib/getUserById";
import { sendMessage } from "../../_lib/sendMessage";
import { getAllMessages } from "../../_lib/getAllMessages";
import BackButton from "@/app/(afterLogin)/_component/BackButton";
import Message from "../../_component/Message";
import { ChatRoomPageProps } from "../page";

export default function ChatRoom({ params }: ChatRoomPageProps) {
  const { user } = useFetchUser();
  const supabase = createBrowserSupabaseClient();

  const [message, setMessage] = useState("");
  const presence = usePresenceStore((state) => state.presence);

  const onlineAt = presence?.[params.room]?.[0]?.onlineAt;
  const isOnlineNow = onlineAt && dayjs().diff(dayjs(onlineAt), "minute") < 5;
  const lastOnline = isOnlineNow ? "지금 활동 중" : "";

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
    <>
      <div className="ml-4 mt-2 mb-6 hidden sm:block">
        <BackButton />
      </div>
      <main className="w-full border-gray-200 flex flex-col h-screen overflow-y-auto scrollbar-hide">
        <Link
          href={`/${selectedUserQuery.data?.id}`}
          className="px-16 py-4 flex flex-col items-center transition duration-200 border-b border-gray-200 hover:bg-gray-100"
        >
          <div className="relative">
            <img
              src={selectedUserQuery.data?.avatar_url!}
              alt="프로필 이미지"
              className="w-12 h-12 rounded-full border"
            />
            {isOnlineNow && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
            )}
          </div>
          <div className="flex flex-col items-center mt-3">
            <b>{selectedUserQuery.data?.user_name}</b>
            <div>@{selectedUserQuery.data?.email?.split("@")[0]}</div>
            <span className="mt-2 text-gray-800">{lastOnline}</span>
          </div>
        </Link>
        <div className="flex flex-col space-y-16 md:px-16 py-8 mb-48">
          {getAllMessagesQuery.data?.length === 0 ? (
            <div className="flex justify-center text-gray-500">
              여기서 대화를 시작하고 새 이야기를 만들어보세요.
            </div>
          ) : (
            getAllMessagesQuery.data?.map((message) => (
              <Message
                key={message.id}
                message={message}
                isFromMe={message.receiver === params.room}
              />
            ))
          )}
        </div>
        <div className="flex fixed bottom-1 w-full p-2 border border-gray-300 rounded-full items-center bg-white sm:max-w-xl md-lg:max-w-4xl lg-xl:max-w-4xl lg:max-w-xl xl:max-w-4xl">
          <img
            src={user?.avatar_url}
            alt="프로필 이미지"
            className="w-8 h-8 rounded-full mr-2 border"
          />
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={`${selectedUserQuery.data?.user_name}님에게 메세지 보내기`}
            className="flex-1 focus:outline-none resize-none"
          />
          <button
            onClick={() => sendMessageMutation.mutate()}
            className={`px-4 py-2 rounded-full text-sm ${
              message === ""
                ? "bg-gray-300 text-gray-100"
                : "bg-black text-white"
            }`}
            disabled={message === ""}
          >
            <span>전송</span>
          </button>
        </div>
      </main>
    </>
  );
}
