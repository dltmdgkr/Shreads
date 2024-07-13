"use client";

import { ReactNode } from "react";
import style from "./post.module.css";
import { useRouter } from "next/navigation";
import { Tables } from "@/utils/database.types";
import { Post } from "@/model/Post";

export default function PostArticle({
  children,
  post,
}: {
  children: ReactNode;
  post: Post;
}) {
  const router = useRouter();
  const onClick = () => {
    router.push(`/${post.profiles.user_name}/posts/${post.id}`);
  };

  return (
    <article onClickCapture={onClick} className={style.post}>
      {children}
    </article>
  );
}
