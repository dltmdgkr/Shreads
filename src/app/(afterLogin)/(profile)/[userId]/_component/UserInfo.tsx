"use client";

import Link from "next/link";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../../../messages/_lib/getUserById";
import { useFetchUser } from "@/app/(afterLogin)/_hook/useFetchUser";

export default function UserInfo({ userId }: { userId: string }) {
  const { user } = useFetchUser();

  const { data } = useQuery({
    queryKey: ["users", userId],
    queryFn: () => getUserById(userId),
  });

  if (!data) return null;

  return (
    <>
      <div className="flex mb-4">
        <div className="flex flex-col justify-center flex-1">
          <div className="text-xl font-bold text-left">{data.user_name}</div>
          <div className="text-lg text-left">@{data.email?.split("@")[0]}</div>
        </div>
        <img
          src={data.avatar_url}
          alt="프로필 이미지"
          className="sm:w-24 sm:h-24 w-20 h-20 rounded-full mx-auto border"
        />
      </div>
      <div className="flex flex-start mb-8">
        <div className="flex flex-1">
          <div className="text-gray-400">팔로워</div>
          <div className="text-gray-400 ml-1">100명</div>
        </div>
        <Link href="https://github.com/dltmdgkr" target="_blank">
          <GitHubIcon />
        </Link>
      </div>
      {user.id === userId ? (
        <Link href="/edit-profile">
          <button className="w-full border border-gray-300 px-4 py-1 rounded-xl text-gray-700 hover:bg-gray-100">
            프로필 편집
          </button>
        </Link>
      ) : null}
    </>
  );
}
