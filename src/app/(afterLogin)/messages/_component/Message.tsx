import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import dayjs from "dayjs";
import { Tables } from "@/utils/database.types";

dayjs.locale("ko");
dayjs.extend(relativeTime);

interface MessageProps {
  message: Tables<"messages">;
  isFromMe: boolean;
}

export default function Message({ message, isFromMe }: MessageProps) {
  return (
    <div className={`flex flex-col ${isFromMe ? "items-end" : "items-start"}`}>
      <div
        className={`py-2 px-4 text-15 ${
          isFromMe
            ? "bg-blue-700 rounded-tl-full rounded-tr-full rounded-bl-full text-white"
            : "bg-gray-200 rounded-tl-full rounded-tr-full rounded-br-full text-black"
        }`}
      >
        {message.message}
      </div>
      <div className="mt-2 text-gray-700 text-xs">
        {dayjs(message.created_at).format("YYYY년 MM월 DD일 A HH시 mm분")}
      </div>
    </div>
  );
}
