"use client";

import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";
import { useRouter } from "next/navigation";
import { getAllMessages } from "../_lib/getAllMessages";
import { useQuery } from "@tanstack/react-query";

dayjs.locale("ko");
dayjs.extend(relativeTime);

export default function Room({ user }: any) {
  const router = useRouter();

  const onClick = (userId: string) => {
    router.push(`/messages/${userId}`);
  };

  const getAllMessagesQuery = useQuery({
    queryKey: ["messages", user.id],
    queryFn: () => getAllMessages({ chatUserId: user.id }),
  });

  return (
    <div
      key={user.id}
      className="p-4 flex flex-row transition duration-200 cursor-pointer hover:bg-opacity-3"
      onClick={() => onClick(user.id)}
    >
      <div className="mr-4">
        <img
          src={user.avatar_url}
          alt={user.user_name}
          style={{ width: 50, height: 50, borderRadius: "50%" }}
        />
      </div>
      <div className="flex flex-col text-gray-700 text-base">
        <div>
          <b>{user.user_name}</b>
          &nbsp;
          <span>@{user.email?.split("@")[0]}</span>
          &nbsp; · &nbsp;
          <span>{dayjs().fromNow(true)}</span>
        </div>
        <div>{getAllMessagesQuery.data?.at(-1)?.message}</div>
      </div>
    </div>
  );
}
