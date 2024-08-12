"use client";

import { useState } from "react";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import ActionButtons from "@/app/(afterLogin)/_component/ActionButtons";
import PostArticle from "./PostArticle";
import PostImages from "./PostImages";
import { Post } from "@/model/Post";
import { MouseEventHandler } from "react";
import { deletePost } from "../[userId]/posts/[postId]/_lib/deletePost";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

dayjs.locale("ko");
dayjs.extend(relativeTime);

export default function Post({
  post,
  userId,
}: {
  post: Post;
  userId?: string | undefined;
}) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!post) return null;

  const stopPropagation: MouseEventHandler<
    HTMLAnchorElement | SVGSVGElement
  > = (e) => {
    e.stopPropagation();
  };

  const toggleModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const deletePostMutation = useMutation({
    mutationFn: () => deletePost(post.id, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      router.back();
    },
    onError: (error) => {
      console.error("Failed to delete post:", error);
    },
  });

  return (
    <PostArticle post={post}>
      <section className="flex flex-col cursor-pointer sm:p-3 pt-4">
        <header className="flex">
          <section className="mr-3 w-10">
            <Link
              href={`/${post.profiles.id}`}
              onClick={stopPropagation}
              className="relative block w-10 h-10 rounded-full"
            >
              <img
                src={post.profiles.avatar_url!}
                alt="프로필 이미지"
                className="w-10 h-10 rounded-full border"
              />
              {/* <p className="absolute top-0 left-0 w-10 h-10 rounded-full" /> */}
            </Link>
          </section>
          <section className="flex flex-col w-full">
            <p className="flex items-center mb-2 justify-between">
              <span className="flex items-center">
                <Link
                  href={`/${post.profiles.id}`}
                  onClick={stopPropagation}
                  className="flex items-center"
                >
                  <span className="font-bold hover:underline mr-1">
                    {post.profiles.user_name}
                  </span>
                  &nbsp;
                </Link>
                <span className="text-gray-500">
                  {dayjs(post.created_at).fromNow(true)}
                </span>
              </span>
              {userId === post.user_id && (
                <svg
                  onClick={(e) => {
                    stopPropagation(e);
                    toggleModal(e);
                  }}
                  aria-label="더 보기"
                  role="img"
                  viewBox="0 0 24 24"
                  className="cursor-pointer x1lliihq xffa9am x2lah0s x1jwls1v x1n2onr6 x17fnjtu x1gaogpn"
                  style={{ fill: "#6B7280", height: "24px", width: "24px" }}
                >
                  <title>더 보기</title>
                  <circle cx="12" cy="12" r="1.5"></circle>
                  <circle cx="6" cy="12" r="1.5"></circle>
                  <circle cx="18" cy="12" r="1.5"></circle>
                </svg>
              )}
            </p>
            <p>{post.content}</p>
            <section className="mt-3">
              <PostImages post={post} />
            </section>
            <ActionButtons post={post} />
          </section>
        </header>

        {/* Modal */}
        {isModalOpen && (
          <div
            className="absolute right-0 z-50 rounded-lg p-4 bg-white shadow-lg -translate-x-1/2"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="w-full text-left py-2 hover:bg-gray-100"
              onClick={() => {
                // Handle edit action here
                closeModal();
              }}
            >
              Edit
            </button>
            <button
              className="w-full text-left py-2 hover:bg-gray-100 text-red-500"
              onClick={() => {
                deletePostMutation.mutate();
                closeModal();
              }}
            >
              Delete
            </button>
            <button
              className="mt-4 w-full text-left py-2 hover:bg-gray-100"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        )}
      </section>
    </PostArticle>
  );
}
