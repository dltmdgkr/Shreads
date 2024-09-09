import { getUserById } from "../_lib/getUserById";
import ChatRoom from "./_component/ChatRoom";

export interface ChatRoomPageProps {
  params: {
    room: string;
  };
}

export async function generateMetadata({
  params: { room },
}: ChatRoomPageProps) {
  const user = await getUserById(room);
  return {
    title: `${user?.user_name}(@${user?.email?.split("@")[0]})님과의 대화`,
  };
}

export default function ChatRoomPage({ params }: ChatRoomPageProps) {
  return <ChatRoom params={params} />;
}
