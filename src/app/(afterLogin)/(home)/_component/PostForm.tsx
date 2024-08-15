"use client";

import Link from "next/link";
import SubmitButton from "../../_component/SubmitButton";
import { useFetchUser } from "../../_hook/useFetchUser";
import { useRouter } from "next/navigation";
import { MouseEventHandler } from "react";

export default function PostForm() {
  const { user } = useFetchUser();
  const router = useRouter();

  const onImageClick: MouseEventHandler<HTMLImageElement> = (e) => {
    e.stopPropagation();
    e.preventDefault();
    router.push(`/${user.id}`);
  };

  return (
    <Link href="/create-post">
      <div className="flex lg:mt-3 mt-8 mx-3 border-b">
        <div className="flex flex-1">
          <img
            src={user?.avatar_url}
            alt="프로필 이미지"
            className="w-10 h-10 rounded-full border mr-3"
            onClick={onImageClick}
          />
          <textarea
            className="border-0 focus:outline-none resize-none pt-2"
            placeholder="슈레드를 시작하세요!"
            style={{ color: "transparent" }}
          />
        </div>
        <div className="flex items-center ml-3 mb-3">
          <SubmitButton disabled={false} />
        </div>
      </div>
    </Link>
  );
}
