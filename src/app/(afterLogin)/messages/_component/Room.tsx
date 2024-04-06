"use client";

import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

dayjs.locale("ko");
dayjs.extend(relativeTime);

export default function Room() {
  const router = useRouter();
  const user = {
    id: "hero",
    name: "영웅",
    Messages: [
      { roomId: 123, content: "안녕하세요.", createdAt: new Date() },
      { roomId: 123, content: "안녕히가세요.", createdAt: new Date() },
    ],
  };

  const onClick = () => {
    router.push(`/messages/${user.Messages.at(-1)?.roomId}`);
  };

  return (
    <div
      className="p-4 flex flex-row transition duration-200 cursor-pointer hover:bg-opacity-3"
      onClickCapture={onClick}
    >
      <div className="mr-4">
        <img
          src={faker.image.avatar()}
          alt=""
          style={{ width: 50, height: 50, borderRadius: "50%" }}
        />
      </div>
      <div className="flex flex-col text-gray-700 text-base">
        <div>
          <b>{user.name}</b>
          &nbsp;
          <span>@{user.id}</span>
          &nbsp; · &nbsp;
          <span>{dayjs(user.Messages?.at(-1)?.createdAt).fromNow(true)}</span>
        </div>
        <div>{user.Messages?.at(-1)?.content}</div>
      </div>
    </div>
  );
}
