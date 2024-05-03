"use client";

import { ReactNode } from "react";
import style from "./post.module.css";
import { useRouter } from "next/navigation";
import { Tables } from "@/utils/database.types";

export default function PostArticle({
  children,
  post,
}: {
  children: ReactNode;
  post: Tables<"posts">;
}) {
  const router = useRouter();
  const onClick = () => {
    router.replace(`/${post.user_id}/posts/${post.id}`);
  };

  return (
    <article onClickCapture={onClick} className={style.post}>
      {children}
    </article>
  );
}
