import { faker } from "@faker-js/faker";
import Link from "next/link";
import cx from "classnames";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import dayjs from "dayjs";
import BackButton from "../../_component/BackButton";

dayjs.locale("ko");
dayjs.extend(relativeTime);

export default function ChatRoom() {
  const user = {
    id: "hero",
    name: "영웅",
    image: faker.image.avatar(),
  };
  const messages = [
    {
      messageId: 1,
      roomId: 123,
      id: "lee",
      content: "안녕하세요.",
      createdAt: new Date(),
    },
    {
      messageId: 2,
      roomId: 123,
      id: "hero",
      content: "안녕히가세요.",
      createdAt: new Date(),
    },
  ];

  return (
    <main className="w-600 min-h-screen border-t border-b border-gray-200 flex flex-col">
      <div className="h-54 flex items-center px-4 mt-4">
        <BackButton />
      </div>
      <Link
        href={`/${user.name}`}
        className="px-16 py-20 flex flex-col items-center transition duration-200 border-b border-gray-200 hover:bg-gray-100 mb-4"
      >
        <img
          src={user.image}
          alt={user.id}
          style={{ width: 64, height: 64, borderRadius: "50%" }}
        />
        <div className="flex flex-col items-center">
          <b>{user.name}</b>
          <div>@{user.id}</div>
        </div>
      </Link>
      <div className="flex flex-col space-y-16 px-16">
        {messages.map((m) => (
          <div
            key={m.messageId}
            className={`flex flex-col ${
              m.id === "lee" ? "items-end" : "items-start"
            }`}
          >
            <div
              className={`py-2 px-4 text-15 ${
                m.id === "lee"
                  ? "bg-blue-500 rounded-tl-full rounded-tr-full rounded-bl-full text-white"
                  : "bg-gray-200 rounded-tl-full rounded-tr-full rounded-br-full text-black"
              }`}
            >
              {m.content}
            </div>
            <div className="mt-2 text-gray-700 text-xs">
              {dayjs(m.createdAt).format("YYYY년 MM월 DD일 A HH시 mm분")}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
