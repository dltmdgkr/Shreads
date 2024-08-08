import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { followUser } from "../_lib/followUser";
import { useFetchUser } from "../../_hook/useFetchUser";
import { useEffect, useState } from "react";
import { getFollowerCount } from "../_lib/getFollowerCount";
import { isFollowingUser } from "../_lib/isFollowingUser";

type FollowerData = {
  follower_count: number;
};

export default function SearchList({ user }: { user: any }) {
  const { user: me } = useFetchUser();
  const queryClient = useQueryClient();

  const [isFollowing, setIsFollowing] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchFollowStatus = async () => {
      if (me?.id && user?.id) {
        const followingStatus = await isFollowingUser(user.id, me.id);
        setIsFollowing(followingStatus);
      }
    };

    fetchFollowStatus();
  }, [me?.id, user?.id]);

  const followMutationQuery = useMutation({
    mutationKey: ["users", "follows"],
    mutationFn: async () => {
      await followUser(user.id, me.id, isFollowing);
    },
    onMutate: async () => {
      const queryKey = ["users", "follows"];

      await queryClient.cancelQueries({ queryKey });

      const previousData = queryClient.getQueryData<FollowerData>(queryKey);

      queryClient.setQueryData<FollowerData>(queryKey, (oldData) => ({
        ...oldData,
        follower_count: (oldData?.follower_count || 0) + (isFollowing ? -1 : 1),
      }));

      return { previousData };
    },
    onError: (err, variables, context) => {
      const queryKey = ["users", "follows"];
      queryClient.setQueryData(queryKey, context?.previousData);
      console.error("Error updating follow:", err);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["users", "follows"],
      });
    },
  });

  const onClickFollow = () => {
    followMutationQuery.mutate();
    setIsFollowing((prev) => !prev);
  };

  const { data: followerData } = useQuery<FollowerData>({
    queryKey: ["users", "follows"],
    queryFn: async () => {
      const followerCount = await getFollowerCount(user.id);
      return { follower_count: followerCount };
    },
  });

  if (isFollowing === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between p-3">
        <Link href={`/${user.id}`}>
          <div className="flex items-center">
            <img
              src={user.avatar_url}
              alt="User Avatar"
              className="w-10 h-10 rounded-full mr-4"
            />
            <div>
              <h2 className="text-md font-semibold">{user.user_name}</h2>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
          </div>
        </Link>
        <button
          onClick={onClickFollow}
          className={`border border-gray-300 text-sm py-1.5 px-8 rounded-xl ${
            isFollowing ? "text-gray-500" : "text-black"
          }`}
        >
          {isFollowing ? "팔로잉" : "팔로우"}
        </button>
      </div>
      <div className="ml-[70px] pb-3 border-b border-gray-200">
        <p>팔로워 {followerData?.follower_count || 0}명</p>
      </div>
    </div>
  );
}
