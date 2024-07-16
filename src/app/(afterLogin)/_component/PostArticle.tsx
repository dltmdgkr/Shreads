"use client";

import { ReactNode, MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { Post } from "@/model/Post";

export default function PostArticle({
  children,
  post,
}: {
  children: ReactNode;
  post: Post;
}) {
  const router = useRouter();

  const onClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (
      target.tagName.toLowerCase() === "img" ||
      target.tagName.toLowerCase() === "div"
    ) {
      return;
    }

    router.push(`/${post.profiles.user_name}/posts/${post.id}`);
  };

  return (
    <article className="lg:max-w-[50vw]" onClickCapture={onClick}>
      {children}
    </article>
  );
}
