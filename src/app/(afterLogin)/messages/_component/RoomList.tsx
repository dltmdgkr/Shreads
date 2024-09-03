"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../_lib/getAllUsers";
import Room from "./Room";
import RoomSkeleton from "./RoomSkeleton";
import { usePresenceStore } from "@/store/usePresenceStore";

export default function RoomList({ loggedInUser }: any) {
  const presence = usePresenceStore((state) => state.presence);

  const { data: getAllUsersQuery, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const allUsers = await getAllUsers();
      return allUsers?.filter((user) => user.id !== loggedInUser.id);
    },
  });

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 p-2">
        {[...Array(3)].map((_, index) => (
          <RoomSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <>
      {getAllUsersQuery?.map((user) => (
        <div key={user.id}>
          <Room user={user} onlineAt={presence?.[user.id]?.[0]?.onlineAt} />
        </div>
      ))}
    </>
  );
}
