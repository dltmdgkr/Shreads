"use client";

import Link from "next/link";
import { useFetchUser } from "@/app/(afterLogin)/_hook/useFetchUser";
import { Post } from "@/model/Post";
import Image from "next/image";

export default function CommentForm({ post }: { post: Post }) {
  const { user } = useFetchUser();

  return (
    <Link
      href={`/${post?.profiles.user_name}/posts/${post?.id}/create-comment`}
    >
      <div className="flex fixed bottom-1 w-full p-2 border border-gray-300 rounded-full items-center bg-white sm:max-w-xl md-lg:max-w-4xl lg-xl:max-w-4xl lg:max-w-xl xl:max-w-4xl">
        <Image
          src={user?.avatar_url}
          alt="프로필 이미지"
          className="w-8 h-8 rounded-full mr-2 border"
          width={32}
          height={32}
        />
        <input
          placeholder={`${post?.profiles.user_name}님에게 답글 남기기`}
          className="flex-1 focus:outline-none resize-none"
          style={{ color: "transparent" }}
        />
      </div>
    </Link>
  );
}
