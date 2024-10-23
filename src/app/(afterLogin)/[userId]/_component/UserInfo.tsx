"use client";

import Link from "next/link";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserById } from "../../messages/_lib/getUserById";
import { useFetchUser } from "@/app/(afterLogin)/_hook/useFetchUser";
import { isFollowingUser } from "@/app/(afterLogin)/explore/_lib/isFollowingUser";
import { followUser } from "@/app/(afterLogin)/explore/_lib/followUser";
import { getFollowerCount } from "@/app/(afterLogin)/explore/_lib/getFollowerCount";
import { useRouter } from "next/navigation";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { createBrowserSupabaseClient } from "@/utils/supabase/client";
import Image from "next/image";

type FollowerData = {
  follower_count: number;
};

export default function UserInfo({ userId }: { userId: string }) {
  const { user: me } = useFetchUser();
  const router = useRouter();
  const queryClient = useQueryClient();
  const supabase = createBrowserSupabaseClient();

  const { data, isLoading: isLoadingUser } = useQuery({
    queryKey: ["users", userId],
    queryFn: async () => await getUserById(userId),
  });

  const { data: isFollowing, isLoading: isLoadingFollowStatus } = useQuery({
    queryKey: ["users", userId, "followStatus"],
    queryFn: () => isFollowingUser(userId, me.id),
    enabled: !!me?.id && !!userId,
  });

  const followMutationQuery = useMutation({
    mutationKey: ["users", userId, "follow"],
    mutationFn: async (newIsFollowing: boolean) => {
      await followUser(userId, me.id, newIsFollowing);
    },
    onMutate: async () => {
      const queryKey = ["users", userId, "follows"];
      const previousData = queryClient.getQueryData<FollowerData>(queryKey);

      const newIsFollowing = !isFollowing;

      queryClient.setQueryData<FollowerData>(queryKey, (oldData) => ({
        ...oldData,
        follower_count:
          (oldData?.follower_count || 0) + (newIsFollowing ? 1 : -1),
      }));

      queryClient.setQueryData(
        ["users", userId, "followStatus"],
        newIsFollowing
      );

      return { previousData, newIsFollowing };
    },
    onError: (err, variables, context) => {
      console.error("Error in mutation:", err);
      queryClient.setQueryData(
        ["users", userId, "follows"],
        context?.previousData
      );
      queryClient.setQueryData(
        ["users", userId, "followStatus"],
        context?.newIsFollowing
      );
    },
    onSuccess: (data, variables, context) => {
      queryClient.setQueryData(
        ["users", userId, "followStatus"],
        context?.newIsFollowing
      );
    },
  });

  const onClickFollow = () => {
    const newIsFollowing = !isFollowing;
    followMutationQuery.mutate(newIsFollowing);
  };

  const { data: followerData } = useQuery<FollowerData>({
    queryKey: ["users", data?.id, "follows"],
    queryFn: async () => {
      if (!data) return { follower_count: 0 };
      const followerCount = await getFollowerCount(data.id);
      return { follower_count: followerCount };
    },
    enabled: !!data,
  });

  const onLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("ERROR:", error);
    }

    router.replace("/login");
  };

  if (isLoadingUser || isLoadingFollowStatus) {
    return (
      <>
        <div className="flex mb-4 items-center">
          <div className="flex flex-col justify-center flex-1">
            <Skeleton width={150} height={24} />
            <Skeleton width={120} height={20} className="mt-2" />
          </div>
          <Skeleton circle height={80} width={80} />
        </div>
        <div className="flex flex-start mb-8 items-center">
          <div className="flex flex-1">
            <Skeleton width={80} height={24} />
            <Skeleton width={60} height={24} className="ml-4" />
          </div>
          <Skeleton width={24} height={24} circle className="ml-2" />
        </div>
        <Skeleton width="100%" height={40} />
      </>
    );
  }

  if (!data) return null;

  return (
    <>
      <div className="flex mb-4">
        <div className="flex flex-col justify-center flex-1">
          <div className="text-xl font-bold text-left">{data.user_name}</div>
          <div className="text-lg text-left">@{data.email?.split("@")[0]}</div>
        </div>
        <Image
          src={data.avatar_url!}
          alt="프로필 이미지"
          className="sm:w-24 sm:h-24 w-20 h-20 rounded-full mx-auto border"
          width={80}
          height={80}
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
        <>
          <button
            onClick={() => router.push("/edit-profile")}
            className="w-full border border-gray-300 px-4 py-1 rounded-xl text-gray-700 hover:bg-gray-100"
          >
            프로필 편집
          </button>
          <button
            onClick={() => onLogout()}
            className="flex items-center justify-center space-x-2 w-full border border-gray-300 px-4 py-1.5 mt-1.5 rounded-xl text-red-500 lg:hidden block"
          >
            <RiLogoutCircleRLine size={16} />
            <span className="text-sm">로그아웃</span>
          </button>
        </>
      ) : (
        <button
          onClick={onClickFollow}
          className={`w-full border border-gray-300 px-4 py-1 rounded-xl hover:bg-gray-100 ${
            isFollowing ? "text-gray-500" : "text-black"
          }`}
        >
          {isFollowing ? (
            "팔로잉"
          ) : (
            <span className="font-semibold">팔로우</span>
          )}
        </button>
      )}
    </>
  );
}
