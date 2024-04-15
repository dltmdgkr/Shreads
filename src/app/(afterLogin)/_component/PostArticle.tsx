"use client";

import { ReactNode } from "react";
import style from "./post.module.css";
import { useRouter } from "next/navigation";
import { Post } from "@/model/Post";

// interface Props {
//   children: ReactNode;
//   post: {
//     postId: number;
//     User: {
//       id: string;
//       name: string;
//       image: string;
//     };
//     content: string;
//     createdAt: Date;
//     Images: any[];
//   };
// }

export default function PostArticle({
  children,
  post,
}: {
  children: ReactNode;
  post: Post;
}) {
  const router = useRouter();
  const onClick = () => {
    router.replace(`/${post.User.id}/posts/${post.postId}`);
  };
  return (
    <article onClickCapture={onClick} className={style.post}>
      {children}
    </article>
  );
}
