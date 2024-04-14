"use client";

import Link from "next/link";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../_lib/getUserInfo";
import { User } from "@/model/User";

export default function UserInfo({ username }: { username: string }) {
  const { data: user } = useQuery<User, Object, User, [_1: string, _2: string]>(
    {
      queryKey: ["users", username],
      queryFn: getUserInfo,
      staleTime: 60 * 1000,
      gcTime: 300 * 1000,
    }
  );
  if (!user) {
    return null;
  }

  console.log("user", user);
  return (
    <>
      <div className="flex mb-4">
        <div className="flex flex-col justify-center flex-1">
          <div className="text-xl font-bold text-left">{user.name}</div>
          <div className="text-lg text-left">@{user.id}</div>
        </div>
        <img
          className="w-24 h-24 rounded-full mx-auto"
          src="/noneProfile.jpg"
          alt="Profile Image"
        />
      </div>
      <div className="flex flex-start mb-8">
        <div className="flex flex-1">
          <div className="text-gray-400">팔로워</div>
          <div className="text-gray-400 ml-1">{user.followers}명</div>
        </div>
        <Link href="https://github.com/dltmdgkr" target="_blank">
          <GitHubIcon />
        </Link>
      </div>
      <button className="w-full border border-gray-300 px-4 py-1 rounded-xl text-gray-700 hover:bg-gray-100">
        프로필 편집
      </button>
    </>
  );
}
