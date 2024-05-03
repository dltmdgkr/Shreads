"use client";

import Link from "next/link";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../_lib/getUserInfo";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function UserInfo({ username }: { username: string }) {
  const supabase = createClientComponentClient();

  const { data } = useQuery({
    queryKey: ["users", username],
    queryFn: () => getUserInfo(supabase),
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  if (!data || !data.data) return null;

  const user = data.data;

  console.log(user);

  return (
    <>
      <div className="flex mb-4">
        <div className="flex flex-col justify-center flex-1">
          <div className="text-xl font-bold text-left">{user[0].user_name}</div>
          <div className="text-lg text-left">@{user[0].email}</div>
        </div>
        <img
          className="w-24 h-24 rounded-full mx-auto"
          src={user[0].avatar_url!}
          alt="Profile Image"
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
      <button className="w-full border border-gray-300 px-4 py-1 rounded-xl text-gray-700 hover:bg-gray-100">
        프로필 편집
      </button>
    </>
  );
}
