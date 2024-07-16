"use client";

import { ReactNode, MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { Post } from "@/model/Post";
import { useDraggableScroll } from "./_lib/hooks/useDraggableScroll";

export default function PostArticle({
  children,
  post,
}: {
  children: ReactNode;
  post: Post;
}) {
  const router = useRouter();
  const { isDrag } = useDraggableScroll(); // useDraggableScroll 훅에서 isDrag 상태를 가져옵니다.

  const onClick = (e: MouseEvent) => {
    if (isDrag) {
      return; // 드래그 중이면 클릭 이벤트를 무시합니다.
    }

    const target = e.target as HTMLElement;
    if (target.tagName.toLowerCase() === "img") {
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
