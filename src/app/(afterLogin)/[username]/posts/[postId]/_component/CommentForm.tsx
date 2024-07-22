"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useFetchUser } from "@/app/(afterLogin)/_component/_lib/hooks/useFetchUser";

export default function CommentForm({ post }: { post: any }) {
  const { user } = useFetchUser();

  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  let maxWidthClass;
  if (windowWidth >= 1200) {
    maxWidthClass = "max-w-4xl";
  } else if (windowWidth >= 1024) {
    maxWidthClass = "max-w-xl";
  } else if (windowWidth >= 900) {
    maxWidthClass = "max-w-4xl";
  } else {
    maxWidthClass = "max-w-xl";
  }

  return (
    <Link
      href={`/${post?.profiles.user_name}/posts/${post?.id}/create-comment`}
    >
      <div
        className={`flex fixed bottom-1 w-full p-2 border border-gray-300 rounded-full items-center bg-white ${maxWidthClass}`}
      >
        <img
          src={user.avatar_url}
          alt="프로필 이미지"
          className="w-8 h-8 rounded-full mr-2"
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
