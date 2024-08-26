"use client";

import Link from "next/link";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserById } from "../../messages/_lib/getUserById";
import { useFetchUser } from "@/app/(afterLogin)/_hook/useFetchUser";
import { useEffect, useState } from "react";
import { isFollowingUser } from "@/app/(afterLogin)/explore/_lib/isFollowingUser";
import { followUser } from "@/app/(afterLogin)/explore/_lib/followUser";
import { getFollowerCount } from "@/app/(afterLogin)/explore/_lib/getFollowerCount";
import { useRouter } from "next/navigation";

type FollowerData = {
  follower_count: number;
};

export default function UserInfo({ userId }: { userId: string }) {
  const { user: me } = useFetchUser();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [isFollowing, setIsFollowing] = useState<boolean | null>(null);

  const { data } = useQuery({
    queryKey: ["users", userId],
    queryFn: async () => await getUserById(userId),
  });

  useEffect(() => {
    const fetchFollowStatus = async () => {
      if (me?.id && data?.id) {
        const followingStatus = await isFollowingUser(data.id, me.id);
        setIsFollowing(followingStatus);
      }
    };

    fetchFollowStatus();
  }, [me?.id, data?.id]);

  const followMutationQuery = useMutation({
    mutationKey: ["users", data?.id, "follows"],
    mutationFn: async () => {
      if (data && me?.id) {
        await followUser(data.id, me.id, isFollowing);
      }
    },
    onMutate: async () => {
      const queryKey = ["users", data?.id, "follows"];

      await queryClient.cancelQueries({ queryKey });

      const previousData = queryClient.getQueryData<FollowerData>(queryKey);

      queryClient.setQueryData<FollowerData>(queryKey, (oldData) => ({
        ...oldData,
        follower_count: (oldData?.follower_count || 0) + (isFollowing ? -1 : 1),
      }));

      return { previousData };
    },
    onError: (err, variables, context) => {
      const queryKey = ["users", data?.id, "follows"];
      queryClient.setQueryData(queryKey, context?.previousData);
      console.error("Error updating follow:", err);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["users", data?.id, "follows"],
      });
    },
  });

  const onClickFollow = () => {
    followMutationQuery.mutate();
    setIsFollowing((prev) => !prev);
  };

  const { data: followerData } = useQuery<FollowerData>({
    queryKey: ["users", data?.id, "follows"],
    queryFn: async () => {
      if (!data) return { follower_count: 0 };
      const followerCount = await getFollowerCount(data.id);
      return { follower_count: followerCount };
    },
  });

  if (!data) return null;

  if (isFollowing === null) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center mt-8">
        <p className="text-lg font-semibold text-gray-700">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex mb-4">
        <div className="flex flex-col justify-center flex-1">
          <div className="text-xl font-bold text-left">{data.user_name}</div>
          <div className="text-lg text-left">@{data.email?.split("@")[0]}</div>
        </div>
        <img
          src={data.avatar_url!}
          alt="프로필 이미지"
          className="sm:w-24 sm:h-24 w-20 h-20 rounded-full mx-auto border"
        />
      </div>
      <div className="flex flex-start mb-8">
        <div className="flex flex-1">
          <div className="text-gray-400">팔로워</div>
          <div className="text-gray-400 ml-1">
            {followerData?.follower_count || 0}명
          </div>
        </div>
        <Link href="https://github.com/dltmdgkr" target="_blank">
          <GitHubIcon />
        </Link>
      </div>
      {me?.id === userId ? (
        <button
          onClick={() => router.push("/edit-profile")}
          className="w-full border border-gray-300 px-4 py-1 rounded-xl text-gray-700 hover:bg-gray-100"
        >
          프로필 편집
        </button>
      ) : (
        <button
          onClick={onClickFollow}
          className={`w-full border border-gray-300 px-4 py-1 rounded-xl hover:bg-gray-100 ${
            isFollowing ? "text-gray-500" : "text-black"
          }`}
        >
          {isFollowing ? "팔로잉" : "팔로우"}
        </button>
      )}
    </>
  );
}
