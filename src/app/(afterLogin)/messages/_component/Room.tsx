"use client";

import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";
import { useRouter } from "next/navigation";
import { getAllMessages } from "../_lib/getAllMessages";
import { useQuery } from "@tanstack/react-query";

dayjs.locale("ko");
dayjs.extend(relativeTime);

export default function Room({ user, onlineAt }: any) {
  const router = useRouter();

  const onClick = (userId: string) => {
    router.push(`/messages/${userId}`);
  };

  const getAllMessagesQuery = useQuery({
    queryKey: ["messages", user.id],
    queryFn: () => getAllMessages({ chatUserId: user.id }),
  });

  const isOnlineNow = onlineAt && dayjs().diff(dayjs(onlineAt), "minute") < 5;
  const lastOnline = isOnlineNow ? " · 지금 활동 중" : "";

  return (
    <div
      key={user.id}
      className="p-4 flex flex-row transition duration-200 cursor-pointer hover:bg-opacity-3"
      onClick={() => onClick(user.id)}
    >
      <div className="relative mr-4">
        <img
          src={user.avatar_url}
          alt="프로필 이미지"
          className="w-12 h-12 rounded-full border"
        />
        {isOnlineNow && (
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
        )}
      </div>
      <div className="flex flex-col text-gray-700 text-base">
        <div>
          <b>{user.user_name}</b>
          &nbsp;
          <span>@{user.email?.split("@")[0]}</span>
          <span>{lastOnline}</span>
        </div>
        <div>
          {getAllMessagesQuery.data && getAllMessagesQuery.data?.length > 0 ? (
            getAllMessagesQuery.data?.at(-1)?.message
          ) : (
            <p className="text-gray-500">대화 내용이 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
}
